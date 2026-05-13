import {
  IExecuteFunctions,
  ILoadOptionsFunctions,
  IDataObject,
  IHttpRequestMethods,
} from 'n8n-workflow';
import { BASE_URL } from '../ManyreachConfig';

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
    },
  };

  try {
    const response = await this.helpers.httpRequestWithAuthentication.call(
      this,
      'manyreachApi',
      options,
    );
    return response;
  } catch (err: unknown) {
    interface ErrorWithDetails {
      error?: {
        detail?: string;
        title?: string;
        message?: string;
        status?: number;
      };
      statusCode?: number;
      status?: number;
      message?: string;
    }

    const errorObj = err as ErrorWithDetails;
    const errorData = errorObj.error || {};
    // Prioritize 'detail' as requested by user, then 'title', then 'message', then fallback
    const message = errorData.detail || errorData.title || errorData.message || errorObj.message || 'API request failed';

    // Create new Error object with the specific message
    const error = new Error(message);

    // Attach status info if available
    const status = errorData.status || errorObj.statusCode || errorObj.status;
    if (status) {
      (error as Error & { statusCode?: number; httpCode?: number }).statusCode = status;
      (error as Error & { statusCode?: number; httpCode?: number }).httpCode = status;
    }

    // Attach the full error data for debugging visibility
    (error as Error & { errorData?: unknown }).errorData = errorData;

    throw error;
  }
}
      