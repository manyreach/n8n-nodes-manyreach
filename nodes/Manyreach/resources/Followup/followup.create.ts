import { IExecuteFunctions, IDataObject, NodeOperationError } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { extractNumericId, ensureId } from '../../helpers/validation';
import { mapAdditionalFields } from '../../helpers/mapping.helper';

export async function createFollowupsSequence(this: IExecuteFunctions, index: number) {
    const rawsequenceId = this.getNodeParameter('sequenceId', index) as unknown;
    const sequenceId = extractNumericId(rawsequenceId);
    ensureId(sequenceId);

    const body: IDataObject = {};
    const subject = this.getNodeParameter('subject', index) as string;
    const followupBody = this.getNodeParameter('body', index) as string;
    const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;

    body.subject = subject;
    body.body = followupBody;

    if (additionalFields.waitUnits !== undefined) {
        body.waitUnits = additionalFields.waitUnits;
    } else {
        throw new NodeOperationError(this.getNode(), 'The "Wait Units" parameter is required to create a followup.', { itemIndex: index });
    }

    if (additionalFields.waitMin !== undefined) {
        body.waitMin = additionalFields.waitMin;
    } else {
        throw new NodeOperationError(this.getNode(), 'The "Wait Min" parameter is required to create a followup.', { itemIndex: index });
    }

    mapAdditionalFields(additionalFields, body, ['waitUnits', 'waitMin']);

    const response = await apiRequest.call(this, 'POST', `/sequences/${sequenceId}/followups`, body);
    return response;
}
