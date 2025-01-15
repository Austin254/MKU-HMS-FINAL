import { PaymentDetails, MpesaResponse } from '../types/payment';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function mockSTKPush(details: PaymentDetails): Promise<MpesaResponse> {
  await delay(2000); // Simulate API call delay

  // Validate phone number format
  if (!details.phoneNumber.startsWith('254') || details.phoneNumber.length !== 12) {
    throw new Error('Invalid phone number format');
  }

  // Simulate successful response
  return {
    MerchantRequestID: Math.random().toString(36).substring(2, 15),
    CheckoutRequestID: Math.random().toString(36).substring(2, 15),
    ResponseCode: "0",
    ResponseDescription: "Success. Request accepted for processing",
    CustomerMessage: "Success. Request accepted for processing"
  };
}