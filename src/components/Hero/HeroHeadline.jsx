import { motion } from 'framer-motion';
import { personalInfo } from '../../constants/data';

export default function HeroHeadline() {
  const [firstName, ...rest] = personalInfo.name.split(' ');

  return (
    <motion.h1
      className="hero__headline font-extrabold text-[#f0f4ff]"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.18 }}
    >
      <span className="hero__headline-line">
        {firstName.toUpperCase()} <span className="hero-gradient-word">{rest.join(' ').toUpperCase()}</span>
      </span>
      <span className="hero__headline-line hero__headline-line--secondary">
         <span className="hero-gradient-word"></span>
      </span>
    </motion.h1>
  );
}
