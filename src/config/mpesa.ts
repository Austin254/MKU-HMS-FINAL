import { MpesaConfig } from '../types/payment';

export const mpesaConfig: MpesaConfig = {
  consumerKey: import.meta.env.VITE_MPESA_CONSUMER_KEY || 'your_consumer_key',
  consumerSecret: import.meta.env.VITE_MPESA_CONSUMER_SECRET || 'your_consumer_secret',
  passkey: import.meta.env.VITE_MPESA_PASSKEY || 'your_passkey',
  shortcode: import.meta.env.VITE_MPESA_SHORTCODE || '174379',
  callbackUrl: import.meta.env.VITE_MPESA_CALLBACK_URL || 'https://your-callback-url.com/mpesa-callback'
};