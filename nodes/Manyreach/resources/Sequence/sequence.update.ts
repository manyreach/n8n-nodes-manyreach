import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { extractResourceId } from '../../helpers/validation';

export async function updateSequence(this: IExecuteFunctions, index: number) {
  const resourceLocator = this.getNodeParameter('sequenceId', index) as unknown;
  const id = extractResourceId(resourceLocator);
  
  const updateFields = this.getNodeParameter('updateFields', index, {}) as IDataObject;
  
  const name = this.getNodeParameter('name', index) as string;
  if (name) {
    updateFields.name = name;
  }
  const response = await apiRequest.call(this, 'PATCH', `/sequences/${id}`, updateFields);
  return response;
}