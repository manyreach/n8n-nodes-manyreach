import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { ensurePagination } from '../../helpers/validation';
import { normalizeManyResponse } from '../../helpers/response.convert';

export async function getDomains(this: IExecuteFunctions, index: number) {
  const page = this.getNodeParameter('page', index, 1) as number;
  const limit = this.getNodeParameter('limit', index, 50) as number;
  const search = this.getNodeParameter('search', index, '') as string;

  ensurePagination(page, limit);

  const qs: IDataObject = {
    'pageQuery.Page': page,
    'pageQuery.Limit': limit,
  };

  if (search && search.trim() !== '') {
    qs.search = search.trim();
  }

  const response = await apiRequest.call(this, 'GET', '/blacklist/domains', {}, qs);
  return normalizeManyResponse(response);
}
