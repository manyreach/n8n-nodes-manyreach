import { IExecuteFunctions, IDataObject, NodeOperationError } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { extractNumericId, validateEmail } from '../../helpers/validation';
import { mapAdditionalFields } from '../../helpers/mapping.helper';

export async function createProspect(this: IExecuteFunctions, index: number) {
  const body: IDataObject = {};

  // Required fields
  body.email = this.getNodeParameter('email', index) as string;

  if (!body.email) {
    throw new NodeOperationError(this.getNode(), 'The "Email" parameter is required to create a prospect.', { itemIndex: index });
  }

  if (!validateEmail(body.email)) {
    throw new NodeOperationError(this.getNode(), 'The "Email" parameter must be a valid email address.', { itemIndex: index });
  }

  const rawListId = this.getNodeParameter('listId', index, undefined);
  const isListIdSet = rawListId && (
      (typeof rawListId === 'object' && (rawListId as { value?: string | number }).value !== undefined && (rawListId as { value?: string | number }).value !== '' && (rawListId as { value?: string | number }).value !== 0) ||
      (typeof rawListId !== 'object' && rawListId !== '' && rawListId !== 0)
  );

  if (isListIdSet) {
      body.baseListId = extractNumericId(rawListId);
  }

  const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;
  mapAdditionalFields(additionalFields, body);

  const response = await apiRequest.call(this, 'POST', '/prospects', body);
  return response;
}
