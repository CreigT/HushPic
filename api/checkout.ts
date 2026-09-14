import type { IncomingMessage, ServerResponse } from 'node:http';
import { requireUser } from './_lib/auth';
import { adminDb } from './_lib/firebaseAdmin';
import { json, methodNotAllowed, origin } from './_lib/http';
import { stripe } from './_lib/stripe';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'POST') return methodNotAllowed(res, ['POST']);

  try {
    const user = await requireUser(req);
    if (!user.email_verified) return json(res, 403, { error: 'Verify your email before upgrading.' });

    const price = process.env.STRIPE_PRO_PRICE_ID;
    if (!price) return json(res, 500, { error: 'Pro pricing is not configured.' });

    const db = adminDb();
    const userRef = db.collection('users').doc(user.uid);
    const snap = await userRef.get();
    const data = snap.data() || {};
    const client = stripe();

    let customerId = data.stripeCustomerId as string | undefined;
    if (!customerId) {
      const customer = await client.customers.create({
        email: user.email,
        metadata: { firebaseUid: user.uid },
      });
      customerId = customer.id;
      await userRef.set({
        email: user.email || null,
        stripeCustomerId: customerId,
        updatedAt: new Date().toISOString(),
      }, { merge: true });
    }

    const site = origin(req);
    const session = await client.checkout.sessions.create({
      mode: 'subscription',
      customer: customerId,
      line_items: [{ price, quantity: 1 }],
      success_url: `${site}/account?checkout=success`,
      cancel_url: `${site}/pricing?checkout=cancelled`,
      allow_promotion_codes: true,
      client_reference_id: user.uid,
      metadata: { firebaseUid: user.uid },
      subscription_data: { metadata: { firebaseUid: user.uid } },
    });

    return json(res, 200, { url: session.url });
  } catch (error: any) {
    console.error('checkout error', error);
    return json(res, error?.statusCode || 500, { error: error?.message || 'Unable to start checkout.' });
  }
}
