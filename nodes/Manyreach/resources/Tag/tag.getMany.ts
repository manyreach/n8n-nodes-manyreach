import { IExecuteFunctions,IDataObject } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { ensurePagination } from '../../helpers/validation';
import { normalizeManyResponse } from '../../helpers/response.convert';

export async function getManyTags(this: IExecuteFunctions, index: number) {
  const body = {};
    const qs: IDataObject = {};

  // Get pagination parameters
  const page = this.getNodeParameter('page', index, 1) as number;
  const limit = this.getNodeParameter('limit', index, 100) as number;
  const startingAfter = this.getNodeParameter('startingAfter', index, 0) as number;
  const search = this.getNodeParameter('search', index, '') as string;
  const tagType = this.getNodeParameter('tagType', index, '') as string;
  const includeProspectCount = this.getNodeParameter('includeProspectCount', index, false) as boolean;

  ensurePagination(page, limit);

  // Build query string
  qs.page = page;
  qs.limit = limit;
  
  if (startingAfter && startingAfter > 0) {
    qs.startingAfter = startingAfter;
  }

  if (search && search.trim() !== '') {
    qs.search = search.trim();
  }

  if (tagType && tagType !== '') {
    qs.tagType = tagType;
  }

  if (includeProspectCount) {
    qs.include = 'prospectCount';
  }

  // Make API request
  const response = await apiRequest.call(this, 'GET', '/tags', body, qs);
  
 return normalizeManyResponse(response);
}

