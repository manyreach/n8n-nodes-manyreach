import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { extractResourceId } from '../../helpers/validation';

export async function updateProspect(this: IExecuteFunctions, index: number) {
  const resourceLocator = this.getNodeParameter('prospectId', index) as unknown;
  const id = extractResourceId(resourceLocator);
  
  const updateFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;
  
  const response = await apiRequest.call(this, 'PATCH', `/prospects/${id}`, updateFields);
  return response;
}
