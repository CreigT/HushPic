import type { IncomingMessage, ServerResponse } from 'node:http';
import { requireUser } from './_lib/auth';
import { adminDb } from './_lib/firebaseAdmin';
import { json, methodNotAllowed } from './_lib/http';
import { normalizePlan } from './_lib/subscription';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'GET') return methodNotAllowed(res, ['GET']);

  try {
    const user = await requireUser(req);
    const snap = await adminDb().collection('users').doc(user.uid).get();
    const data = snap.data() || {};
    const plan = normalizePlan(data.subscriptionStatus);

    return json(res, 200, {
      plan,
      isPro: plan === 'pro',
      email: user.email || null,
      emailVerified: Boolean(user.email_verified),
      subscriptionStatus: data.subscriptionStatus || null,
      currentPeriodEnd: data.currentPeriodEnd || null,
    });
  } catch (error: any) {
    return json(res, error?.statusCode || 500, { error: error?.message || 'Unable to load entitlement.' });
  }
}
