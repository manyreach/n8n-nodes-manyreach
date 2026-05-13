import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { extractResourceId } from '../../helpers/validation';

export async function getStatsCampaign(this: IExecuteFunctions, index: number) {
  const resourceLocator = this.getNodeParameter('campaignId', index) as unknown;
  const id = extractResourceId(resourceLocator);
  
  const qs: IDataObject = {};
  const dateStart = this.getNodeParameter('dateStart', index, undefined) as string | undefined;
  if (dateStart !== undefined) {
    qs.dateStart = dateStart;
  }
  const dateEnd = this.getNodeParameter('dateEnd', index, undefined) as string | undefined;
  if (dateEnd !== undefined) {
    qs.dateEnd = dateEnd;
  }
  const refresh = this.getNodeParameter('refresh', index, undefined) as boolean | undefined;
  if (refresh !== undefined) {
    qs.refresh = refresh;
  }

  const response = await apiRequest.call(this, 'GET', `/campaigns/${id}/stats`, {},qs);
  return response;
}
