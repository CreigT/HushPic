import { apiFetch } from './api';

export interface QuotaStatus {
  used: number;
  total: number;
  remaining: number;
  isPro: boolean;
  userEmail: string | null;
  date: string;
}

export const EMPTY_QUOTA: QuotaStatus = {
  used: 0,
  total: 3,
  remaining: 3,
  isPro: false,
  userEmail: null,
  date: new Date().toISOString().slice(0, 10),
};

export async function getQuotaStatus(): Promise<QuotaStatus> {
  return apiFetch<QuotaStatus>('/api/quota');
}

export async function consumeQuota(): Promise<QuotaStatus> {
  return apiFetch<QuotaStatus>('/api/quota', { method: 'POST' });
}

export async function getEntitlement() {
  return apiFetch<{
    plan: 'free' | 'pro';
    isPro: boolean;
    email: string | null;
    emailVerified: boolean;
    subscriptionStatus: string | null;
    currentPeriodEnd: string | null;
  }>('/api/entitlement');
}
