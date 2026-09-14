# HushPic Production Runbook

Sponsored by CREIGNIFICENT LLC.

## Production architecture

- React + Vite frontend on Vercel.
- Image bytes are processed locally in the browser.
- Firebase Authentication handles real user accounts.
- Firestore stores only account/subscription/quota metadata; client Firestore access is denied by rules.
- Vercel serverless functions verify Firebase ID tokens, enforce free quota, create Stripe Checkout/Portal sessions, and process Stripe webhooks.
- Stripe Billing is the source of truth for Pro subscription status.

## 1. Firebase

Create a Firebase project and web app.

Enable:
- Authentication -> Email/Password
- Firestore Database

Deploy `firestore.rules`. The rules intentionally deny all direct client database access because the Vercel backend uses the Admin SDK.

Add your production domain and Vercel preview domains to Firebase Authentication authorized domains as appropriate.

Create a service account for the backend and store its project ID, client email, and private key only in Vercel server-side environment variables.

## 2. Stripe

Create one recurring monthly product/price for HushPic Pro at $9/month.

Set `STRIPE_PRO_PRICE_ID` to that recurring Price ID.

Configure a webhook endpoint:

`https://hushpic.com/api/stripe-webhook`

Subscribe to at least:
- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_failed`

Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`.

Enable Stripe Customer Portal so customers can manage payment methods and cancel subscriptions.

Recommended Stripe Billing settings:
- Smart Retries enabled
- failed-payment emails enabled
- cancel-at-period-end available through Customer Portal
- tax threshold monitoring enabled until registrations/collection requirements are confirmed

## 3. Vercel environment variables

Use `.env.example` as the authoritative list.

Production variables:
- `APP_URL=https://hushpic.com`
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_APP_ID`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRO_PRICE_ID`

Use test-mode Stripe values for Preview deployments and live-mode values only for Production.

## 4. Pre-deploy verification

Run:

```bash
npm install
npm run lint
npm test
npm run build
```

The GitHub Actions workflow runs these checks on pull requests and on the production-readiness/main branches.

## 5. Production smoke test

Verify all of the following before merging/deploying live:

1. Free user can process exactly three allowed conversions per day from one device.
2. Fourth free conversion is rejected by `/api/quota` before local processing starts.
3. Creating an account uses Firebase Authentication; fake localStorage account state no longer grants access.
4. Email verification is required before paid checkout.
5. Pro Checkout opens a Stripe-hosted Checkout Session.
6. Successful checkout causes Stripe webhook delivery and Firestore subscription state update.
7. Account page reports Pro only after server-verified subscription status is active/trialing.
8. Stripe Customer Portal opens for paid users.
9. Canceling or failed subscription state removes Pro entitlement after webhook synchronization.
10. Images never appear in Vercel requests, Firestore records, or Stripe metadata.
11. `/api/*` routes resolve as serverless functions rather than the SPA fallback.
12. Direct Firestore reads/writes from the browser are denied.
13. Privacy and Terms pages are reachable and reflect actual architecture.
14. Sponsor line `Sponsored by CREIGNIFICENT LLC.` is visible.

## Known privacy-preserving tradeoff

HushPic intentionally ships the image-processing engine to the browser. Server-side entitlement checks stop normal UI/account/quota bypasses, but no client-only Pro feature can have perfect DRM because determined users can inspect or alter code delivered to their own browser. Moving Pro processing to a server would strengthen access enforcement but would violate HushPic's central local-processing privacy model. Keep the privacy model and treat subscription controls as commercial access controls, not cryptographic DRM.
