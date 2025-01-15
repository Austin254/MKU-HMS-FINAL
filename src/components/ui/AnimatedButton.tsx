import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export default function AnimatedButton({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  ...props
}: AnimatedButtonProps) {
  const baseStyles = "rounded-lg font-semibold transition-all duration-200 flex items-center justify-center";
  
  const variants = {
    primary: "bg-blue-900 text-white hover:bg-blue-800",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    outline: "border-2 border-blue-900 text-blue-900 hover:bg-blue-50"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg"
  };

  return (
    <motion.button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </motion.button>
  );
}