import { memo } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { 
  Home, Book, GraduationCap, Users, Building
} from 'lucide-react';

const icons = [
  { Icon: Home, color: 'text-blue-500' },
  { Icon: Book, color: 'text-green-500' },
  { Icon: GraduationCap, color: 'text-purple-500' },
  { Icon: Users, color: 'text-yellow-500' },
  { Icon: Building, color: 'text-red-500' }
];

const FloatingIcon = memo(({ Icon, color, index }: { Icon: any, color: string, index: number }) => {
  const randomX = Math.random() * window.innerWidth;
  const randomY = Math.random() * window.innerHeight;

  const floatingAnimation = {
    initial: {
      x: randomX,
      y: randomY,
      opacity: 0,
      scale: 0
    },
    animate: {
      x: [randomX, randomX + 50, randomX - 50, randomX],
      y: [randomY, randomY - 50, randomY + 50, randomY],
      opacity: [0, 0.15, 0.15, 0],
      scale: [0, 1, 1, 0],
      transition: {
        duration: 15 + index * 2,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <motion.div
      className={`absolute ${color} opacity-20`}
      variants={floatingAnimation}
      initial="initial"
      animate="animate"
    >
      <Icon size={20 + index * 2} />
    </motion.div>
  );
});

FloatingIcon.displayName = 'FloatingIcon';

export default memo(function FloatingIcons() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {icons.map(({ Icon, color }, index) => (
        <FloatingIcon
          key={index}
          Icon={Icon}
          color={color}
          index={index}
        />
      ))}
    </div>
  );
});