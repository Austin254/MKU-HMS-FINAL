import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Send, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function SupportPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [ticket, setTicket] = useState({
    subject: '',
    description: '',
    priority: 'medium'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the ticket to an API
    toast.success('Support ticket created successfully');
    navigate('/dashboard');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back</span>
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center space-x-3 mb-6">
          <HelpCircle className="h-8 w-8 text-blue-900 dark:text-blue-400" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Support Center</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Subject
            </label>
            <input
              type="text"
              value={ticket.subject}
              onChange={(e) => setTicket({ ...ticket, subject: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Priority
            </label>
            <select
              value={ticket.priority}
              onChange={(e) => setTicket({ ...ticket, priority: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              value={ticket.description}
              onChange={(e) => setTicket({ ...ticket, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-900 dark:bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-800 dark:hover:bg-blue-700 transition flex items-center justify-center space-x-2"
          >
            <Send className="h-5 w-5" />
            <span>Submit Ticket</span>
          </button>
        </form>
      </motion.div>
    </div>
  );
}