import { IExecuteFunctions } from 'n8n-workflow';
import { getWorkspaces } from '../resources/Workspace/workspace.getMany';
import { getWorkspace } from '../resources/Workspace/workspace.getById';
import { createWorkspace } from '../resources/Workspace/workspace.create';
import { updateWorkspace } from '../resources/Workspace/workspace.update';
import { deleteWorkspace } from '../resources/Workspace/workspace.delete';



export async function executeWorkspace(this: IExecuteFunctions, operation: string, i: number): Promise<unknown> {
    switch (operation) {
        case 'getMany':
            return await getWorkspaces.call(this, i);
        case 'getById':
            return await getWorkspace.call(this, i);
        case 'create':
            return await createWorkspace.call(this, i);
        case 'update':
            return await updateWorkspace.call(this, i);
        case 'delete':
            return await deleteWorkspace.call(this, i);
        default:
            throw new Error(`Operation "${operation}" not supported for Workspace`);
    }
}


