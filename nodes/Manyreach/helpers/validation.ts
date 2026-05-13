/**
 * Helper function to extract resource ID from resource locator
 */
interface ResourceLocatorObject {
  value?: string | number;
  id?: string | number;
  [key: string]: unknown;
}

export function extractResourceId(resourceLocator: unknown): string | number {
  if (typeof resourceLocator === 'string' || typeof resourceLocator === 'number') {
    return resourceLocator;
  }

  if (resourceLocator && typeof resourceLocator === 'object') {
    const obj = resourceLocator as ResourceLocatorObject;
    return obj.value || obj.id || '';
  }

  throw new Error('Invalid resource locator format');
}

/**
 * Extract numeric ID from resource locator
 */
export function extractNumericId(resourceLocator: unknown): number {
  const id = extractResourceId(resourceLocator);
  const numericId = typeof id === 'string' ? parseInt(id, 10) : id;

  if (isNaN(numericId)) {
    throw new Error(`Invalid numeric ID: ${id}`);
  }

  return numericId;
}

/**
 * Ensure ID is valid
 */
export function ensureId(id: unknown): void {
  if (!id || (typeof id === 'string' && id.trim() === '')) {
    throw new Error('ID is required');
  }
}

/**
 * Validate pagination parameters
 */
export function ensurePagination(page: number, limit: number): void {
  if (page < 1) {
    throw new Error('Page must be greater than 0');
  }

  if (limit < 1 || limit > 1000) {
    throw new Error('Limit must be between 1 and 1000');
  }
}

/**
 * Validate required field
 */
export function validateRequired(value: unknown, fieldName: string): void {
  if (value === undefined || value === null || value === '') {
    throw new Error(`${fieldName} is required`);
  }
}

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate URL format
 */
export function validateUrl(url: string): boolean {
  try {
    // Manual URL validation without using Node.js url module
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    if (!urlPattern.test(url)) {
      return false;
    }
    // Additional check for protocol
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}