import { IExecuteFunctions } from 'n8n-workflow';
import { updateSequence } from '../resources/Sequence/sequence.update';
import { deleteSequence } from '../resources/Sequence/sequence.delete';
import { getSequences } from '../resources/Sequence/sequence.getMany';
import { createSequences } from '../resources/Sequence/sequence.create';
import { getSequenceFollowups } from '../resources/Sequence/sequence.getFollowups';

export async function executeSequence(this: IExecuteFunctions, operation: string, i: number): Promise<unknown> {
  switch (operation) {
    case 'getMany':
      return await getSequences.call(this, i);
    case 'getFollowups':
      return await getSequenceFollowups.call(this, i);
    case 'create':
      return await createSequences.call(this, i);
    case 'update':
      return await updateSequence.call(this, i);
    case 'delete':
      return await deleteSequence.call(this, i);
    default:
      throw new Error(`Operation "${operation}" not supported for Sequence`);
  }
}