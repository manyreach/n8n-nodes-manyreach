import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { extractNumericId, ensureId } from '../../helpers/validation';

export async function updateList(this: IExecuteFunctions, index: number) {
    const rawListId = this.getNodeParameter('listId', index) as unknown;
    const listId = extractNumericId(rawListId);
    ensureId(listId);

    const body: IDataObject = {};
    const title = this.getNodeParameter('title', index) as string;
    const folderId = this.getNodeParameter('folderId', index) as string;
    if(title){
        body.title = title;
    }
    if(folderId){
        body.folderId = folderId;
    }
    const response = await apiRequest.call(this, 'PATCH', `/lists/${listId}`, body);
    return response;
}