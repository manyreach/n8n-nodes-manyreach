import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { extractNumericId, ensureId  } from '../../helpers/validation';


export async function getTagById(this: IExecuteFunctions, index: number) {
  const body: IDataObject = {};
  const qs: IDataObject = {};

  // Get tag ID from resource locator
  const rawTagId = this.getNodeParameter('tagId', index) as unknown;
  const tagId = extractNumericId(rawTagId);
  ensureId(tagId);

  // Make API request
  const response = await apiRequest.call(this, 'GET', `/tags/${tagId}`, body, qs);
  
  return response;
}

