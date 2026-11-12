// Browser-side admin session helpers.
//
// Logging in at /admin stores two things in sessionStorage (cleared when the
// tab closes): the "logged in" flag the edit UI has always used, and the admin
// key the API routes verify server-side (see src/lib/adminAuth.ts). Every
// admin API call goes through adminFetch, which sends the key in a request
// header. The key is never placed in a URL.

export const ADMIN_STORAGE_KEY = "dig-admin-auth";
const ADMIN_KEY_STORAGE = "dig-admin-key";
const ADMIN_KEY_HEADER = "x-admin-key";

/** Fired on window when the session is cleared (logout, or the server said 401). */
export const ADMIN_LOGOUT_EVENT = "dig-admin-logout";

export function getAdminKey(): string {
  try {
    return sessionStorage.getItem(ADMIN_KEY_STORAGE) || "";
  } catch {
    return "";
  }
}

/**
 * True when this tab has a usable admin session. A flag without a key (a tab
 * that logged in before keys were stored) does not count: its writes would be
 * rejected, so the user is asked to log in again instead.
 */
export function isAdminSession(): boolean {
  try {
    return sessionStorage.getItem(ADMIN_STORAGE_KEY) === "true" && !!getAdminKey();
  } catch {
    return false;
  }
}

export function setAdminSession(key: string): void {
  sessionStorage.setItem(ADMIN_KEY_STORAGE, key);
  sessionStorage.setItem(ADMIN_STORAGE_KEY, "true");
}

export function clearAdminSession(): void {
  try {
    sessionStorage.removeItem(ADMIN_KEY_STORAGE);
    sessionStorage.removeItem(ADMIN_STORAGE_KEY);
  } catch {}
  window.dispatchEvent(new Event(ADMIN_LOGOUT_EVENT));
}

/**
 * fetch() for same-origin admin API routes: adds the admin key header. A 401
 * means the stored key is wrong or stale, so the session is cleared and the
 * login form comes back.
 */
export async function adminFetch(input: string, init: RequestInit = {}): Promise<Response> {
  const headers = new Headers(init.headers);
  headers.set(ADMIN_KEY_HEADER, getAdminKey());
  const res = await fetch(input, { ...init, headers });
  if (res.status === 401) clearAdminSession();
  return res;
}
