import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { extractResourceId } from '../../helpers/validation';

export async function getUser(this: IExecuteFunctions, index: number) {
  const resourceLocator = this.getNodeParameter('userId', index) as unknown;
  const id = extractResourceId(resourceLocator);

  const response = await apiRequest.call(this, 'GET', `/users/${id}`);
  return response;
}
