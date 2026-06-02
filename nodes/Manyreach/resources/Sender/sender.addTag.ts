import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { extractResourceId, extractNumericId } from '../../helpers/validation';

export async function addTagToSender(this: IExecuteFunctions, index: number) {
  const senderLocator = this.getNodeParameter('senderId', index) as unknown;
  const senderId = extractResourceId(senderLocator);

  const tagLocator = this.getNodeParameter('tagId', index) as unknown;
  const tagId = extractNumericId(tagLocator);

  const body: IDataObject = {
    tagId: tagId,
  };

  const response = await apiRequest.call(this, 'POST', `/senders/${senderId}/tags`, body);
  return response;
}
