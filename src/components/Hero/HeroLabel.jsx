import { motion } from 'framer-motion';
import { BlinkDot } from '../UI/MotionPrimitives';

export default function HeroLabel() {
  return (
    <motion.div
      className="hero__label"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <BlinkDot className="hero__label-dot" size={6} />
      <motion.span
        animate={{ opacity: [1, 0.7, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        Backend Engineer
      </motion.span>
    </motion.div>
  );
}
