import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { extractResourceId } from '../../helpers/validation';

export async function copyCampaign(this: IExecuteFunctions, index: number) {
  const resourceLocator = this.getNodeParameter('campaignId', index) as unknown;
  const id = extractResourceId(resourceLocator);

  const body: IDataObject = {};
  
  const qs: IDataObject = {};
  const newCampaignName = this.getNodeParameter('name', index, undefined) as string | undefined;
  if (newCampaignName !== undefined) {
    qs.newCampaignName = newCampaignName;
  }

  const response = await apiRequest.call(this, 'POST', `/campaigns/${id}/copy`, body, qs);
  return response;
}
