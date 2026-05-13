import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { extractNumericId, ensureId } from '../../helpers/validation';

export async function updateTag(this: IExecuteFunctions, index: number) {
  const body: IDataObject = {};
  const qs: IDataObject = {};

  // Get tag ID from resource locator
  const rawTagId = this.getNodeParameter('tagId', index) as unknown;
  const tagId = extractNumericId(rawTagId);
  ensureId(tagId);

  // Get update fields
  const updateFields = this.getNodeParameter('updateFields', index, {}) as IDataObject;

  // Build request body - only include fields that are provided
  if (updateFields.title !== undefined && updateFields.title !== null && updateFields.title !== '') {
    const titleValue = typeof updateFields.title === 'string' ? updateFields.title : String(updateFields.title);
    body.Title = titleValue.trim();
  }

  if (updateFields.description !== undefined && updateFields.description !== null && updateFields.description !== '') {
    const descValue = typeof updateFields.description === 'string' ? updateFields.description : String(updateFields.description);
    body.Description = descValue.trim();
  }

  // Make API request
  const response = await apiRequest.call(this, 'PATCH', `/tags/${tagId}`, body, qs);
  
  return response;
}

