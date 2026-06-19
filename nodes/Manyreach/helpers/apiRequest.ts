import {
  IExecuteFunctions,
  ILoadOptionsFunctions,
  IDataObject,
  IHttpRequestMethods,
} from 'n8n-workflow';
import { BASE_URL } from '../ManyreachConfig';
import { getTelemetryHeaders } from './telemetry';

export async function apiRequest(
  this: IExecuteFunctions | ILoadOptionsFunctions,
  method: IHttpRequestMethods,
  endpoint: string,
  body: IDataObject = {},
  qs: IDataObject = {},
) {
  if (!BASE_URL) {
    throw new Error('Base URL missing in credentials');
  }

  const options = {
    method,
    url: `${BASE_URL}${endpoint}`,
    qs,
    body,
    json: true,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...getTelemetryHeaders(this),
    },
  };

  return await this.helpers.httpRequestWithAuthentication.call(
    this,
    'manyreachApi',
    options,
  );
}
      