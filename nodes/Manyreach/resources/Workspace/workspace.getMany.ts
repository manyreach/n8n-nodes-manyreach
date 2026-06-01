import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { ensurePagination } from '../../helpers/validation';
import { normalizeManyResponse } from '../../helpers/response.convert';

export async function getWorkspaces(this: IExecuteFunctions, index: number) {
    const page = this.getNodeParameter('page', index, 1) as number;
    const limit = this.getNodeParameter('limit', index, 100) as number;
    const startingAfter = this.getNodeParameter('startingAfter', index, 0) as number;

    ensurePagination(page, limit);

    const response = await apiRequest.call(this, 'GET', '/workspaces', {}, { page, limit, startingAfter });

    return normalizeManyResponse(response);
}
