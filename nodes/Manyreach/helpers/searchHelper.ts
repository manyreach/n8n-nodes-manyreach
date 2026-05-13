import {
    ILoadOptionsFunctions,
    INodeListSearchItems,
    INodeListSearchResult,
    INodePropertyOptions,
} from 'n8n-workflow';

type LoaderFn = (this: ILoadOptionsFunctions) => Promise<INodePropertyOptions[]>;

/**
 * Generic dropdown loader
 */
export async function loadDropdown
(
    this: ILoadOptionsFunctions,
    fetchFn: LoaderFn,
): Promise<INodePropertyOptions[]> 
{
    return fetchFn.call(this);
}

/**
 * Generic resource locator search
 */
export async function searchResourceLocator
(
    this: ILoadOptionsFunctions,
    fetchFn: LoaderFn,
    filter?: string,
): Promise<INodeListSearchResult> 

{
    const options = await fetchFn.call(this);
    const normalizedFilter = filter?.toLowerCase();
    const results: INodeListSearchItems[] = options
        .filter(option => {
            if (!normalizedFilter || !option.name) return true;
            return option.name.toLowerCase().includes(normalizedFilter);
        })
        .map(option => ({
            name: option.name ?? String(option.value),
            value: option.value,
        }));

    return { results };
}
