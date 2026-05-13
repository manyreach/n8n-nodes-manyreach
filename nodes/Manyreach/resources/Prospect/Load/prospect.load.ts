import {
  ILoadOptionsFunctions,
  INodePropertyOptions,
} from 'n8n-workflow';
import { apiRequest } from '../../../helpers/apiRequest';
import { extractArray } from '../../../helpers/response.convert';
import { loadDropdown , searchResourceLocator} from '../../../helpers/searchHelper';

async function fetchProspectOptions(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
  const returnData: INodePropertyOptions[] = [];
  let page = 1;
  const limit = 1000;
  let hasMore = true;

  while (hasMore) {
    const response = await apiRequest.call(this, 'GET', '/prospects', {}, { limit, page });
    const prospects: unknown[] = extractArray(response, 'prospects');

    if (prospects.length === 0) {
      hasMore = false;
    } else {
      const options = prospects.map((prospect: unknown) => {
        const pr = prospect as Record<string, unknown>;
        const rawValue = pr.prospectId;
        const value = typeof rawValue === 'string' || typeof rawValue === 'number' || typeof rawValue === 'boolean' 
          ? rawValue 
          : String(rawValue ?? '');
        return {
        name: (pr.email ?? `Prospect ${pr.id}`) as string,
        value: value as string | number | boolean,
      };
      }).filter((option) => option.value !== undefined && option.value !== null && option.value !== '');

      returnData.push(...options);

      if (prospects.length < limit) {
        hasMore = false;
      } else {
        page++;
      }
    }
  }
  return returnData;

}

export async function loadProspectsForDropdown( this : ILoadOptionsFunctions,)
{
  return loadDropdown.call(this, fetchProspectOptions);
}

export async function searchProspectsForResourceLocator(this : ILoadOptionsFunctions , filter? : string )
{
  return searchResourceLocator.call(this, fetchProspectOptions, filter);
}
