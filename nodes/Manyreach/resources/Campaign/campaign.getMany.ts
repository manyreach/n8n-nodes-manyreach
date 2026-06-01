import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { ensurePagination } from '../../helpers/validation';
import { normalizeManyResponse, simplifyItems } from '../../helpers/response.convert';

export async function getCampaigns(this: IExecuteFunctions, index: number) {
  const page = this.getNodeParameter('page', index, 1) as number;
  const limit = this.getNodeParameter('limit', index, 100) as number;
  const startingAfter = this.getNodeParameter('startingAfter', index, 0) as number;
  const simplify = this.getNodeParameter('simplify', index, true) as boolean;
  ensurePagination(page, limit);
  const response = await apiRequest.call(this, 'GET', `/campaigns`, {}, { page, limit , startingAfter});

  const normalized = normalizeManyResponse(response);
  return simplify
    ? simplifyItems(normalized, [
        'campaignId',
        'name',
        'status',
        'createdAt',
        'fromName',
        'subject',
        'prospectCount',
        'sentCount',
        'openCount',
        'clickCount',
        'replyCount',
        'bounceCount',
        'conversionCount',
      ])
    : normalized;
}
