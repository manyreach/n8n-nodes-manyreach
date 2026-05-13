import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { mapAdditionalFields } from '../../helpers/mapping.helper';

export async function createClientspace(this: IExecuteFunctions, index: number) {

    const body: IDataObject = {};
    const title = this.getNodeParameter('title', index) as string;

    const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;
    mapAdditionalFields(additionalFields,body);

    body.title = title;
    
    const response = await apiRequest.call(this, 'POST', '/clientspaces', body);
    return response;
}
