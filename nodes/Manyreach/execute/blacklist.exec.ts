import { IExecuteFunctions } from 'n8n-workflow';
import { getDomains } from '../resources/Blacklist/blacklist.getDomains';
import { checkDomain } from '../resources/Blacklist/blacklist.checkDomain';
import { addDomains } from '../resources/Blacklist/blacklist.addDomains';
import { deleteDomain } from '../resources/Blacklist/blacklist.deleteDomain';
import { getEmails } from '../resources/Blacklist/blacklist.getEmails';
import { checkEmail } from '../resources/Blacklist/blacklist.checkEmail';
import { addEmails } from '../resources/Blacklist/blacklist.addEmails';
import { deleteEmail } from '../resources/Blacklist/blacklist.deleteEmail';

export async function executeBlacklist(this: IExecuteFunctions, operation: string, index: number) {
  switch (operation) {
    case 'getDomains':
      return await getDomains.call(this, index);
    case 'checkDomain':
      return await checkDomain.call(this, index);
    case 'addDomains':
      return await addDomains.call(this, index);
    case 'deleteDomain':
      return await deleteDomain.call(this, index);
    case 'getEmails':
      return await getEmails.call(this, index);
    case 'checkEmail':
      return await checkEmail.call(this, index);
    case 'addEmails':
      return await addEmails.call(this, index);
    case 'deleteEmail':
      return await deleteEmail.call(this, index);
    default:
      throw new Error(`Operation "${operation}" not supported for Blacklist resource`);
  }
}
