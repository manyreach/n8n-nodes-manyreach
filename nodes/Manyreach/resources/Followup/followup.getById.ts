import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { extractNumericId, ensureId } from '../../helpers/validation';

export async function getFollowup(this: IExecuteFunctions, index: number) {

  const rawFollowupId = this.getNodeParameter('followupId', index) as unknown;
  const followupId = extractNumericId(rawFollowupId);
  ensureId(followupId);

  const response = await apiRequest.call(this, 'GET', `/followups/${followupId}`);
  return {
    items: response?.data ?? response ?? [],
  };

}
