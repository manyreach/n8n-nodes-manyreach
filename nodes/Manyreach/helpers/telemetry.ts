import { randomUUID } from 'crypto';
import { IExecuteFunctions, ILoadOptionsFunctions } from 'n8n-workflow';
import packageJson from '../../../package.json';
import { BUILD_ID, DISTRIBUTION } from './build-info';

const CLIENT_NAME = 'n8n-node';
const CLIENT_VERSION = packageJson.version || '0.0.0';

export function getTelemetryHeaders(
  context: IExecuteFunctions | ILoadOptionsFunctions,
): Record<string, string> {
  let workflowId = 'unsaved';
  let executionId = 'unknown';
  let nodeId = 'unknown';
  let typeVersion = 'unknown';
  let mode = 'unknown';
  try {
    const wf = context.getWorkflow?.()?.id;
    if (wf) workflowId = String(wf);
  } catch {
    // workflow ID isn't always available outside execute context
  }
  try {
    const exec = context.getExecutionId?.();
    if (exec) executionId = String(exec);
  } catch {
    // execution ID isn't available outside execute context
  }
  try {
    const node = context.getNode?.();
    if (node?.id) nodeId = String(node.id);
    if (node?.typeVersion !== undefined) typeVersion = String(node.typeVersion);
  } catch {
    // node info should generally be available; fall back if not
  }
  try {
    const m = context.getMode?.();
    if (m) mode = String(m);
  } catch {
    // mode isn't available outside execute context
  }

  const userAgent = `Manyreach-n8n-node/${CLIENT_VERSION} (dist:${DISTRIBUTION}; build:${BUILD_ID})`;
  return {
    'User-Agent': userAgent,
    'X-Manyreach-Client': CLIENT_NAME,
    'X-Manyreach-Client-Version': CLIENT_VERSION,
    'X-Manyreach-Node-Version': typeVersion,
    'X-Manyreach-Distribution': DISTRIBUTION,
    'X-Manyreach-Build-Id': BUILD_ID,
    'X-Manyreach-Workflow-Id': workflowId,
    'X-Manyreach-Node-Id': nodeId,
    'X-Manyreach-Execution-Id': executionId,
    'X-Manyreach-Execution-Mode': mode,
    'X-Request-Id': randomUUID(),
  };
}
