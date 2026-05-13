import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { extractNumericId, ensurePagination } from '../../helpers/validation';

export async function getMessagesProspect(this: IExecuteFunctions, index: number) {
  const resourceLocator = this.getNodeParameter('prospectId', index) as unknown;
  const id = extractNumericId(resourceLocator);

  const page = this.getNodeParameter('page', index, 1) as number;
  const limit = this.getNodeParameter('limit', index, 100) as number;
  const startingAfter = this.getNodeParameter('startingAfterDate', index, undefined) as string;
  ensurePagination(page, limit);

  const qs: IDataObject = { page, limit };
  if (startingAfter) {
    qs.startingAfter = startingAfter;
  }

  const response = await apiRequest.call(this, 'GET', `/prospects/${id}/messages`, {}, qs);
  return response;
}
 