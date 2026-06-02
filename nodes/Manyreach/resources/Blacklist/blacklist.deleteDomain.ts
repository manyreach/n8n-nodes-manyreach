import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';

export async function deleteDomain(this: IExecuteFunctions, index: number) {
  const id = this.getNodeParameter('id', index) as number;

  await apiRequest.call(this, 'DELETE', `/blacklist/domains/${id}`);
  return { success: true };
}
