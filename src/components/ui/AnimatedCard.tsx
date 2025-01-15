import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function AnimatedCard({ children, className = '' }: AnimatedCardProps) {
  return (
    <motion.div
      className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}