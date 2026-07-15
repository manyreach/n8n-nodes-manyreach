import {
  IExecuteFunctions,
  ILoadOptionsFunctions,
  IDataObject,
  IHttpRequestMethods,
} from 'n8n-workflow';
import { BASE_URL } from '../ManyreachConfig';
import { getTelemetryHeaders } from './telemetry';

const ORGANIZATION_ID_PARAMETER = 'organizationId';
const ORGANIZATION_ID_QUERY_PARAMETER = 'OrganizationID';
const ORGANIZATION_ID_EXCLUDED_ENDPOINTS = ['/workspaces', '/clientspaces'];

type LoadOptionsWithCurrentNodeParameter = ILoadOptionsFunctions & {
  getCurrentNodeParameter(parameterName: string): unknown;
};

const apiRequestItemIndexes = new WeakMap<IExecuteFunctions | ILoadOptionsFunctions, number>();

export function setApiRequestItemIndex(
  context: IExecuteFunctions | ILoadOptionsFunctions,
  itemIndex: number,
): void {
  apiRequestItemIndexes.set(context, itemIndex);
}

export function clearApiRequestItemIndex(
  context: IExecuteFunctions | ILoadOptionsFunctions,
): void {
  apiRequestItemIndexes.delete(context);
}

export async function apiRequest(
  this: IExecuteFunctions | ILoadOptionsFunctions,
  method: IHttpRequestMethods,
  endpoint: string,
  body: IDataObject = {},
  qs: IDataObject | number = {},
  itemIndex?: number,
) {
  if (!BASE_URL) {
    throw new Error('Base URL missing in credentials');
  }

  const query = typeof qs === 'number' ? {} : { ...qs };
  const requestItemIndex =
    typeof qs === 'number'
      ? qs
      : itemIndex ??
        apiRequestItemIndexes.get(this) ??
        (hasGetNodeParameter(this) ? 0 : undefined);
  addOrganizationId.call(this, endpoint, query, requestItemIndex);

  const options = {
    method,
    url: `${BASE_URL}${endpoint}`,
    qs: query,
    body,
    json: true,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...getTelemetryHeaders(this),
    },
    skipSslCertificateValidation: true,
  };
  return await this.helpers.httpRequestWithAuthentication.call(
    this,
    'manyreachApi',
    options,
  );
}

function addOrganizationId(
  this: IExecuteFunctions | ILoadOptionsFunctions,
  endpoint: string,
  qs: IDataObject,
  itemIndex?: number,
) {
  const normalizedEndpoint = endpoint.split('?')[0].toLowerCase();

  if (
    ORGANIZATION_ID_EXCLUDED_ENDPOINTS.some((excludedEndpoint) =>
      normalizedEndpoint.startsWith(excludedEndpoint),
    )
  ) {
    delete qs[ORGANIZATION_ID_QUERY_PARAMETER];
    return;
  }

  if (qs[ORGANIZATION_ID_QUERY_PARAMETER] !== undefined) {
    return;
  }

  const organizationId = getOrganizationId.call(this, itemIndex);

  if (organizationId) {
    qs[ORGANIZATION_ID_QUERY_PARAMETER] = organizationId;
  }
}

function getOrganizationId(
  this: IExecuteFunctions | ILoadOptionsFunctions,
  itemIndex?: number,
): string {
  let organizationId: unknown;

  try {
    if (itemIndex !== undefined && hasGetNodeParameter(this)) {
      organizationId = this.getNodeParameter(ORGANIZATION_ID_PARAMETER, itemIndex, '');
    } else if (hasGetCurrentNodeParameter(this)) {
      organizationId = this.getCurrentNodeParameter(ORGANIZATION_ID_PARAMETER);
    }
  } catch {
    // Organization selection is optional in contexts where the parameter is unavailable.
    return '';
  }

  if (organizationId === undefined || organizationId === null) {
    return '';
  }

  return String(organizationId).trim();
}

function hasGetNodeParameter(
  context: IExecuteFunctions | ILoadOptionsFunctions,
): context is IExecuteFunctions {
  return typeof (context as IExecuteFunctions).getNodeParameter === 'function';
}

function hasGetCurrentNodeParameter(
  context: IExecuteFunctions | ILoadOptionsFunctions,
): context is LoadOptionsWithCurrentNodeParameter {
  return (
    typeof (context as ILoadOptionsFunctions & { getCurrentNodeParameter?: unknown })
      .getCurrentNodeParameter === 'function'
  );
}