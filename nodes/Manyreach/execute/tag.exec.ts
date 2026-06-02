import { IExecuteFunctions } from 'n8n-workflow';
import { getManyTags } from '../resources/Tag/tag.getMany';
import { createTag } from '../resources/Tag/tag.create';
import { getTagById } from '../resources/Tag/tag.getById';
import { getProspectsForTag } from '../resources/Tag/tag.getProspects';
import { getCampaignsForTag } from '../resources/Tag/tag.getCampaigns';
import { getSendersForTag } from '../resources/Tag/tag.getSenders';
import { updateTag } from '../resources/Tag/tag.update';
import { deleteTag } from '../resources/Tag/tag.delete';

export async function executeTag(this: IExecuteFunctions, operation: string, index: number) {
  switch (operation) {
    case 'getMany':
      return await getManyTags.call(this, index);
    case 'getById':
      return await getTagById.call(this, index);
    case 'getProspects':
      return await getProspectsForTag.call(this, index);
    case 'getCampaigns':
      return await getCampaignsForTag.call(this, index);
    case 'getSenders':
      return await getSendersForTag.call(this, index);
    case 'create':
      return await createTag.call(this, index);
    case 'update':
      return await updateTag.call(this, index);
    case 'delete':
      return await deleteTag.call(this, index);
    default:
      throw new Error(`Operation "${operation}" not supported for Tag resource`);
  }
}

