import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { ensurePagination } from '../../helpers/validation';
import { normalizeManyResponse, simplifyItems } from '../../helpers/response.convert';

export async function getProspects(this: IExecuteFunctions, index: number) {
    const email = this.getNodeParameter('email', index, '') as string;
    const status = this.getNodeParameter('sendingStatus', index, '') as string;
    const tags = this.getNodeParameter('tags', index, '') as string;
    const search = this.getNodeParameter('search', index, '') as string;
    const page = this.getNodeParameter('page', index, 1) as number;
    const limit = this.getNodeParameter('limit', index, 100) as number;
    const startingAfter = this.getNodeParameter('startingAfter', index, 0) as number;
    const includeCampaignIds = this.getNodeParameter('includeCampaignId', index, []) as string[];
    const excludeCampaignIds = this.getNodeParameter('excludeCampaignId', index, []) as string[];
    const includeListIds = this.getNodeParameter('includeListId', index, []) as string[];
    const excludeListIds = this.getNodeParameter('excludeListId', index, []) as string[];
    
    ensurePagination(page, limit);
    const qs: IDataObject = {};

    if (includeCampaignIds && includeCampaignIds.length > 0) {
        qs['includeCampaignIds.campaignIds'] = includeCampaignIds;
    }
    if (excludeCampaignIds && excludeCampaignIds.length > 0) {
        qs['excludeCampaignIds.campaignIds'] = excludeCampaignIds;
    }
    if (includeListIds && includeListIds.length > 0) {
        qs['includeListIds.listIds'] = includeListIds;
    }
    if (excludeListIds && excludeListIds.length > 0) {
        qs['excludeListIds.listIds'] = excludeListIds;
    }

    if (email) {
        qs.email = email;
    }
    if (status) {
        qs.status = status;
    }
    if (tags) {
        qs.tags = tags;
    }
    if (search) {
        qs.search = search;
    }

    // Pagination query
    qs['pageQuery.Page'] = page;
    qs['pageQuery.Limit'] = limit;
    if (startingAfter) {
        qs['pageQuery.StartingAfter'] = startingAfter;
    }

    const response = await apiRequest.call(this, 'GET', '/prospects', {}, qs);
    const simplify = this.getNodeParameter('simplify', index, true) as boolean;
    const normalized = normalizeManyResponse(response);
    return simplify
        ? simplifyItems(normalized, [
              'id',
              'email',
              'firstName',
              'lastName',
              'company',
              'jobPosition',
              'sendingStatus',
              'createdAt',
          ])
        : normalized;
}
