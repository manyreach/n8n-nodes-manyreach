import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { mapAdditionalFields } from '../../helpers/mapping.helper';

export async function createUser(this: IExecuteFunctions, index: number) {

  const body: IDataObject = {};
  const email = this.getNodeParameter('email', index) as string;
  const accountType = this.getNodeParameter('accountType', index) as string;
  body.email = email;
  body.accountType = accountType;

  const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;
  mapAdditionalFields(additionalFields, body);

  const response = await apiRequest.call(this, 'POST', '/users', body);
  return response;
}
