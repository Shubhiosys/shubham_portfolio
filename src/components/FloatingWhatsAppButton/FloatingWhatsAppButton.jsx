import { motion } from 'framer-motion';
import './FloatingWhatsAppButton.css';

export default function FloatingWhatsAppButton() {
  return (
    <motion.a
      className="floating-whatsapp"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      href="https://wa.me/918871383015"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <motion.span
        className="floating-whatsapp__icon"
        animate={{ scale: [1, 1.08, 1], opacity: [1, 0.75, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        Chat
      </motion.span>
      <span>Chat on WhatsApp</span>
    </motion.a>
  );
}
