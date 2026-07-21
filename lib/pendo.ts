import Cookies from 'js-cookie';
import { faker } from '@faker-js/faker';

const VISITOR_COOKIE_NAME = 'pendo_visitor_id';
const ACCOUNT_COOKIE_NAME = 'pendo_account_id';
const COOKIE_EXPIRY_DAYS = 365;

interface VisitorData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AccountData {
  id: string;
  name: string;
  planLevel: string;
  industry: string;
}

// Fixed set of test accounts so account-level data in Pendo stays stable across visits.
const ACCOUNTS: AccountData[] = [
  { id: 'account-1', name: 'Acme Corp', planLevel: 'enterprise', industry: 'Technology' },
  { id: 'account-2', name: 'Globex Inc', planLevel: 'pro', industry: 'Retail' },
];

// Assigns a random account on a visitor's first visit, then reuses it on subsequent visits.
function getOrAssignAccount(): AccountData {
  const accountId = Cookies.get(ACCOUNT_COOKIE_NAME);
  const existing = ACCOUNTS.find((account) => account.id === accountId);
  if (existing) {
    return existing;
  }

  const assigned = ACCOUNTS[Math.floor(Math.random() * ACCOUNTS.length)];
  Cookies.set(ACCOUNT_COOKIE_NAME, assigned.id, { expires: COOKIE_EXPIRY_DAYS });
  return assigned;
}

/**
 * Initializes Pendo for a visitor. If the visitor is new (no cookie), generates
 * a UUID and fake user data. If the visitor exists, skips initialization.
 *
 * @returns The visitor data if initialization happened, null if visitor already exists
 */
export function initializePendo(): VisitorData | null {
  if (typeof window === 'undefined' || !window.pendo) {
    return null;
  }

  // Check if visitor already has a UUID cookie
  let visitorId = Cookies.get(VISITOR_COOKIE_NAME);

  // If cookie exists, visitor is not new - skip initialization
  if (visitorId) {
    console.log('Existing Pendo visitor detected:', visitorId);
  } else {
      visitorId = crypto.randomUUID();
  }

  // Store the UUID in a cookie
  Cookies.set(VISITOR_COOKIE_NAME, visitorId, { expires: COOKIE_EXPIRY_DAYS });

  // Generate random fake user data
  const visitorData: VisitorData = {
    id: visitorId,
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  };

  const accountData = getOrAssignAccount();

  // Initialize Pendo with the generated data
  window.pendo.initialize({
    visitor: visitorData,
    account: accountData,
  });

  console.log('New Pendo visitor initialized:', visitorData, 'Account:', accountData);

  return visitorData;
}

export function trackEvent(eventName: string, metadata?: Record<string, unknown>): void {
  if (typeof window === 'undefined' || !window.pendo) return;
  window.pendo.track(eventName, metadata);
}

/**
 * Gets the current visitor ID from the cookie
 */
export function getVisitorId(): string | undefined {
  return Cookies.get(VISITOR_COOKIE_NAME);
}

/**
 * Clears the visitor and account cookies (useful for testing)
 */
export function clearVisitorId(): void {
  Cookies.remove(VISITOR_COOKIE_NAME);
  Cookies.remove(ACCOUNT_COOKIE_NAME);
}
