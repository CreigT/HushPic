import type { IncomingMessage, ServerResponse } from 'node:http';
import { createHash, randomUUID } from 'node:crypto';
import { adminAuth, adminDb } from './_lib/firebaseAdmin';
import { json, methodNotAllowed } from './_lib/http';
import { isProStatus } from './_lib/subscription';

const FREE_LIMIT = 3;
const COOKIE = 'hushpic_device';

function today() {
  return new Date().toISOString().slice(0, 10);
}

function getCookie(req: IncomingMessage, name: string) {
  const raw = req.headers.cookie || '';
  for (const pair of raw.split(';')) {
    const [key, ...rest] = pair.trim().split('=');
    if (key === name) return decodeURIComponent(rest.join('='));
  }
  return null;
}

function setDeviceCookie(res: ServerResponse, value: string) {
  res.setHeader('Set-Cookie', `${COOKIE}=${encodeURIComponent(value)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=31536000`);
}

async function identity(req: IncomingMessage, res: ServerResponse) {
  const authHeader = req.headers.authorization || '';
  if (authHeader.startsWith('Bearer ')) {
    try {
      const decoded = await adminAuth().verifyIdToken(authHeader.slice(7), true);
      const userDoc = await adminDb().collection('users').doc(decoded.uid).get();
      const status = userDoc.data()?.subscriptionStatus as string | undefined;
      return { key: `user_${decoded.uid}`, isPro: isProStatus(status), email: decoded.email || null };
    } catch {
      // Invalid auth falls through to guest device quota instead of trusting client state.
    }
  }

  let device = getCookie(req, COOKIE);
  if (!device) {
    device = randomUUID();
    setDeviceCookie(res, device);
  }
  const digest = createHash('sha256').update(device).digest('hex');
  return { key: `guest_${digest}`, isPro: false, email: null };
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'GET' && req.method !== 'POST') return methodNotAllowed(res, ['GET', 'POST']);

  try {
    const actor = await identity(req, res);
    const date = today();
    const ref = adminDb().collection('dailyUsage').doc(`${actor.key}_${date}`);

    if (actor.isPro) {
      return json(res, 200, { used: 0, total: FREE_LIMIT, remaining: 999999, isPro: true, userEmail: actor.email, date });
    }

    if (req.method === 'POST') {
      const result = await adminDb().runTransaction(async (tx) => {
        const snap = await tx.get(ref);
        const used = Number(snap.data()?.used || 0);
        if (used >= FREE_LIMIT) return { allowed: false, used };
        const next = used + 1;
        tx.set(ref, { used: next, date, updatedAt: new Date().toISOString() }, { merge: true });
        return { allowed: true, used: next };
      });

      if (!result.allowed) {
        return json(res, 429, { error: 'quota_exceeded', used: result.used, total: FREE_LIMIT, remaining: 0, isPro: false, userEmail: actor.email, date });
      }

      return json(res, 200, { used: result.used, total: FREE_LIMIT, remaining: Math.max(0, FREE_LIMIT - result.used), isPro: false, userEmail: actor.email, date });
    }

    const snap = await ref.get();
    const used = Number(snap.data()?.used || 0);
    return json(res, 200, { used, total: FREE_LIMIT, remaining: Math.max(0, FREE_LIMIT - used), isPro: false, userEmail: actor.email, date });
  } catch (error: any) {
    console.error('quota error', error);
    return json(res, 500, { error: 'Unable to verify usage quota.' });
  }
}
