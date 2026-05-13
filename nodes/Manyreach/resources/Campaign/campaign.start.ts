import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { extractResourceId } from '../../helpers/validation';

export async function startCampaign(this: IExecuteFunctions, index: number) {
  const resourceLocator = this.getNodeParameter('campaignId', index) as unknown;
  const id = extractResourceId(resourceLocator);
  
  const body: IDataObject = {};
  
  const qs: IDataObject = {};
  
  const response = await apiRequest.call(this, 'POST', `/campaigns/${id}/start`, body, qs);
  return response;
}