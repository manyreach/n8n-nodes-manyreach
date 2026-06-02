import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';

export async function addDomains(this: IExecuteFunctions, index: number) {
  const rawDomains = this.getNodeParameter('domains', index) as string;

  const domainsList = rawDomains
    .split(/[,\n]/)
    .map(d => d.trim())
    .filter(d => d !== '');

  const body: IDataObject = {
    domains: domainsList,
  };

  const response = await apiRequest.call(this, 'POST', '/blacklist/domains', body);
  return response;
}
