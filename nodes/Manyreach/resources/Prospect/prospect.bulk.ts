import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { extractNumericId } from '../../helpers/validation';

export async function bulkProspect(this: IExecuteFunctions, index: number) {

    const rawListId = this.getNodeParameter('listId', index, undefined);
    let listId: number | undefined;
    const isListIdSet = rawListId && (
        (typeof rawListId === 'object' && (rawListId as { value?: string | number }).value !== undefined && (rawListId as { value?: string | number }).value !== '' && (rawListId as { value?: string | number }).value !== 0) ||
        (typeof rawListId !== 'object' && rawListId !== '' && rawListId !== 0)
    );
    if (isListIdSet) {
        listId = extractNumericId(rawListId);
    }

    const rawCampaignId = this.getNodeParameter('campaignId', index, undefined);
    let campaignId: number | undefined;
    const isCampaignIdSet = rawCampaignId && (
        (typeof rawCampaignId === 'object' && (rawCampaignId as { value?: string | number }).value !== undefined && (rawCampaignId as { value?: string | number }).value !== '' && (rawCampaignId as { value?: string | number }).value !== 0) ||
        (typeof rawCampaignId !== 'object' && rawCampaignId !== '' && rawCampaignId !== 0)
    );
    if (isCampaignIdSet) {
        campaignId = extractNumericId(rawCampaignId);
    }
    // Campaign ID is optional, but if present should be numeric

    // Check if campaignId is valid (not undefined and looks like a number)
    // If it's undefined, we pass undefined in qs.


    const addOnlyIfNew = this.getNodeParameter('addOnlyIfNew', index, false) as boolean;
    const notInOtherCampaign = this.getNodeParameter('notInOtherCampaign', index, false) as boolean;

    const qs: IDataObject = {};

    if (listId !== undefined) {
        qs.listId = listId;
    }
    if (campaignId !== undefined) {
        qs.campaignId = campaignId;
    }

    qs.addOnlyIfNew = addOnlyIfNew;
    qs.notInOtherCampaign = notInOtherCampaign;

    // Get the FixedCollection "prospects" -> "prospectProperties"
    const prospectsContainer = this.getNodeParameter('prospects', index, []) as IDataObject; // { prospectProperties: [ ... ] }

    // Check structure
    let prospectsList: unknown[] = [];
    if (prospectsContainer && prospectsContainer.prospectProperties && Array.isArray(prospectsContainer.prospectProperties)) {
        prospectsList = prospectsContainer.prospectProperties;
    }

    if (!prospectsList || prospectsList.length === 0) {
        throw new Error('No prospects provided in the bulk list.');
    }

    const removeUndefined = (obj: Record<string, unknown>) => {
        const filtered: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(obj)) {
            if (value !== undefined) {
                filtered[key] = value;
            }
        }
        return filtered;
    };

    const body = {
        prospects: prospectsList.map((p: unknown) => {
            const prospect = p as Record<string, unknown>;
            const additionalFields = (prospect.additionalFields ?? {}) as Record<string, unknown>;
            const mergedProspect = {
                ...prospect,
                ...additionalFields,
            };

            delete mergedProspect.additionalFields;

            if (mergedProspect.sendingStatus === undefined) {
                mergedProspect.sendingStatus = 'Unknown';
            }
            if (mergedProspect.sendingActive === undefined) {
                mergedProspect.sendingActive = true;
            }

            return removeUndefined(mergedProspect);
        }),
    };

    const response = await apiRequest.call(this, 'POST', `/prospects/bulk`, body as IDataObject, qs);
    return response;
}