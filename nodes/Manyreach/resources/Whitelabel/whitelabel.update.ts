import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { mapAdditionalFields } from '../../helpers/mapping.helper';

export async function updateWhitelabel(this: IExecuteFunctions, index: number) {
  
  const body: IDataObject = {};
  const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;
  mapAdditionalFields(additionalFields, body);
   
  const response = await apiRequest.call(this, 'PATCH', `/whitelabel`, body);
  return response;
}
  