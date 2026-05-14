import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { extractNumericId , ensureId } from '../../helpers/validation';


export async function deleteFollowup(this: IExecuteFunctions, index: number) {
  const rawFollowupId = this.getNodeParameter('followupId', index) as unknown;
  const followupId = extractNumericId(rawFollowupId);
  ensureId(followupId);

  await apiRequest.call(this, 'DELETE', `/followups/${followupId}`);
  return { deleted: true };
}
