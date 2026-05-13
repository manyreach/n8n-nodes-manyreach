import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { extractResourceId } from '../../helpers/validation';

export async function updateCampaign(this: IExecuteFunctions, index: number) {
  const resourceLocator = this.getNodeParameter('campaignId', index) as unknown;
  const id = extractResourceId(resourceLocator);
  
  const updateFields = this.getNodeParameter('updateFields', index, {}) as IDataObject;
  const response = await apiRequest.call(this, 'PATCH', `/campaigns/${id}`, updateFields);
  return response;
}
