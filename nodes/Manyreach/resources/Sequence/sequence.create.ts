import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { extractResourceId } from '../../helpers/validation';
import { mapAdditionalFields } from '../../helpers/mapping.helper';

export async function createSequences(this: IExecuteFunctions, index: number) {
  const resourceLocator = this.getNodeParameter('campaignId', index) as unknown;
  const id = extractResourceId(resourceLocator);

  const body: IDataObject = {};

  const name = this.getNodeParameter('name', index) as string;
  if (name) {
    body.name = name;
  }

  // Optional fields
  const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;
  mapAdditionalFields(additionalFields, body);

  const response = await apiRequest.call(this, 'POST', `/campaigns/${id}/sequences`, body);
  return response;
}
