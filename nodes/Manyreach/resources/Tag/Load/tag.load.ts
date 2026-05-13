import {
  ILoadOptionsFunctions,
  INodePropertyOptions,
} from 'n8n-workflow';
import { apiRequest } from '../../../helpers/apiRequest';
import { extractArray } from '../../../helpers/response.convert';
import { loadDropdown , searchResourceLocator} from '../../../helpers/searchHelper';

async function fetchTagOptions(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
  const returnData: INodePropertyOptions[] = [];
  let page = 1;
  const limit = 100;
  let hasMore = true;

  while (hasMore) {
    const response = await apiRequest.call(this, 'GET', '/tags', {}, { limit, page });
    const tags: unknown[] = extractArray(response, 'tags');

    if (tags.length === 0) {
      hasMore = false;
    } else {
      const options = tags.map((tag: unknown) => {
        const t = tag as Record<string, unknown>;
        const rawValue = t.tagId;
        const value = typeof rawValue === 'string' || typeof rawValue === 'number' || typeof rawValue === 'boolean' 
          ? rawValue 
          : String(rawValue ?? '');
        return {
        name: (t.title ?? `Tag ${t.tagId}`) as string,
        value: value as string | number | boolean,
      };
      }).filter((option) => option.value !== undefined && option.value !== null && option.value !== '');

      returnData.push(...options);

      if (tags.length < limit) {
        hasMore = false;
      } else {
        page++;
      }
    }
  }
  return returnData;

}

export async function loadTagsForDropdown( this : ILoadOptionsFunctions,)
{
  return loadDropdown.call(this, fetchTagOptions);
}

export async function searchTagsForResourceLocator(this : ILoadOptionsFunctions , filter? : string )
{
  return searchResourceLocator.call(this, fetchTagOptions, filter);
}
