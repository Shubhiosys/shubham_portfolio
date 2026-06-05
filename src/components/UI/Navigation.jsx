import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile, useScrollProgress } from '../../hooks/usePortfolio';
import { personalInfo } from '../../constants/data';
import './Navigation.css';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
];

export default function Navigation({ onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const isMobile = useIsMobile();
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 60);
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      ticking = false;
    };
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    if (!isMobile && menuOpen) setMenuOpen(false);
  }, [isMobile, menuOpen]);

  // Detect active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    document.querySelectorAll('section[id]').forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (href) => {
    setMenuOpen(false);
    if (onNavigate && href.startsWith('#')) {
      onNavigate('/');
      setTimeout(() => {
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }, 80);
      return;
    }
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
        <div className="nav__inner">
          {/* Logo */}
          <a href="#hero" className="nav__logo" onClick={() => handleLinkClick('#hero')}>
            <motion.div
              className="nav__logo-mark"
              animate={{
                y: [0, -3, 0],
                boxShadow: [
                  '0 0 0 rgba(0,212,255,0)',
                  '0 0 16px rgba(0,212,255,0.35)',
                  '0 0 0 rgba(0,212,255,0)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              S
            </motion.div>
            <div className="nav__logo-text">
              <span className="nav__logo-name">SHUBHAM</span>
              <span className="nav__logo-ai">.DEV</span>
            </div>
          </a>

          {/* Desktop links */}
          <ul className="nav__links">
            {navLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`nav__link${activeSection === link.href.slice(1) ? ' nav__link--active' : ''}`}
                  onClick={(e) => { e.preventDefault(); handleLinkClick(link.href); }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile menu toggle */}
          <div className="nav__actions">
            <a
              href="#contact"
              className="nav__cta nav__cta--shine"
              onClick={(e) => { e.preventDefault(); handleLinkClick('#contact'); }}
            >
              <span className="nav__cta-dot" />
              Contact Me
            </a>

            {/* Hamburger (mobile) */}
            <button
              className={`nav__hamburger${menuOpen ? ' nav__hamburger--open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              id="hamburger-btn"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="nav__progress" style={{ width: `${scrollProgress * 100}%` }} />
      </nav>

      {/* Mobile menu overlay */}
      <div className={`mobile-menu${menuOpen ? ' mobile-menu--open' : ''}`}>
        <div className="mobile-menu__inner">
          <div className="mobile-menu__header">
            <span className="mobile-menu__greeting">Navigation</span>
          </div>
          <ul className="mobile-menu__links">
            {navLinks.map((link, i) => (
              <li
                key={link.href}
                className="mobile-menu__item"
                style={{ transitionDelay: menuOpen ? `${i * 0.07}s` : '0s' }}
              >
                <a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleLinkClick(link.href); }}
                  className={`mobile-menu__link${activeSection === link.href.slice(1) ? ' mobile-menu__link--active' : ''}`}
                >
                  <span className="mobile-menu__link-num">0{i + 1}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mobile-menu__footer">
            <a href="#contact" className="btn-primary" onClick={(e) => { e.preventDefault(); handleLinkClick('#contact'); }}>
              Get In Touch
            </a>
            <div className="mobile-menu__socials">
              <a href={personalInfo.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu backdrop */}
      {menuOpen && (
        <div className="mobile-menu__backdrop" onClick={() => setMenuOpen(false)} />
      )}
    </>
  );
}
