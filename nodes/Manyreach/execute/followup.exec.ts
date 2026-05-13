import { IExecuteFunctions } from 'n8n-workflow';
import { getFollowup } from '../resources/Followup/followup.getById';
import { updateFollowup } from '../resources/Followup/followup.update';
import { deleteFollowup } from '../resources/Followup/followup.delete';
import { createFollowupsSequence } from '../resources/Followup/followup.create';


export async function executeFollowup(this: IExecuteFunctions, operation: string, i: number): Promise<unknown> {
  switch (operation) {
    case 'getById':
      return  await getFollowup.call(this, i);
    case 'create':
      return await createFollowupsSequence.call(this, i);
    case 'update':
      return await updateFollowup.call(this, i);
    case 'delete':
      return await deleteFollowup.call(this, i);
    default:
      throw new Error(`Operation "${operation}" not supported for Followups`);
  }
}


