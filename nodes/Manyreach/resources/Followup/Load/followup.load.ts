import {
    ILoadOptionsFunctions,
    INodePropertyOptions,
} from 'n8n-workflow';
import { apiRequest } from '../../../helpers/apiRequest';
import { extractArray  } from '../../../helpers/response.convert';
import { ensureId, extractNumericId } from '../../../helpers/validation';
import { searchResourceLocator , loadDropdown } from '../../../helpers/searchHelper';

async function fetchFollowupOptions(this: ILoadOptionsFunctions,): Promise<INodePropertyOptions[]> {
    // Get the selected sequenceId from the node parameters
    const rawsequenceId = this.getCurrentNodeParameter('sequenceId');
    const sequenceId = extractNumericId(rawsequenceId);
    ensureId(sequenceId);
    // If no sequence selected, return empty list
    if (!sequenceId) {
        return [];
    }

    const response = await apiRequest.call(this, 'GET', `/sequences/${sequenceId}/followups`, {}, { limit: 100 });
    const followups: unknown[] = extractArray(response, 'followups');

    return followups.map((item: unknown) => {
        const itm = item as Record<string, unknown>;
        const rawValue = itm.followupId ?? itm.followupid;
        const value = typeof rawValue === 'string' || typeof rawValue === 'number' || typeof rawValue === 'boolean' 
          ? rawValue 
          : String(rawValue ?? '');
        return {
        name: (itm.Subject ?? itm.subject ?? `Followup ${itm.followupId ?? itm.followupid}`) as string,
        value: value as string | number | boolean,
    };
    }).filter((option) => option.value !== undefined && option.value !== null && option.value !== '');
}

export async function loadFollowupsForDropdown(this: ILoadOptionsFunctions) 
{
  return loadDropdown.call(this, fetchFollowupOptions);
}

export async function searchFollowupsForResourceLocator(this: ILoadOptionsFunctions,filter?: string) 
{
    return searchResourceLocator.call(this, fetchFollowupOptions, filter);
}
