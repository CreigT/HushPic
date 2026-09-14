import type { IncomingMessage, ServerResponse } from 'node:http';
import { requireUser } from './_lib/auth';
import { adminDb } from './_lib/firebaseAdmin';
import { json, methodNotAllowed, origin } from './_lib/http';
import { stripe } from './_lib/stripe';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'POST') return methodNotAllowed(res, ['POST']);

  try {
    const user = await requireUser(req);
    const snap = await adminDb().collection('users').doc(user.uid).get();
    const customerId = snap.data()?.stripeCustomerId as string | undefined;
    if (!customerId) return json(res, 404, { error: 'No Stripe customer is linked to this account.' });

    const session = await stripe().billingPortal.sessions.create({
      customer: customerId,
      return_url: `${origin(req)}/account`,
    });

    return json(res, 200, { url: session.url });
  } catch (error: any) {
    console.error('portal error', error);
    return json(res, error?.statusCode || 500, { error: error?.message || 'Unable to open billing portal.' });
  }
}
