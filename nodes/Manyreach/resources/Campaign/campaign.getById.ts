import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { ensureId, extractNumericId } from '../../helpers/validation';

export async function getCampaign(this: IExecuteFunctions, index: number) {

  const rawCampaignId = this.getNodeParameter('campaignId', index) as unknown;
  const campaignId = extractNumericId(rawCampaignId);
  ensureId(campaignId);

  const response = await apiRequest.call(this, 'GET', `/campaigns/${campaignId}`);
  if (!response) {
    throw new Error(`Campaigns with ID ${campaignId} not found`);
  }

  return response;
}

