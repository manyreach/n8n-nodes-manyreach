import { IExecuteFunctions , IDataObject } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { ensurePagination, extractNumericId, ensureId  } from '../../helpers/validation';
import { normalizeManyResponse } from '../../helpers/response.convert';

export async function getCampaignsForTag(this: IExecuteFunctions, index: number) {
  const body = {};
  const qs: IDataObject = {};

  // Get tag ID from resource locator
  const rawTagId = this.getNodeParameter('tagId', index) as unknown;
  const tagId = extractNumericId(rawTagId);
  ensureId(tagId);

  // Get pagination parameters
  const page = this.getNodeParameter('page', index, 1) as number;
  const limit = this.getNodeParameter('limit', index, 100) as number;
  const startingAfter = this.getNodeParameter('startingAfter', index, 0) as number;

  ensurePagination(page, limit);
  // Build query string
  qs.page = page;
  qs.limit = limit;
  
  if (startingAfter && startingAfter > 0) {
    qs.startingAfter = startingAfter;
  }

  // Make API request
  const response = await apiRequest.call(this, 'GET', `/tags/${tagId}/campaigns`, body, qs);
  
  return normalizeManyResponse(response);
}
