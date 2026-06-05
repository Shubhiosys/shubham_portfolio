import { Bot, Layers, Workflow } from 'lucide-react';
import { personalInfo } from '../../constants/data';

export const FEATURE_CARDS = [
  {
    icon: Bot,
    title: 'Java Backend Delivery',
    description: 'Scalable backend services built with Java, Spring Boot, and clean APIs.',
  },
  {
    icon: Layers,
    title: 'Secure API Systems',
    description: 'REST APIs with JWT, Spring Security, and role-based access control.',
  },
  {
    icon: Workflow,
    title: 'Microservices Platforms',
    description: 'Production services designed for performance, reliability, and scale.',
  },
];

export const FLOATING_LABELS = [
  { id: 'opportunities', text: 'Open to Opportunities' },
  { id: 'delivery', text: 'Backend Engineering' },
];

export const SOCIAL_LINKS = [
  { href: '#', label: 'GitHub', icon: 'github' },
  { href: personalInfo.linkedin, label: 'LinkedIn', icon: 'linkedin' },
  { href: '#contact', label: 'Email', icon: 'mail', scroll: '#contact' },
  { href: 'https://wa.me/918871383015', label: 'WhatsApp', icon: 'whatsapp' },
  { href: '/Shubham%20Singh.pdf', label: 'Download Resume', icon: 'resume', download: true },
];

export function scrollToSection(selector) {
  const target = document.querySelector(selector);
  if (target) target.scrollIntoView({ behavior: 'smooth' });
  else window.location.href = `/${selector}`;
}
