export interface Plan {
  id: 'free' | 'pro';
  name: string;
  price: number;
  period: string;
  description: string;
  badge?: string;
  features: string[];
  maxFileSizeMB: number;
  dailyQuota: number | 'Unlimited';
  batchProcessing: boolean;
  ctaText: string;
  popular?: boolean;
}

export const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'Essential image utilities with local browser image processing.',
    features: [
      '3 free conversions per day',
      '25MB max file size',
      'Image bytes processed locally',
      'No image upload for processing',
      'Core conversion & compression',
      'No watermark'
    ],
    maxFileSizeMB: 25,
    dailyQuota: 3,
    batchProcessing: false,
    ctaText: 'Current Plan',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 9,
    period: 'per month',
    badge: 'Unlimited Power',
    popular: true,
    description: 'Unlimited daily usage, batch operations, and Pro image tools.',
    features: [
      'Unlimited conversions every day',
      'Up to 500MB max file size*',
      'Batch processing with ZIP download',
      'Background removal & 2x image upscaling',
      'High-quality local rendering',
      'Image bytes stay local during processing',
      'Stripe Customer Portal billing controls'
    ],
    maxFileSizeMB: 500,
    dailyQuota: 'Unlimited',
    batchProcessing: true,
    ctaText: 'Get Unlimited Pro — $9/mo',
  }
];
