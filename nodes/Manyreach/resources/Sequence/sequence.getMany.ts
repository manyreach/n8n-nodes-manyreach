import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { extractResourceId } from '../../helpers/validation';
import { normalizeManyResponse , simplifyItems} from '../../helpers/response.convert';

export async function getSequences(this: IExecuteFunctions, index: number) {
  const resourceLocator = this.getNodeParameter('campaignId', index) as unknown;
  const id = extractResourceId(resourceLocator);
  
  const body: IDataObject = {};
  
  const qs: IDataObject = {};

  const response = await apiRequest.call(this, 'GET', `/campaigns/${id}/sequences`, body, qs);

  return normalizeManyResponse(response);
  const simplify = this.getNodeParameter('simplify', index, true) as boolean;
  const normalized = normalizeManyResponse(response);
  return simplify
    ? simplifyItems(normalized, [
        'sequenceId',
        'name',
        'shortName',
      ])
    : normalized;
}