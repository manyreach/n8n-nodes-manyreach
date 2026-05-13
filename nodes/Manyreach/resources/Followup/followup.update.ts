import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { extractNumericId , ensureId } from '../../helpers/validation';

export async function updateFollowup(this: IExecuteFunctions, index: number) {

  const rawFollowupId = this.getNodeParameter('followupId', index) as unknown;
  const followupId = extractNumericId(rawFollowupId);
  ensureId(followupId);
  
  const updateFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;
  
  const response = await apiRequest.call(this, 'PATCH', `/followups/${followupId}`, updateFields);
  return response;
}
