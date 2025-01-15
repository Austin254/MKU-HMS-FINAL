import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Loader, AlertCircle } from 'lucide-react';
import { validateKenyanPhoneNumber } from '../utils/phoneValidation';
import { initiateSTKPush } from '../services/mpesa';
import { PaymentDetails } from '../types/payment';
import { toast } from 'react-hot-toast';
import AnimatedButton from './ui/AnimatedButton';
import { IS_DEVELOPMENT } from '../config/constants';

interface PaymentFormProps {
  amount: number;
  onSubmit: (details: PaymentDetails) => void;
  loading: boolean;
  reference: string;
}

export default function PaymentForm({ amount, onSubmit, loading, reference }: PaymentFormProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { isValid, formatted } = validateKenyanPhoneNumber(phoneNumber);

    if (!isValid) {
      setError('Please enter a valid Kenyan phone number');
      return;
    }

    setError('');
    setProcessing(true);

    try {
      const paymentDetails: PaymentDetails = {
        phoneNumber: formatted,
        amount,
        reference
      };

      await initiateSTKPush(paymentDetails);
      onSubmit(paymentDetails);
      
      if (IS_DEVELOPMENT) {
        toast.success('Development mode: Payment simulation successful');
      }
    } catch (error) {
      // Error handling is done in the mpesa service
    } finally {
      setProcessing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-t pt-6 dark:border-gray-700"
    >
      <h2 className="text-xl font-semibold mb-4 dark:text-white">Payment Details</h2>
      
      {IS_DEVELOPMENT && (
        <div className="mb-4 p-2 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 text-sm rounded">
          Development mode: Payments are simulated
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            M-Pesa Phone Number
          </label>
          <div className="relative">
            <input
              type="tel"
              placeholder="e.g., 0712345678"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                setError('');
              }}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
                error ? 'border-red-500' : ''
              }`}
              required
            />
            {error && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 pr-3">
                <AlertCircle className="h-5 w-5 text-red-500" />
              </div>
            )}
          </div>
          {error && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="font-medium dark:text-gray-300">Total Amount:</span>
            <span className="text-xl font-bold text-blue-900 dark:text-blue-400">
              KSH {amount.toLocaleString()}
            </span>
          </div>
        </div>

        <AnimatedButton
          type="submit"
          disabled={loading || processing}
          className="w-full"
          icon={processing ? <Loader className="animate-spin" /> : <CreditCard />}
        >
          {processing ? 'Processing...' : 'Pay with M-Pesa'}
        </AnimatedButton>
      </form>
    </motion.div>
  );
}