export const ACTIVE_SUBSCRIPTION_STATUSES = new Set(['active', 'trialing']);

export function isProStatus(status?: string | null) {
  return Boolean(status && ACTIVE_SUBSCRIPTION_STATUSES.has(status));
}

export function normalizePlan(status?: string | null): 'free' | 'pro' {
  return isProStatus(status) ? 'pro' : 'free';
}
