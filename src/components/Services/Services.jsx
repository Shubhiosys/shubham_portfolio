import { useState, useRef } from 'react';
import { serviceCategories } from '../../constants/data';
import { useReveal } from '../../hooks/usePortfolio';
import { MotionFloat, SectionLabel } from '../UI/MotionPrimitives';
import './Services.css';

function ServiceCard({ service, index }) {
  const { ref, isVisible } = useReveal(0.1);

  return (
    <MotionFloat delay={(index % 4) * 0.2} y={7} duration={4.5 + (index % 3) * 0.5}>
    <div
      ref={ref}
      className={`service-card glass-card${isVisible ? ' service-card--visible' : ''}`}
      style={{ transitionDelay: `${(index % 4) * 0.1}s` }}
    >
      <div className="service-card__icon">{service.icon}</div>
      <h3 className="service-card__title">{service.title}</h3>
      <p className="service-card__desc">{service.desc}</p>
      <div className="service-card__glow" />
    </div>
    </MotionFloat>
  );
}

export default function Services() {
  const [activeCategory, setActiveCategory] = useState(0);
  const { ref: headRef, isVisible: headVisible } = useReveal(0.2);
  const tabsRef = useRef(null);

  const category = serviceCategories[activeCategory];

  return (
    <section id="services" className="section services">
      <div className="container">

        {/* Header */}
        <div
          ref={headRef}
          className={`reveal services__header${headVisible ? ' visible' : ''}`}
        >
          <SectionLabel>What I Build</SectionLabel>
          <h2 className="section-title">
            Java Backend <span className="gradient-text">Solutions Studio</span>
          </h2>
          <p className="services__subtitle">
            From Spring Boot services to secure REST APIs, microservices, database optimization,
            and cloud-ready backend systems.
          </p>
        </div>

        {/* Category tabs */}
        <div className="services__tabs scroll-x" ref={tabsRef}>
          {serviceCategories.map((cat, i) => (
            <button
              key={cat.category}
              className={`services__tab${activeCategory === i ? ' services__tab--active' : ''}`}
              onClick={() => setActiveCategory(i)}
              style={{ '--cat-color': cat.color }}
              id={`service-tab-${i}`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Active category label */}
        <div className="services__cat-header">
          <div
            className="services__cat-dot"
            style={{ background: category.color, boxShadow: `0 0 10px ${category.color}` }}
          />
          <span className="services__cat-title" style={{ color: category.color }}>
            {category.category}
          </span>
        </div>

        {/* Cards grid */}
        <div className="services__grid" key={activeCategory}>
          {category.services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="services__cta-row">
          <div className="services__cta-text">
            <span className="gradient-text">Ready to build reliable backend systems?</span>
          </div>
          <a
            href="#contact"
            className="btn-primary"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            Start a Project
          </a>
        </div>
      </div>

      <div className="services__bg-glow" />
    </section>
  );
}
