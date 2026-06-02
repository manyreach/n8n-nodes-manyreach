import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { extractResourceId, extractNumericId } from '../../helpers/validation';

export async function removeTagFromSender(this: IExecuteFunctions, index: number) {
  const senderLocator = this.getNodeParameter('senderId', index) as unknown;
  const senderId = extractResourceId(senderLocator);

  const tagLocator = this.getNodeParameter('tagId', index) as unknown;
  const tagId = extractNumericId(tagLocator);

  const response = await apiRequest.call(this, 'DELETE', `/senders/${senderId}/tags/${tagId}`);
  return response;
}
