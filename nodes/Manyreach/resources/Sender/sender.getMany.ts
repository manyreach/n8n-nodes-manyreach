import { IExecuteFunctions , IDataObject} from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { ensurePagination } from '../../helpers/validation';
import { normalizeManyResponse } from '../../helpers/response.convert';

export async function getSenders(this: IExecuteFunctions, index: number) {

    const page = this.getNodeParameter('page', index, 1) as number;
    const limit = this.getNodeParameter('limit', index, 100) as number;
    const startingAfter = this.getNodeParameter('startingAfter', index, '') as number;
    ensurePagination(page, limit);

    const folder = this.getNodeParameter('folder', index, '') as string;
    const search = this.getNodeParameter('search', index, '') as string;
    const warmup = this.getNodeParameter('warmup', index, false) as boolean;
    const status = this.getNodeParameter('status', index, '') as string;

    const qs: IDataObject = {};

    if (page) qs.page = page;
    if (limit) qs.limit = limit;
    if (folder) qs.folder = folder;
    if (search) qs.search = search;
    if (warmup) qs.warmup = warmup;
    if (status) qs.status = status;
    if (startingAfter) qs.startingAfter = startingAfter;

    const response = await apiRequest.call(this, 'GET', '/senders', {}, qs);

   return normalizeManyResponse(response);
}
