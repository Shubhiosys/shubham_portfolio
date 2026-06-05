import { motion } from 'framer-motion';
import { Briefcase, FolderKanban, MessageCircle } from 'lucide-react';
import { scrollToSection } from './heroData';

export default function HeroCTA() {
  return (
    <motion.div
      className="hero__ctas"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.44 }}
    >
      <a
        href="#contact"
        className="hero__btn hero__btn--primary"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection('#contact');
        }}
      >
        <Briefcase size={16} strokeWidth={2} aria-hidden />
        Hire Me
      </a>
      <a
        href="https://wa.me/918871383015"
        target="_blank"
        rel="noreferrer"
        className="hero__btn hero__btn--secondary"
      >
        <MessageCircle size={16} strokeWidth={2} aria-hidden />
        WhatsApp
      </a>
      <a
        href="#projects"
        className="hero__btn hero__btn--secondary"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection('#projects');
        }}
      >
        <FolderKanban size={16} strokeWidth={2} aria-hidden />
        Explore Projects
      </a>
    </motion.div>
  );
}
