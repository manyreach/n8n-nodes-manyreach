import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { ensureId, extractResourceId } from '../../helpers/validation';

export async function deleteSequence(this: IExecuteFunctions, index: number) {
  const rawSequenceId = this.getNodeParameter('sequenceId', index) as unknown;
  const sequenceId = extractResourceId(rawSequenceId);
  ensureId(sequenceId);
  await apiRequest.call(this, 'DELETE', `/sequences/${sequenceId}`);
  return { deleted: true };
}