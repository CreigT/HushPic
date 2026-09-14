import { describe, expect, it } from 'vitest';
import { isProStatus, normalizePlan } from './subscription';

describe('subscription entitlement mapping', () => {
  it('treats active and trialing subscriptions as Pro', () => {
    expect(isProStatus('active')).toBe(true);
    expect(isProStatus('trialing')).toBe(true);
    expect(normalizePlan('active')).toBe('pro');
  });

  it('treats incomplete, past_due, canceled and missing status as Free', () => {
    for (const status of ['incomplete', 'past_due', 'unpaid', 'canceled', null, undefined]) {
      expect(isProStatus(status)).toBe(false);
      expect(normalizePlan(status)).toBe('free');
    }
  });
});
