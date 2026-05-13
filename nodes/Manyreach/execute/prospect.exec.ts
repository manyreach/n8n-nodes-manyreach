import { IExecuteFunctions } from 'n8n-workflow';
import { bulkProspect } from '../resources/Prospect/prospect.bulk';
import { createProspect } from '../resources/Prospect/prospect.create';
import { getProspects } from '../resources/Prospect/prospect.getMany';
import { updateProspect } from '../resources/Prospect/prospect.update';
import { deleteProspect } from '../resources/Prospect/prospect.delete';
import { getTagsProspect } from '../resources/Prospect/prospect.getTags';
import { getMessagesProspect } from '../resources/Prospect/prospect.getMessages';
import { addTagsProspect } from '../resources/Prospect/prospect.addTags';
import { removeTagsProspect } from '../resources/Prospect/prospect.removeTags';
import { getProspect } from '../resources/Prospect/prospect.getById';

export async function executeProspect(this: IExecuteFunctions, operation: string, index: number) {
  switch (operation) {
    case 'bulk':
      return await bulkProspect.call(this, index);
    case 'getMany':
      return await getProspects.call(this, index);
    case 'getById':
      return await getProspect.call(this, index);
    case 'create':
      return await createProspect.call(this, index);
    case 'update':
      return await updateProspect.call(this, index);
    case 'delete':
      return await deleteProspect.call(this, index);
    case 'getTags':
      return await getTagsProspect.call(this, index);
    case 'addTags':
      return await addTagsProspect.call(this, index);
    case 'removeTags':
      return await removeTagsProspect.call(this, index);
    case 'getMessages':
      return await getMessagesProspect.call(this, index);
    default:
      throw new Error(`Operation "${operation}" not supported for Prospect`);
  }
}
