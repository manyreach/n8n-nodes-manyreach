import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { extractResourceId } from '../../helpers/validation';

export async function updateWorkspace(this: IExecuteFunctions, index: number) {

    const resourceLocator = this.getNodeParameter('workspaceId', index) as unknown;
    const id = extractResourceId(resourceLocator);

    const body: IDataObject = {};
    const title = this.getNodeParameter('title', index) as string;
    if (title) {
        body.title = title;
    }

    const response = await apiRequest.call(this, 'PATCH', `/workspaces/${id}`, body);
    return response;
}
