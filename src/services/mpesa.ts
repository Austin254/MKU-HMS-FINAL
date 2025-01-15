import axios from 'axios';
import { mpesaConfig } from '../config/mpesa';
import { PaymentDetails, MpesaResponse } from '../types/payment';
import { toast } from 'react-hot-toast';
import { IS_DEVELOPMENT } from '../config/constants';
import { mockSTKPush } from './mockMpesa';

const MPESA_AUTH_URL = 'https://sandbox.safaricom.co.ke/oauth/v1/generate';
const MPESA_STK_URL = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';

async function getAccessToken(): Promise<string> {
  try {
    const auth = Buffer.from(`${mpesaConfig.consumerKey}:${mpesaConfig.consumerSecret}`).toString('base64');
    const response = await axios.get(`${MPESA_AUTH_URL}?grant_type=client_credentials`, {
      headers: {
        Authorization: `Basic ${auth}`
      }
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Failed to get M-Pesa access token:', error);
    throw new Error('Authentication failed');
  }
}

export async function initiateSTKPush(details: PaymentDetails): Promise<MpesaResponse> {
  try {
    // Use mock service in development
    if (IS_DEVELOPMENT) {
      return await mockSTKPush(details);
    }

    const accessToken = await getAccessToken();
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    const password = Buffer.from(
      `${mpesaConfig.shortcode}${mpesaConfig.passkey}${timestamp}`
    ).toString('base64');

    const response = await axios.post<MpesaResponse>(
      MPESA_STK_URL,
      {
        BusinessShortCode: mpesaConfig.shortcode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: details.amount,
        PartyA: details.phoneNumber,
        PartyB: mpesaConfig.shortcode,
        PhoneNumber: details.phoneNumber,
        CallBackURL: mpesaConfig.callbackUrl,
        AccountReference: details.reference,
        TransactionDesc: 'MKU Hostel Booking Payment'
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    if (response.data.ResponseCode === '0') {
      toast.success('Payment request sent! Check your phone for the STK push.');
      return response.data;
    } else {
      throw new Error(response.data.ResponseDescription);
    }
  } catch (error: any) {
    console.error('M-Pesa API Error:', error);
    
    if (axios.isAxiosError(error)) {
      if (error.response) {
        toast.error(error.response.data.errorMessage || 'Payment request failed');
      } else if (error.request) {
        toast.error('Network error. Please check your connection');
      }
    } else {
      toast.error(error.message || 'Payment processing failed');
    }
    
    throw error;
  }
}