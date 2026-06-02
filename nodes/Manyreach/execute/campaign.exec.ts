import { IExecuteFunctions } from 'n8n-workflow';
import { getCampaigns } from '../resources/Campaign/campaign.getMany';
import { getCampaign } from '../resources/Campaign/campaign.getById';
import { updateCampaign } from '../resources/Campaign/campaign.update';
import { createCampaign } from '../resources/Campaign/campaign.create';
import { deleteCampaign } from '../resources/Campaign/campaign.delete';
import { startCampaign } from '../resources/Campaign/campaign.start';
import { pauseCampaign } from '../resources/Campaign/campaign.pause';
import { copyCampaign } from '../resources/Campaign/campaign.copy';
import { getStatsCampaign } from '../resources/Campaign/campaign.getStats';
import { archiveCampaign } from '../resources/Campaign/campaign.archive';
import { unarchiveCampaign } from '../resources/Campaign/campaign.unarchive';
import { removeProspectFromCampaign } from '../resources/Campaign/campaign.removeProspect';
import { addTagToCampaign } from '../resources/Campaign/campaign.addTag';
import { removeTagFromCampaign } from '../resources/Campaign/campaign.removeTag';

export async function executeCampaign(this: IExecuteFunctions, operation: string, i: number): Promise<unknown> {
  switch (operation) {
    case 'copy':
      return  await copyCampaign.call(this, i);
    case 'create':
      return  await createCampaign.call(this, i);
    case 'delete':
      return  await deleteCampaign.call(this, i);
    case 'getMany':
      return  await getCampaigns.call(this, i);
    case 'getById':
      return  await getCampaign.call(this, i);
    case 'getStats':
      return  await getStatsCampaign.call(this, i); 
    case 'pause':
      return  await pauseCampaign.call(this, i);
    case 'start':
      return  await startCampaign.call(this, i);
    case 'update':
      return  await updateCampaign.call(this, i);
    case 'archive':
      return  await archiveCampaign.call(this, i);
    case 'unarchive':
      return  await unarchiveCampaign.call(this, i);
    case 'removeProspect':
      return  await removeProspectFromCampaign.call(this, i);
    case 'addTag':
      return  await addTagToCampaign.call(this, i);
    case 'removeTag':
      return  await removeTagFromCampaign.call(this, i);
    default:
      throw new Error(`Operation "${operation}" not supported for Campaign`);
  }
}


