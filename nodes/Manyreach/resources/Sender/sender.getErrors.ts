import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { extractResourceId } from '../../helpers/validation';

export async function getErrorsSender(this: IExecuteFunctions, index: number) {
  const resourceLocator = this.getNodeParameter('senderId', index) as unknown;
  const id = extractResourceId(resourceLocator);

  const body: IDataObject = {};
  
  const qs: IDataObject = {};
  
  const response = await apiRequest.call(this, 'GET', `/senders/${id}/errors`, body, qs);
  return response;
}
