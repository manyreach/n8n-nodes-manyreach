import { IExecuteFunctions } from 'n8n-workflow';
import { getMessages } from '../resources/Message/message.getMessage';
import { createMessage } from '../resources/Message/message.create';

export async function executeMessage(this: IExecuteFunctions, operation: string, index: number) {
  switch (operation) {
    case 'create':
      return await createMessage.call(this, index);
    case 'getMessage':
      return await getMessages.call(this, index);
    default:
      throw new Error(`Operation "${operation}" not supported for Message resource`);
  }
}

