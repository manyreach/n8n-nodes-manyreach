import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';

export async function createTag(this: IExecuteFunctions, index: number) {
  const body: IDataObject = {};
  const qs: IDataObject = {};

  // Get required field
  const title = this.getNodeParameter('title', index) as string;
  
  // Get optional fields
  const description = this.getNodeParameter('description', index, '') as string;
  const tagType = this.getNodeParameter('tagType', index, 'Crm') as string;

  // Build request body
  body.Title = title.trim();
  body.TagType = tagType;
  
  if (description && description.trim() !== '') {
    body.Description = description.trim();
  }

  // Make API request
  const response = await apiRequest.call(this, 'POST', '/tags', body, qs);
  
  return response;
}

