import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { extractResourceId } from '../../helpers/validation';
import { mapAdditionalFields } from '../../helpers/mapping.helper';

export async function updateUser(this: IExecuteFunctions, index: number) {
    
  const resourceLocator = this.getNodeParameter('userId', index) as unknown;
  const id = extractResourceId(resourceLocator);
  
  const body: IDataObject = {};
  const updateFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;
  mapAdditionalFields(updateFields, body);

  const response = await apiRequest.call(this, 'PATCH', `/users/${id}`, body);
  return response;
}
