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

    const body = {
        prospects: prospectsList.map((p: unknown) => {
            const prospect = p as Record<string, unknown>;
            const prospectObj = p as Record<string, unknown>;
            return {
            ...prospectObj,
            // Ensure default values if missing from UI (though UI defaults should handle it)
            sendingStatus: prospect.sendingStatus || 'Unknown',
            sendingActive: prospect.sendingActive !== undefined ? prospect.sendingActive : true,
            // Map optional fields
            industry: prospect.industry,
            city: prospect.city,
            website: prospect.website,
            phone: prospect.phone,
            firstName: prospect.firstName,
            lastName: prospect.lastName,
            company: prospect.company,
            country: prospect.country,
            domain: prospect.domain,
            companySocial: prospect.companySocial,
            companySize: prospect.companySize,
            jobPosition: prospect.jobPosition,
            location: prospect.location,
            personalSocial: prospect.personalSocial,
            customImageUrl: prospect.customImageUrl,
            screenshotUrl: prospect.screenshotUrl,
            logoUrl: prospect.logoUrl,
            state: prospect.state,
            icebreaker: prospect.icebreaker,
            custom1: prospect.custom1,
            custom2: prospect.custom2,
            custom3: prospect.custom3,
            custom4: prospect.custom4,
            custom5: prospect.custom5,
            custom6: prospect.custom6,
            custom7: prospect.custom7,
            custom8: prospect.custom8,
            custom9: prospect.custom9,
            custom10: prospect.custom10,
            custom11: prospect.custom11,
            custom12: prospect.custom12,
            custom13: prospect.custom13,
            custom14: prospect.custom14,
            custom15: prospect.custom15,
            custom16: prospect.custom16,
            custom17: prospect.custom17,
            custom18: prospect.custom18,
            custom19: prospect.custom19,
            custom20: prospect.custom20,
            notes: prospect.notes
        };
        }),
    };

    const response = await apiRequest.call(this, 'POST', `/prospects/bulk`, body as IDataObject, qs);
    return response;
}