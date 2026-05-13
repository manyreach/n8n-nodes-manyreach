interface ResponseWithData {
  data?: unknown;
  items?: unknown;
  records?: unknown;
  [key: string]: unknown;
}

export function extractArray(response: unknown, label: string = 'data') {
    if (!response) {
        throw new Error('Empty API response');
    }

    const responseObj = response as ResponseWithData;
    const candidates = [
        response,
        responseObj?.data,
        responseObj?.items,
        responseObj?.records,
    ];

    for (const c of candidates) {
        if (Array.isArray(c)) return c;
    }

    throw new Error(`Unexpected API response format for ${label}`);
}


export interface ManyResponse<T = unknown> {
  items: T[];
  pagination: unknown;
}

interface ResponseWithItems {
  items?: unknown;
  pagination?: unknown;
  [key: string]: unknown;
}

export function normalizeManyResponse<T = unknown>(response: unknown): ManyResponse<T> {
  const responseObj = response as ResponseWithItems;
  return {
    items: (Array.isArray(responseObj?.items) ? responseObj.items : Array.isArray(response) ? response : []) as T[],
    pagination: responseObj?.pagination ?? [],
  };
}