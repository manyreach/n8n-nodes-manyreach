import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { extractResourceId } from '../../helpers/validation';

export async function deleteUser(this: IExecuteFunctions, index: number) {
  const resourceLocator = this.getNodeParameter('userId', index) as unknown;
  const id = extractResourceId(resourceLocator);

  await apiRequest.call(this, 'DELETE', `/users/${id}`);
  return { deleted: true };
}
