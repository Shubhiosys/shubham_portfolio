import { motion } from 'framer-motion';
import { blinkLoop, fadeUp, floatLoop, viewportOnce } from './motionVariants';

export function BlinkDot({ className = '', size = 8 }) {
  return (
    <motion.span
      className={`blink-dot ${className}`.trim()}
      style={{ width: size, height: size }}
      aria-hidden
      animate={blinkLoop(1.6)}
    />
  );
}

export function SectionLabel({ children, className = '' }) {
  return (
    <motion.div
      className={`section-label ${className}`.trim()}
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.45 }}
    >
      <motion.span
        className="section-label__text"
        animate={{ opacity: [1, 0.72, 1] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        {children}
      </motion.span>
    </motion.div>
  );
}

export function MotionFloat({
  children,
  className = '',
  delay = 0,
  duration = 4.5,
  y = 8,
  as = 'div',
}) {
  const Component = motion[as] || motion.div;

  const loop = floatLoop(y, duration, delay);

  return (
    <Component
      className={className}
      animate={{ y: loop.y }}
      transition={loop.transition}
    >
      {children}
    </Component>
  );
}

export function MotionReveal({
  children,
  className = '',
  delay = 0,
  as = 'div',
}) {
  const Component = motion[as] || motion.div;

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
      custom={delay}
    >
      {children}
    </Component>
  );
}

export function MotionStagger({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.07 } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function MotionItem({ children, className = '' }) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}
