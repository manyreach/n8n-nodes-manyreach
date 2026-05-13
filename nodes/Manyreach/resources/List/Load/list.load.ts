import {
  ILoadOptionsFunctions,
  INodePropertyOptions,
} from 'n8n-workflow';
import { apiRequest } from '../../../helpers/apiRequest';
import { extractArray } from '../../../helpers/response.convert';
import { loadDropdown , searchResourceLocator} from '../../../helpers/searchHelper';

async function fetchListOptions(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
  const returnData: INodePropertyOptions[] = [];
  let page = 1;
  const limit = 100;
  let hasMore = true;

  while (hasMore) {
    const response = await apiRequest.call(this, 'GET', '/lists', {}, { limit, page });
    const lists: unknown[] = extractArray(response, 'lists');

    if (lists.length === 0) {
      hasMore = false;
    } else {
      const options = lists.map((list: unknown) => {
        const lst = list as Record<string, unknown>;
        const rawValue = lst.listId;
        const value = typeof rawValue === 'string' || typeof rawValue === 'number' || typeof rawValue === 'boolean' 
          ? rawValue 
          : String(rawValue ?? '');
        return {
        name: (lst.title ?? `List ${lst.listId}`) as string,
        value: value as string | number | boolean,
      };
      }).filter((option) => option.value !== undefined && option.value !== null && option.value !== '');

      returnData.push(...options);

      if (lists.length < limit) {
        hasMore = false;
      } else {
        page++;
      }
    }
  }
  return returnData;

}

export async function loadListsForDropdown( this : ILoadOptionsFunctions,)
{
  return loadDropdown.call(this, fetchListOptions);
}

export async function searchListsForResourceLocator(this : ILoadOptionsFunctions , filter? : string )
{
  return searchResourceLocator.call(this, fetchListOptions, filter);
}
