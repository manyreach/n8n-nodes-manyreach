import {
    ILoadOptionsFunctions,
        INodePropertyOptions,
} from 'n8n-workflow';
import { apiRequest } from '../../../helpers/apiRequest';
import { extractArray  } from '../../../helpers/response.convert';
import { ensureId, extractNumericId } from '../../../helpers/validation';
import { searchResourceLocator , loadDropdown } from '../../../helpers/searchHelper';

async function fetchSequenceOptions(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {

    const rawcampaignId = this.getCurrentNodeParameter('campaignId');
    const campaignId = extractNumericId(rawcampaignId);
    ensureId(campaignId);
    
    // If no campaign selected, return empty list
    if (!campaignId) {
        return [];
    }

    const response = await apiRequest.call(this, 'GET', `/campaigns/${campaignId}/sequences`, {}, {});
    const sequences: unknown[] = extractArray(response, 'sequences');
    return sequences.map((seq: unknown) => {
        const sequence = seq as Record<string, unknown>;
        const rawValue = sequence.sequenceId ?? sequence.sequenceid;
        const value = typeof rawValue === 'string' || typeof rawValue === 'number' || typeof rawValue === 'boolean' 
          ? rawValue 
          : String(rawValue ?? '');
        return {
        name: (sequence.Name ?? sequence.name ?? `Sequence ${sequence.Id ?? sequence.id}`) as string,
        value: value as string | number | boolean,
    };
    }).filter((option) => option.value !== undefined && option.value !== null && option.value !== '');
}

export async function loadSequencesForDropdown(this: ILoadOptionsFunctions) 
{
  return loadDropdown.call(this, fetchSequenceOptions);
}

export async function searchSequencesForResourceLocator(this: ILoadOptionsFunctions,filter?: string)
{
    return searchResourceLocator.call(this, fetchSequenceOptions, filter);
}