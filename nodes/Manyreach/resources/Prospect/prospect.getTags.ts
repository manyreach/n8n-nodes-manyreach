import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { extractResourceId } from '../../helpers/validation';

export async function getTagsProspect(this: IExecuteFunctions, index: number) {
    const resourceLocator = this.getNodeParameter('prospectId', index) as unknown;
    const id = extractResourceId(resourceLocator);
    const body: IDataObject = {};

    const qs: IDataObject = {};
    const page = this.getNodeParameter('page', index, undefined) as number | undefined;
    if (page !== undefined) {
        qs.page = page;
    }
    const limit = this.getNodeParameter('limit', index, undefined) as number | undefined;
    if (limit !== undefined) {
        qs.limit = limit;
    }
    const startingAfter = this.getNodeParameter('startingAfter', index, undefined) as string | undefined;
    if (startingAfter !== undefined) {
        qs.startingAfter = startingAfter;
    }

    const response = await apiRequest.call(this, 'GET', `/prospects/${id}/tags`, body, qs);
    return response;
}
