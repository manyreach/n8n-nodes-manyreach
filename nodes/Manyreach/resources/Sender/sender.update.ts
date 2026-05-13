import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { extractResourceId } from '../../helpers/validation';

export async function updateSender(this: IExecuteFunctions, index: number) {

  const resourceLocator = this.getNodeParameter('senderId', index) as unknown;
  const id = extractResourceId(resourceLocator);
  
  const updateFields = this.getNodeParameter('updateFields', index, {}) as IDataObject;
  
  const response = await apiRequest.call(this, 'PATCH', `/senders/${id}`, updateFields);
  return response;
}
