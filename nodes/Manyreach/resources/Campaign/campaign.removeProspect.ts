import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { extractResourceId, extractNumericId } from '../../helpers/validation';

export async function removeProspectFromCampaign(this: IExecuteFunctions, index: number) {
  const campaignLocator = this.getNodeParameter('campaignId', index) as unknown;
  const campaignId = extractResourceId(campaignLocator);

  const prospectLocator = this.getNodeParameter('prospectId', index) as unknown;
  const prospectId = extractNumericId(prospectLocator);

  const response = await apiRequest.call(this, 'DELETE', `/campaigns/${campaignId}/prospects/${prospectId}`);
  return response;
}
