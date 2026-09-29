import type { Credentials } from '../types';
import { DEFAULT_API_URL } from '../api/greenApi';

const KEY = 'green-api-credentials';

export function loadCredentials(): Credentials | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Credentials>;
    if (!parsed.idInstance || !parsed.apiTokenInstance) return null;
    return {
      apiUrl: parsed.apiUrl || DEFAULT_API_URL,
      idInstance: parsed.idInstance,
      apiTokenInstance: parsed.apiTokenInstance,
    };
  } catch {
    return null;
  }
}

export function saveCredentials(creds: Credentials): void {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(creds));
  } catch {}
}

export function clearCredentials(): void {
  try {
    sessionStorage.removeItem(KEY);
  } catch {}
}
