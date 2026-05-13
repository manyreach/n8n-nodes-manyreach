import {
  ILoadOptionsFunctions,
  INodePropertyOptions,
} from 'n8n-workflow';
import { apiRequest } from '../../../helpers/apiRequest';
import { extractArray } from '../../../helpers/response.convert';
import { loadDropdown, searchResourceLocator } from '../../../helpers/searchHelper';

async function fetchSenderOptions(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
  const returnData: INodePropertyOptions[] = [];
  let page = 1;
  const limit = 100;
  let hasMore = true;

  while (hasMore) {
    const response = await apiRequest.call(this, 'GET', '/senders', {}, { limit, page });
    const senders: unknown[] = extractArray(response, 'senders');

    if (senders.length === 0) {
      hasMore = false;
    } else {
      const options = senders.map((sender: unknown) => {
        const s = sender as Record<string, unknown>;
        const rawValue = s.senderId;
        const value = typeof rawValue === 'string' || typeof rawValue === 'number' || typeof rawValue === 'boolean' 
          ? rawValue 
          : String(rawValue ?? '');
        return {
        name: (s.email ?? `Sender ${s.senderId}`) as string,
        value: value as string | number | boolean,
      };
      }).filter((option) => option.value !== undefined && option.value !== null && option.value !== '');

      returnData.push(...options);

      if (senders.length < limit) {
        hasMore = false;
      } else {
        page++;
      }
    }
  }

  return returnData;
}

export async function loadSendersForDropdown(this: ILoadOptionsFunctions,) {
  return loadDropdown.call(this, fetchSenderOptions);
}

export async function searchSendersForResourceLocator(this: ILoadOptionsFunctions, filter?: string) {
  return searchResourceLocator.call(this, fetchSenderOptions, filter);
}

