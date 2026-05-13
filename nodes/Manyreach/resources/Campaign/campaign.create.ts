import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { mapAdditionalFields } from '../../helpers/mapping.helper';

export async function createCampaign(this: IExecuteFunctions, index: number) {
  const body: IDataObject = {};

  // Required fields
  const name = this.getNodeParameter('name', index) as string;

  if (name !== undefined) {
    body.name = name;
  } else {
    throw new Error('The "name" field is required.');
  }

  // Optional fields
  const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;
  mapAdditionalFields(additionalFields, body);

  const response = await apiRequest.call(this, 'POST', '/campaigns', body);
  return response;
}
