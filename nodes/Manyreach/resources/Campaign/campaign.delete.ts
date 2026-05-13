import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { extractResourceId } from '../../helpers/validation';

export async function deleteCampaign(this: IExecuteFunctions, index: number) {
  const resourceLocator = this.getNodeParameter('campaignId', index) as unknown;
  const id = extractResourceId(resourceLocator);

  const response = await apiRequest.call(this, 'DELETE', `/campaigns/${id}`);
  return response;
}
