import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { extractResourceId } from '../../helpers/validation';

export async function getProspect(this: IExecuteFunctions, index: number) {
  const resourceLocator = this.getNodeParameter('prospectId', index) as unknown;
  const id = extractResourceId(resourceLocator);

  const response = await apiRequest.call(this, 'GET', `/prospects/${id}`);
  return response;
}
