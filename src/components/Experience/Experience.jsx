import { useReveal } from '../../hooks/usePortfolio';
import { experience } from '../../constants/data';
import { MotionFloat, SectionLabel } from '../UI/MotionPrimitives';
import './Experience.css';

function ExperienceCard({ item, index }) {
  const { ref, isVisible } = useReveal(0.15);

  return (
    <MotionFloat delay={index * 0.14} y={7} duration={5 + (index % 2)}>
      <article
        ref={ref}
        className={`experience__card glass-card${isVisible ? ' experience__card--visible' : ''}`}
        style={{ transitionDelay: `${index * 0.08}s` }}
      >
        <div className="experience__card-header">
          <div>
            <h3>{item.title}</h3>
            <span className="experience__period">{item.period}</span>
          </div>
          <span className="experience__tag">{item.role}</span>
        </div>

        <div className="experience__details">
          {item.highlights.map((point, i) => (
            <p key={i} className="experience__point">{point}</p>
          ))}
        </div>
      </article>
    </MotionFloat>
  );
}

export default function Experience() {
  const { ref: headRef, isVisible: headVisible } = useReveal(0.2);

  return (
    <section id="experience" className="section experience">
      <div className="container">
        <div ref={headRef} className={`reveal${headVisible ? ' visible' : ''}`}>
          <SectionLabel>Experience</SectionLabel>
          <h2 className="section-title">
            Backend Engineering <span className="gradient-text">Experience</span> & Product Delivery
          </h2>
          <p className="experience__subtitle">
            Java and Spring Boot engineering across AI hiring workflows, banking systems, secure APIs, microservices, and database performance optimization.
          </p>
        </div>

        <div className="experience__grid">
          {experience.map((item, index) => (
            <ExperienceCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
