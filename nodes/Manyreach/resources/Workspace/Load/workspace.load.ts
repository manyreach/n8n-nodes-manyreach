import {
  ILoadOptionsFunctions,
  INodePropertyOptions,
} from 'n8n-workflow';
import { apiRequest } from '../../../helpers/apiRequest';
import { extractArray } from '../../../helpers/response.convert';
import { loadDropdown, searchResourceLocator } from '../../../helpers/searchHelper';

async function fetchWorkspaceOptions(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
  const returnData: INodePropertyOptions[] = [];
  let page = 1;
  const limit = 100;
  let hasMore = true;

  while (hasMore) {
    const response = await apiRequest.call(this, 'GET', '/workspaces', {}, { limit, page });
    const workspaces: unknown[] = extractArray(response, 'workspaces');

    if (workspaces.length === 0) {
      hasMore = false;
    } else {
      const options = workspaces.map((workspace: unknown) => {
        const ws = workspace as Record<string, unknown>;
        const rawValue = ws.workspaceId;
        const value = typeof rawValue === 'string' || typeof rawValue === 'number' || typeof rawValue === 'boolean' 
          ? rawValue 
          : String(rawValue ?? '');
        return {
        name: (ws.title ?? `Workspace ${ws.workspaceId}`) as string,
        value: value as string | number | boolean,
      };
      }).filter((option) => option.value !== undefined && option.value !== null && option.value !== '');

      returnData.push(...options);

      if (workspaces.length < limit) {
        hasMore = false;
      } else {
        page++;
      }
    }
  }

  return returnData;
}

export async function loadWorkspacesForDropdown(this: ILoadOptionsFunctions,) {
  return loadDropdown.call(this, fetchWorkspaceOptions);
}

export async function searchWorkspacesForResourceLocator(this: ILoadOptionsFunctions, filter?: string) {
  return searchResourceLocator.call(this, fetchWorkspaceOptions, filter);
}

