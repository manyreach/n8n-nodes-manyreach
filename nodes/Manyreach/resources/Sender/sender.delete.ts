import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { extractResourceId } from '../../helpers/validation';

export async function deleteSender(this: IExecuteFunctions, index: number) {
  const resourceLocator = this.getNodeParameter('senderId', index) as unknown;
  const id = extractResourceId(resourceLocator);
  
  await apiRequest.call(this, 'DELETE', `/senders/${id}`);
  return { deleted: true };
}
