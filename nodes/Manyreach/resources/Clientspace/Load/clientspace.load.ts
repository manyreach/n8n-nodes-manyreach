import {
  ILoadOptionsFunctions,
  INodePropertyOptions,
} from 'n8n-workflow';
import { apiRequest } from '../../../helpers/apiRequest';
import { extractArray } from '../../../helpers/response.convert';
import { loadDropdown , searchResourceLocator} from '../../../helpers/searchHelper';

async function fetchClientspaceOptions(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
  const returnData: INodePropertyOptions[] = [];
  let page = 1;
  const limit = 100;
  let hasMore = true;

  while (hasMore) {
    const response = await apiRequest.call(this, 'GET', '/clientspaces', {}, { limit, page });
    const clientspaces: unknown[] = extractArray(response, 'clientspaces');

    if (clientspaces.length === 0) {
      hasMore = false;
    } else {
      const options = clientspaces.map((clientspace: unknown) => {
        const cs = clientspace as Record<string, unknown>;
        const rawValue = cs.clientspaceId;
        const value = typeof rawValue === 'string' || typeof rawValue === 'number' || typeof rawValue === 'boolean' 
          ? rawValue 
          : String(rawValue ?? '');
        return {
        name: (cs.title ?? `Clientspace ${cs.clientspaceId}`) as string,
        value: value as string | number | boolean,
      };
      }).filter((option) => option.value !== undefined && option.value !== null && option.value !== '');

      returnData.push(...options);

      if (clientspaces.length < limit) {
        hasMore = false;
      } else {
        page++;
      }
    }
  }
  return returnData;

}

export async function loadClientspacesForDropdown( this : ILoadOptionsFunctions,)
{
  return loadDropdown.call(this, fetchClientspaceOptions);
}

export async function searchClientspacesForResourceLocator(this : ILoadOptionsFunctions , filter? : string )
{
  return searchResourceLocator.call(this, fetchClientspaceOptions, filter);
}
