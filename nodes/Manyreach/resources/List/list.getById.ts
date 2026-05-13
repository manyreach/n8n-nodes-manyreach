import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { extractNumericId , ensureId} from '../../helpers/validation';

export async function getList(this: IExecuteFunctions, index: number) {
  const rawListId = this.getNodeParameter('listId', index) as unknown;
  const listId = extractNumericId(rawListId);
  ensureId(listId);
  
  const response = await apiRequest.call(this, 'GET', `/lists/${listId}`);
  return response;
}