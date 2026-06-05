export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const floatLoop = (y = 8, duration = 4.5, delay = 0) => ({
  y: [0, -y, 0],
  transition: {
    duration,
    repeat: Infinity,
    ease: 'easeInOut',
    delay,
  },
});

export const blinkLoop = (duration = 1.8) => ({
  opacity: [1, 0.35, 1],
  scale: [1, 1.15, 1],
  transition: {
    duration,
    repeat: Infinity,
    ease: 'easeInOut',
  },
});

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
};

export const viewportOnce = {
  once: true,
  amount: 0.15,
  margin: '0px 0px -40px 0px',
};
