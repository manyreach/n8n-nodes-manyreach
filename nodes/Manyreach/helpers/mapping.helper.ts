import { IDataObject } from 'n8n-workflow';

/**
 * Maps properties from a source object to a target object if they are not undefined.
 * 
 * @param source The source object (e.g., additionalFields)
 * @param target The target object (e.g., API body)
 * @param excludeKeys Optional list of keys to exclude from mapping
 */
export function mapAdditionalFields(source: IDataObject, target: IDataObject, excludeKeys: string[] = []): void {
    for (const key of Object.keys(source)) {
        if (!excludeKeys.includes(key) && source[key] !== undefined) {
            target[key] = source[key];
        }
    }
}
