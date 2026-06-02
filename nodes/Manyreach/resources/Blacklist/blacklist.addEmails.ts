import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';

export async function addEmails(this: IExecuteFunctions, index: number) {
  const rawEmails = this.getNodeParameter('emails', index) as string;

  const emailsList = rawEmails
    .split(/[,\n]/)
    .map(e => e.trim().toLowerCase())
    .filter(e => e !== '');

  const body: IDataObject = {
    emails: emailsList,
  };

  const response = await apiRequest.call(this, 'POST', '/blacklist/emails', body);
  return response;
}
