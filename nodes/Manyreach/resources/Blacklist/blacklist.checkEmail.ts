import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';

export async function checkEmail(this: IExecuteFunctions, index: number) {
  const email = this.getNodeParameter('email', index) as string;

  const qs: IDataObject = {
    email: email.trim(),
  };

  const response = await apiRequest.call(this, 'GET', '/blacklist/emails/check', {}, qs);
  return response;
}
