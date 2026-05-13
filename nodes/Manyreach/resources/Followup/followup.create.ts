import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { extractNumericId, ensureId } from '../../helpers/validation';
import { mapAdditionalFields } from '../../helpers/mapping.helper';

export async function createFollowupsSequence(this: IExecuteFunctions, index: number) {
    const rawsequenceId = this.getNodeParameter('sequenceId', index) as unknown;
    const sequenceId = extractNumericId(rawsequenceId);
    ensureId(sequenceId);

    const body: IDataObject = {};
    const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;

    if (additionalFields.waitUnits !== undefined) {
        body.waitUnits = additionalFields.waitUnits;
    } else {
        throw new Error('Wait Units is required');
    }

    if (additionalFields.waitMin !== undefined) {
        body.waitMin = additionalFields.waitMin;
    } else {
        throw new Error('Wait Min is required');
    }

    mapAdditionalFields(additionalFields, body, ['waitUnits', 'waitMin']);

    const response = await apiRequest.call(this, 'POST', `/sequences/${sequenceId}/followups`, body);
    return response;
}
