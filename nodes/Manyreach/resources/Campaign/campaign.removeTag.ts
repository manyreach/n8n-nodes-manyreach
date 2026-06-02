import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { extractResourceId, extractNumericId } from '../../helpers/validation';

export async function removeTagFromCampaign(this: IExecuteFunctions, index: number) {
  const campaignLocator = this.getNodeParameter('campaignId', index) as unknown;
  const campaignId = extractResourceId(campaignLocator);

  const tagLocator = this.getNodeParameter('tagId', index) as unknown;
  const tagId = extractNumericId(tagLocator);

  const response = await apiRequest.call(this, 'DELETE', `/campaigns/${campaignId}/tags/${tagId}`);
  return response;
}
