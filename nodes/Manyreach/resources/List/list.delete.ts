import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { ensureId, extractNumericId } from '../../helpers/validation';

export async function deleteList(this: IExecuteFunctions, index: number) {
  const rawListId = this.getNodeParameter('listId', index) as unknown;
  const listId = extractNumericId(rawListId);
  ensureId(listId);
  const response = await apiRequest.call(this, 'DELETE', `/lists/${listId}`);
  return response;
}