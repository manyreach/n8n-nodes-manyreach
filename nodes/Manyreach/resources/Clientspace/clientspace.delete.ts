import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { extractResourceId } from '../../helpers/validation';

export async function deleteClientspace(this: IExecuteFunctions, index: number) {

  const resourceLocator = this.getNodeParameter('clientspaceId', index) as unknown;
  const id = extractResourceId(resourceLocator);

  await apiRequest.call(this, 'DELETE', `/clientspaces/${id}`);
  return { deleted: true };
}
