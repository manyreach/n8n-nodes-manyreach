import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { ensureId, extractNumericId, extractResourceId } from '../../helpers/validation';

export async function addTagsProspect(this: IExecuteFunctions, index: number) {
  const resourceLocator = this.getNodeParameter('prospectId', index) as unknown;
  const id = extractResourceId(resourceLocator);
  
  const body: IDataObject = {};
  
  const rawTagId = this.getNodeParameter('tagId', index) as unknown;
  const tagId = extractNumericId(rawTagId);
  ensureId(tagId); 

  body.TagId = tagId;

  const qs: IDataObject = {};

  const response = await apiRequest.call(this, 'POST', `/prospects/${id}/tags`, body, qs);
  return response;
}
