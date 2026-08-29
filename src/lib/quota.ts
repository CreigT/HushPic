import { BRAND } from '../../config/brand';

const QUOTA_KEY = 'hushpic_quota';
const DATE_KEY = 'hushpic_quota_date';
const USER_PLAN_KEY = 'hushpic_user_plan';
const USER_EMAIL_KEY = 'hushpic_user_email';

export interface QuotaStatus {
  used: number;
  total: number;
  remaining: number;
  isPro: boolean;
  userEmail: string | null;
  date: string;
}

export function getTodayString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function getQuotaStatus(): QuotaStatus {
  if (typeof window === 'undefined') {
    return {
      used: 0,
      total: BRAND.freeQuotaLimit,
      remaining: BRAND.freeQuotaLimit,
      isPro: false,
      userEmail: null,
      date: getTodayString(),
    };
  }

  const today = getTodayString();
  const savedDate = localStorage.getItem(DATE_KEY);
  const currentPlan = localStorage.getItem(USER_PLAN_KEY) || 'free';
  const userEmail = localStorage.getItem(USER_EMAIL_KEY);
  const isPro = currentPlan === 'pro';

  let used = 0;
  if (savedDate === today) {
    used = parseInt(localStorage.getItem(QUOTA_KEY) || '0', 10);
    if (isNaN(used)) used = 0;
  } else {
    // Reset for new day
    localStorage.setItem(DATE_KEY, today);
    localStorage.setItem(QUOTA_KEY, '0');
    used = 0;
  }

  const total = BRAND.freeQuotaLimit;
  const remaining = isPro ? 999999 : Math.max(0, total - used);

  return {
    used,
    total,
    remaining,
    isPro,
    userEmail,
    date: today,
  };
}

export function consumeQuota(): { success: boolean; reason?: 'quota_exceeded' } {
  const status = getQuotaStatus();
  if (status.isPro) {
    return { success: true };
  }

  if (status.used >= status.total) {
    return { success: false, reason: 'quota_exceeded' };
  }

  const today = getTodayString();
  const nextUsed = status.used + 1;
  localStorage.setItem(DATE_KEY, today);
  localStorage.setItem(QUOTA_KEY, nextUsed.toString());
  
  // Dispatch custom storage event for sync across header/components
  window.dispatchEvent(new Event('hushpic_quota_updated'));
  
  return { success: true };
}

export function setPlan(plan: 'free' | 'pro', email?: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USER_PLAN_KEY, plan);
  if (email) {
    localStorage.setItem(USER_EMAIL_KEY, email);
  } else if (plan === 'free') {
    localStorage.removeItem(USER_EMAIL_KEY);
  }
  window.dispatchEvent(new Event('hushpic_quota_updated'));
}

export function resetDailyQuota() {
  if (typeof window === 'undefined') return;
  const today = getTodayString();
  localStorage.setItem(DATE_KEY, today);
  localStorage.setItem(QUOTA_KEY, '0');
  window.dispatchEvent(new Event('hushpic_quota_updated'));
}
