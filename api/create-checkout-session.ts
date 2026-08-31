import Stripe from 'stripe';
import { getAuth } from 'firebase-admin/auth';
import { cert, getApps, initializeApp } from 'firebase-admin/app';

function adminAuth() {
  if (!getApps().length) initializeApp({ credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }) });
  return getAuth();
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const authHeader = req.headers.authorization || '';
    const idToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
    if (!idToken) return res.status(401).json({ error: 'Sign in before upgrading.' });
    const user = await adminAuth().verifyIdToken(idToken);
    if (!user.email) return res.status(400).json({ error: 'Account email required.' });

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const origin = process.env.APP_URL || `https://${req.headers.host}`;
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email: user.email,
      client_reference_id: user.uid,
      line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
      success_url: `${origin}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing?checkout=cancelled`,
      subscription_data: { metadata: { firebaseUid: user.uid } },
      metadata: { firebaseUid: user.uid },
      allow_promotion_codes: true,
    });
    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('checkout_error', error);
    return res.status(500).json({ error: 'Unable to start checkout.' });
  }
}
