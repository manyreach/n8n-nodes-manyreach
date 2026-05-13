import { IExecuteFunctions } from 'n8n-workflow';
import { getClientspace } from '../resources/Clientspace/clientspace.getById';
import { getClientspaces } from '../resources/Clientspace/clientspace.getMany';
import { createClientspace } from '../resources/Clientspace/clientspace.create';
import { updateClientspace } from '../resources/Clientspace/clientspace.update';
import { deleteClientspace } from '../resources/Clientspace/clientspace.delete';

export async function executeClientspace(this: IExecuteFunctions, operation: string, i: number): Promise<unknown> {
    switch (operation) {
        case 'getMany':
            return await getClientspaces.call(this, i);
        case 'getById':
            return await getClientspace.call(this, i);
        case 'create':
            return await createClientspace.call(this, i);
        case 'update':
            return await updateClientspace.call(this, i);
        case 'delete':
            return await deleteClientspace.call(this, i);
        default:
            throw new Error(`Operation "${operation}" not supported for Clientspace`);
    }
}