import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';

export async function checkDomain(this: IExecuteFunctions, index: number) {
  const domain = this.getNodeParameter('domain', index) as string;

  const qs: IDataObject = {
    domain: domain.trim(),
  };

  const response = await apiRequest.call(this, 'GET', '/blacklist/domains/check', {}, qs);
  return response;
}
