import type { IncomingMessage, ServerResponse } from 'node:http';
import type Stripe from 'stripe';
import { adminDb } from './_lib/firebaseAdmin';
import { json, methodNotAllowed, readRawBody } from './_lib/http';
import { stripe } from './_lib/stripe';

export const config = { api: { bodyParser: false } };

async function upsertSubscription(subscription: Stripe.Subscription) {
  const uid = subscription.metadata?.firebaseUid;
  if (!uid) return;

  const customerId = typeof subscription.customer === 'string' ? subscription.customer : subscription.customer.id;
  const periodEnds = subscription.items.data
    .map((item) => item.current_period_end)
    .filter((value): value is number => typeof value === 'number');
  const currentPeriodEnd = periodEnds.length ? Math.max(...periodEnds) : null;

  await adminDb().collection('users').doc(uid).set({
    stripeCustomerId: customerId,
    stripeSubscriptionId: subscription.id,
    subscriptionStatus: subscription.status,
    currentPeriodEnd: currentPeriodEnd ? new Date(currentPeriodEnd * 1000).toISOString() : null,
    cancelAtPeriodEnd: Boolean(subscription.cancel_at_period_end),
    updatedAt: new Date().toISOString(),
  }, { merge: true });
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'POST') return methodNotAllowed(res, ['POST']);

  const signature = req.headers['stripe-signature'];
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || Array.isArray(signature) || !secret) {
    return json(res, 400, { error: 'Webhook signature configuration missing.' });
  }

  let event: Stripe.Event;
  try {
    const body = await readRawBody(req);
    event = stripe().webhooks.constructEvent(body, signature, secret);
  } catch (error: any) {
    console.error('webhook signature error', error);
    return json(res, 400, { error: 'Invalid webhook signature.' });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const uid = session.metadata?.firebaseUid || session.client_reference_id || undefined;
        if (uid) {
          await adminDb().collection('users').doc(uid).set({
            stripeCustomerId: typeof session.customer === 'string' ? session.customer : session.customer?.id || null,
            stripeSubscriptionId: typeof session.subscription === 'string' ? session.subscription : session.subscription?.id || null,
            updatedAt: new Date().toISOString(),
          }, { merge: true });
        }
        break;
      }
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        await upsertSubscription(event.data.object as Stripe.Subscription);
        break;
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = typeof invoice.customer === 'string' ? invoice.customer : invoice.customer?.id;
        if (customerId) {
          const matches = await adminDb().collection('users').where('stripeCustomerId', '==', customerId).limit(1).get();
          if (!matches.empty) {
            await matches.docs[0].ref.set({ lastBillingIssueAt: new Date().toISOString() }, { merge: true });
          }
        }
        break;
      }
      default:
        break;
    }

    return json(res, 200, { received: true });
  } catch (error) {
    console.error('webhook processing error', error);
    return json(res, 500, { error: 'Webhook processing failed.' });
  }
}
