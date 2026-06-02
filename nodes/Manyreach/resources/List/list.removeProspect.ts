import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { extractResourceId, extractNumericId } from '../../helpers/validation';

export async function removeProspectFromList(this: IExecuteFunctions, index: number) {
  const listLocator = this.getNodeParameter('listId', index) as unknown;
  const listId = extractResourceId(listLocator);

  const prospectLocator = this.getNodeParameter('prospectId', index) as unknown;
  const prospectId = extractNumericId(prospectLocator);

  const response = await apiRequest.call(this, 'DELETE', `/lists/${listId}/prospects/${prospectId}`);
  return response;
}
