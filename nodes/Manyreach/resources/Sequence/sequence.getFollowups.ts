import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { extractResourceId } from '../../helpers/validation';
import { normalizeManyResponse } from '../../helpers/response.convert';

export async function getSequenceFollowups(this: IExecuteFunctions, index: number) {
  const resourceLocator = this.getNodeParameter('sequenceId', index) as unknown;
  const id = extractResourceId(resourceLocator);

  const response = await apiRequest.call(this, 'GET', `/sequences/${id}/followups`);
  return normalizeManyResponse(response);
}
