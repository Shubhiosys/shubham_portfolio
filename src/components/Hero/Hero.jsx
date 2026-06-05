import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile, useMouseTracker } from '../../hooks/usePortfolio';
import HeroBackground from './HeroBackground';
import HeroLabel from './HeroLabel';
import HeroHeadline from './HeroHeadline';
import HeroDescription from './HeroDescription';
import HeroFeatureCards from './HeroFeatureCards';
import HeroCTA from './HeroCTA';
import HeroImageSection from './HeroImageSection';
import HeroDock from './HeroDock';
import './Hero.css';

export default function Hero() {
  const isMobile = useIsMobile();
  const { normalized: mouseNorm } = useMouseTracker();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 120);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="hero" className="hero">
      <HeroBackground isMobile={isMobile} mouseNorm={mouseNorm} />

      <motion.div
        className={`hero__content${ready ? ' hero__content--visible' : ''}`}
        initial={false}
      >
        <div className="hero__layout">
          <div className="hero__left">
            <HeroLabel />
            <HeroHeadline />
            <HeroDescription />
            <HeroFeatureCards />
            <HeroCTA />
          </div>

          <div className="hero__right">
            <HeroImageSection />
          </div>
        </div>
      </motion.div>

      <HeroDock />

      <div className="hero__scroll" aria-hidden>
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-wheel" />
        </div>
        <span>Scroll</span>
      </div>
    </section>
  );
}
