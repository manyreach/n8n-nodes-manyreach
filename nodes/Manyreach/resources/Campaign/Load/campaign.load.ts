import {
  ILoadOptionsFunctions,
  INodePropertyOptions,
} from 'n8n-workflow';
import { apiRequest } from '../../../helpers/apiRequest';
import { extractArray } from '../../../helpers/response.convert';
import { loadDropdown, searchResourceLocator } from '../../../helpers/searchHelper';

async function fetchCampaignOptions(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
  const returnData: INodePropertyOptions[] = [];
  let page = 1;
  const limit = 100;
  let hasMore = true;

  while (hasMore) {
    const response = await apiRequest.call(this, 'GET', '/campaigns', {}, { limit, page });
    const campaigns: unknown[] = extractArray(response, 'campaigns');

    if (campaigns.length === 0) {
      hasMore = false;
    } else {
      const options = campaigns.map((campaign: unknown) => {
        const camp = campaign as Record<string, unknown>;
        const rawValue = camp.Id ?? camp.id ?? camp.CampaignId ?? camp.campaignId;
        const value = typeof rawValue === 'string' || typeof rawValue === 'number' || typeof rawValue === 'boolean' 
          ? rawValue 
          : String(rawValue ?? '');
        return {
        name: (camp.Name ?? camp.name ?? camp.Title ?? camp.title ?? `Campaign ${camp.Id ?? camp.id}`) as string,
        value: value as string | number | boolean,
      };
      }).filter((option) => option.value !== undefined && option.value !== null && option.value !== '');

      returnData.push(...options);

      if (campaigns.length < limit) {
        hasMore = false;
      } else {
        page++;
      }
    }
  }

  return returnData;
}

export async function loadCampaignsForDropdown(this: ILoadOptionsFunctions,) {
  return loadDropdown.call(this, fetchCampaignOptions);
}

export async function searchCampaignsForResourceLocator(this: ILoadOptionsFunctions, filter?: string) {
  return searchResourceLocator.call(this, fetchCampaignOptions, filter);
}

