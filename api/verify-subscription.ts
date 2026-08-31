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
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
    if (!token) return res.status(401).json({ pro: false });
    const user = await adminAuth().verifyIdToken(token);
    if (!user.email) return res.status(200).json({ pro: false });

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const customers = await stripe.customers.list({ email: user.email, limit: 10 });
    for (const customer of customers.data) {
      const subscriptions = await stripe.subscriptions.list({ customer: customer.id, status: 'all', limit: 10 });
      const active = subscriptions.data.some((s) => s.status === 'active' || s.status === 'trialing');
      if (active) return res.status(200).json({ pro: true, email: user.email });
    }
    return res.status(200).json({ pro: false, email: user.email });
  } catch (error) {
    console.error('subscription_verify_error', error);
    return res.status(401).json({ pro: false });
  }
}
