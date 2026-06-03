import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';

export async function deleteDomain(this: IExecuteFunctions, index: number) {
  const blockId = this.getNodeParameter('blockId', index) as number;

  await apiRequest.call(this, 'DELETE', `/blacklist/domains/${blockId}`);
  return { success: true };
}
