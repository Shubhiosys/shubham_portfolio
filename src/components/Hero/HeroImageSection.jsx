import { motion } from 'framer-motion';
import { FLOATING_LABELS } from './heroData';
import profileImage from '../../../shubham_pic.png';

export default function HeroImageSection() {
  return (
    <motion.div
      className="hero__visual"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.65, delay: 0.25 }}
    >
      <ul className="hero__floating-labels" aria-label="Availability highlights">
        {FLOATING_LABELS.map((label, i) => (
          <motion.li
            key={label.id}
            className="hero__floating-label glass-card"
            initial={{ opacity: 0, y: 8 }}
            animate={{
              opacity: [1, 0.82, 1],
              y: [0, -8, 0],
            }}
            transition={{
              opacity: { duration: 2.4 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: 0.4 + i * 0.08 },
              y: { duration: 4 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 + i * 0.08 },
            }}
          >
            {label.text}
          </motion.li>
        ))}
      </ul>

      <motion.div
        className="hero__profile-wrapper glass-card"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      >
        <svg className="hero__orbit-svg" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet" aria-hidden>
          <defs>
            <linearGradient id="heroOrbitGrad" x1="0%" x2="100%">
              <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#00ff88" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.45" />
            </linearGradient>
          </defs>
          <g fill="none" stroke="url(#heroOrbitGrad)" strokeWidth="1.5" className="hero__orbit-rings">
            <circle cx="300" cy="300" r="200" strokeOpacity="0.05" />
            <circle cx="300" cy="300" r="165" strokeOpacity="0.07" />
            <circle cx="300" cy="300" r="125" strokeOpacity="0.1" />
          </g>
        </svg>
        <img src={profileImage} alt="Shubham Singh - Backend Engineer" className="hero__profile-img" />
        <div className="hero__profile-glow" aria-hidden />
      </motion.div>
    </motion.div>
  );
}
