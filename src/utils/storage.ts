import type { Credentials } from '../types';

const KEY = 'green-api-credentials';

export function loadCredentials(): Credentials | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Credentials) : null;
  } catch {
    return null;
  }
}

export function saveCredentials(creds: Credentials): void {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(creds));
  } catch {
  }
}

export function clearCredentials(): void {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
  }
}
