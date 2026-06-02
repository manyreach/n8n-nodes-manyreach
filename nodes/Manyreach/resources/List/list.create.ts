import { IExecuteFunctions, IDataObject, NodeOperationError } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';

export async function createList(this: IExecuteFunctions, index: number) {
  const body: IDataObject = {};
    
  // Optional fields
  const title = this.getNodeParameter('title', index) as string;
  if (title) {
    body.title = title;
  }
  else{
    throw new NodeOperationError(this.getNode(), 'The "Title" parameter is required to create a list.', { itemIndex: index });
  }
  const folderId = this.getNodeParameter('folderId', index) as string;
  if (folderId) {
    body.folderId = folderId == '0' ? null : folderId;
  }
  
  const response = await apiRequest.call(this, 'POST', '/lists', body);
  return response;
}