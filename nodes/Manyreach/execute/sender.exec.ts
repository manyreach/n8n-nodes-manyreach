import { IExecuteFunctions } from 'n8n-workflow';
import { getSenders } from '../resources/Sender/sender.getMany';
import { getSender } from '../resources/Sender/sender.getById';
import { createSender } from '../resources/Sender/sender.create';
import { updateSender } from '../resources/Sender/sender.update';
import { deleteSender } from '../resources/Sender/sender.delete';
import { getErrorsSender } from '../resources/Sender/sender.getErrors';
import { addTagToSender } from '../resources/Sender/sender.addTag';
import { removeTagFromSender } from '../resources/Sender/sender.removeTag';

export async function executeSender(this: IExecuteFunctions, operation: string, i: number): Promise<unknown> {
    switch (operation) {
        case 'getMany':
            return await getSenders.call(this, i);
        case 'getById':
            return await getSender.call(this, i);
        case 'create':
            return await createSender.call(this, i);
        case 'update':
            return await updateSender.call(this, i);
        case 'delete':
            return await deleteSender.call(this, i);
        case 'getErrors':
            return await getErrorsSender.call(this, i);
        case 'addTag':
            return await addTagToSender.call(this, i);
        case 'removeTag':
            return await removeTagFromSender.call(this, i);
        default:
            throw new Error(`Operation "${operation}" not supported for Sender`);
    }
}