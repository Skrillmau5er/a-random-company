import Cookies from 'js-cookie';
import { faker } from '@faker-js/faker';

const VISITOR_COOKIE_NAME = 'pendo_visitor_id';
const COOKIE_EXPIRY_DAYS = 365;

interface VisitorData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
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
    return null;
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
  
  // Initialize Pendo with the generated data
  window.pendo.initialize({
    visitor: visitorData,
  });
  
  console.log('New Pendo visitor initialized:', visitorData);
  
  return visitorData;
}

/**
 * Gets the current visitor ID from the cookie
 */
export function getVisitorId(): string | undefined {
  return Cookies.get(VISITOR_COOKIE_NAME);
}

/**
 * Clears the visitor cookie (useful for testing)
 */
export function clearVisitorId(): void {
  Cookies.remove(VISITOR_COOKIE_NAME);
}
