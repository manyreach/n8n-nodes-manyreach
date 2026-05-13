import { IExecuteFunctions } from 'n8n-workflow';
import { updateWhitelabel } from '../resources/Whitelable/whitelable.update';

export async function executeWhitelabel(this: IExecuteFunctions, operation: string, index: number) {
  switch (operation) {
    case 'update':
      return await updateWhitelabel.call(this, index);
    default:
      throw new Error(`Operation "${operation}" not supported for Whitelabel resource`);
  }
}

