import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';

export async function createWorkspace(this: IExecuteFunctions, index: number) {

    const body: IDataObject = {};
    const title = this.getNodeParameter('title', index) as string;
    if(title) {
        body.title = title;
    }
    else throw new Error('Title is required');

    const response = await apiRequest.call(this, 'POST', '/workspaces', body);
    return response;
}
