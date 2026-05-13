import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { extractResourceId } from '../../helpers/validation';

export async function deleteWorkspace(this: IExecuteFunctions, index: number) {

  const resourceLocator = this.getNodeParameter('workspaceId', index) as unknown;
  const id = extractResourceId(resourceLocator);

  await apiRequest.call(this, 'DELETE', `/workspaces/${id}`);
  return { deleted: true };
}
