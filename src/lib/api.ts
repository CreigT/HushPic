import { auth } from './firebase';

async function authHeaders() {
  const user = auth.currentUser;
  if (!user) return {};
  const token = await user.getIdToken();
  return { Authorization: `Bearer ${token}` };
}

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers || {});
  const authHeader = await authHeaders();
  Object.entries(authHeader).forEach(([key, value]) => headers.set(key, value));

  const response = await fetch(path, {
    ...init,
    headers,
    credentials: 'same-origin',
  });

  let body: any = null;
  try {
    body = await response.json();
  } catch {
    body = null;
  }

  if (!response.ok) {
    const error = new Error(body?.error || `Request failed (${response.status})`) as Error & { status?: number; payload?: any };
    error.status = response.status;
    error.payload = body;
    throw error;
  }

  return body as T;
}
