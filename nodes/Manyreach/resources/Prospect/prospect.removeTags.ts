import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { ensureId, extractResourceId } from '../../helpers/validation';

export async function removeTagsProspect(this: IExecuteFunctions, index: number) {

    const rawProspectId = this.getNodeParameter('prospectId', index) as unknown;
    const prospectId = extractResourceId(rawProspectId);
    ensureId(prospectId);

    const rawTagId = this.getNodeParameter('tagId', index) as unknown;
    const tagId = extractResourceId(rawTagId);
    ensureId(tagId);

    const body: IDataObject = {};

    const qs: IDataObject = {};

    const response = await apiRequest.call(this, 'DELETE', `/prospects/${prospectId}/tags/${tagId}`, body, qs);
    return response;
}
