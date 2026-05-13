import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { ensureId, extractNumericId } from '../../helpers/validation';
import { mapAdditionalFields } from '../../helpers/mapping.helper';

export async function createProspect(this: IExecuteFunctions, index: number) {
  const body: IDataObject = {};

  // Required fields
  body.email = this.getNodeParameter('email', index) as string;

  if (!body.email) {
    throw new Error('Email is required to create a prospect');
  }

  const rawListId = this.getNodeParameter('listId', index, undefined);
  const listId = extractNumericId(rawListId);
  ensureId(listId);

  body.baseListId = listId;

  const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;
  mapAdditionalFields(additionalFields, body);

  const response = await apiRequest.call(this, 'POST', '/prospects', body);
  return response;
}
