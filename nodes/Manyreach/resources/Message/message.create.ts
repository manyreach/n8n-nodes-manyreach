import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { mapAdditionalFields } from '../../helpers/mapping.helper';

export async function createMessage(this: IExecuteFunctions, index: number) {

  const body: IDataObject = {};
  
  const messageId = this.getNodeParameter('messageId', index) as string;
  body.messageId = messageId;
  // Optional fields
  const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;
  mapAdditionalFields(additionalFields, body);

  const response = await apiRequest.call(this, 'POST', '/messages/reply', body);
  
  return response;
}
