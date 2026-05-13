import {
  ILoadOptionsFunctions,
  INodePropertyOptions,
} from 'n8n-workflow';
import { apiRequest } from '../../../helpers/apiRequest';
import { extractArray } from '../../../helpers/response.convert';
import { loadDropdown , searchResourceLocator} from '../../../helpers/searchHelper';

async function fetchUserOptions(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
  const returnData: INodePropertyOptions[] = [];
  let page = 1;
  const limit = 100;
  let hasMore = true;

  while (hasMore) {
    const response = await apiRequest.call(this, 'GET', '/users', {}, { limit, page });
    const users: unknown[] = extractArray(response, 'users');
    if (users.length === 0) {
      hasMore = false;
    } else {
      const options = users.map((user: unknown) => {
        const u = user as Record<string, unknown>;
        const rawValue = u.userId;
        const value = typeof rawValue === 'string' || typeof rawValue === 'number' || typeof rawValue === 'boolean' 
          ? rawValue 
          : String(rawValue ?? '');
        return {
        name: (u.email ?? `User ${u.id}`) as string,
        value: value as string | number | boolean,
      };
      }).filter((option) => option.value !== undefined && option.value !== null && option.value !== '');

      returnData.push(...options);

      if (users.length < limit) {
        hasMore = false;
      } else {
        page++;
      }
    }
  }
  return returnData;

}

export async function loadUsersForDropdown( this : ILoadOptionsFunctions,)
{
  return loadDropdown.call(this, fetchUserOptions);
}

export async function searchUsersForResourceLocator(this : ILoadOptionsFunctions , filter? : string )
{
  return searchResourceLocator.call(this, fetchUserOptions, filter);
}
