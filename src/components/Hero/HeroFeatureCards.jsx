import { motion } from 'framer-motion';
import { FEATURE_CARDS } from './heroData';
import { floatLoop } from '../UI/motionVariants';

export default function HeroFeatureCards() {
  return (
    <motion.ul
      className="hero__feature-cards"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.36 }}
      aria-label="Core capabilities"
    >
      {FEATURE_CARDS.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.li
            key={card.title}
            className="hero__feature-card"
            animate={floatLoop(5, 4.8 + index * 0.4, index * 0.2)}
            whileHover={{ y: -8, transition: { type: 'spring', stiffness: 380, damping: 28 } }}
          >
            <span className="hero__feature-card-icon" aria-hidden>
              <Icon size={16} strokeWidth={1.75} />
            </span>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
