import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { extractResourceId, extractNumericId } from '../../helpers/validation';

export async function addTagToCampaign(this: IExecuteFunctions, index: number) {
  const campaignLocator = this.getNodeParameter('campaignId', index) as unknown;
  const campaignId = extractResourceId(campaignLocator);

  const tagLocator = this.getNodeParameter('tagId', index) as unknown;
  const tagId = extractNumericId(tagLocator);

  const body: IDataObject = {
    tagId: tagId,
  };

  const response = await apiRequest.call(this, 'POST', `/campaigns/${campaignId}/tags`, body);
  return response;
}
