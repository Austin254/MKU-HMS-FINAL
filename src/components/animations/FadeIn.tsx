import React from 'react';
import { motion } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export default function FadeIn({ children, delay = 0, direction = 'up' }: FadeInProps) {
  const directionOffset = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 }
  };

  const animations = {
    initial: {
      opacity: 0,
      ...directionOffset[direction]
    },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
    >
      {children}
    </motion.div>
  );
}