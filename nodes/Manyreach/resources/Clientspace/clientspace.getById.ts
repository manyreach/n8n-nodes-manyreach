import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { extractResourceId } from '../../helpers/validation';

export async function getClientspace(this: IExecuteFunctions, index: number) {

  const resourceLocator = this.getNodeParameter('clientspaceId', index) as unknown;
  const id = extractResourceId(resourceLocator);

  const response = await apiRequest.call(this, 'GET', `/clientspaces/${id}`);
  return response;
}
