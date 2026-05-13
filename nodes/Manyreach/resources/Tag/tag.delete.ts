import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { extractNumericId, ensureId } from '../../helpers/validation';

export async function deleteTag(this: IExecuteFunctions, index: number) {
  const body: IDataObject = {};
  const qs: IDataObject = {};

  // Get tag ID from resource locator
  const rawTagId = this.getNodeParameter('tagId', index) as unknown;
  const tagId = extractNumericId(rawTagId);
  ensureId(tagId);

  // Get force delete option
  const force = this.getNodeParameter('force', index, false) as boolean;

  // Add force parameter to query string if true
  if (force) {
    qs.force = true;
  }

  // Make API request
  await apiRequest.call(this, 'DELETE', `/tags/${tagId}`, body, qs);
  
  // DELETE returns 204 No Content, so return success message
  return { success: true, message: `Tag ${tagId} deleted successfully` };
}

