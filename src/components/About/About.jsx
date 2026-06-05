import { useRef, useEffect } from 'react';
import { useReveal } from '../../hooks/usePortfolio';
import { about, personalInfo, experience, education } from '../../constants/data';
import { MotionFloat, SectionLabel } from '../UI/MotionPrimitives';
import './About.css';

function ExperienceCard({ item, index }) {
  const { ref, isVisible } = useReveal(0.15);
  return (
    <MotionFloat delay={index * 0.15} y={6} duration={5 + (index % 3)}>
      <article
        ref={ref}
        className={`about__experience-card glass-card${isVisible ? ' about__experience-card--visible' : ''}`}
        style={{ transitionDelay: `${index * 0.08}s` }}
      >
        <div className="about__experience-card-header">
          <div>
            <h3>{item.title}</h3>
            <span className="about__experience-period">{item.period}</span>
          </div>
          <span className="about__experience-tag">{item.role}</span>
        </div>
        <div className="about__experience-details">
          {item.highlights.map((point, i) => (
            <p key={i} className="about__experience-point">{point}</p>
          ))}
        </div>
      </article>
    </MotionFloat>
  );
}

function TimelineItem({ item, index }) {
  const { ref, isVisible } = useReveal(0.2);

  return (
    <div
      ref={ref}
      className={`timeline-item${isVisible ? ' timeline-item--visible' : ''}`}
      style={{ transitionDelay: `${index * 0.12}s` }}
    >
      <div className="timeline-item__marker">
        <span className="timeline-item__icon" style={{ color: item.color }}>{item.icon}</span>
        <div className="timeline-item__line" />
      </div>
      <div className="timeline-item__content">
        <div className="timeline-item__phase" style={{ color: item.color }}>
          <span className="tag" style={{ background: `${item.color}18`, borderColor: `${item.color}33`, color: item.color }}>{item.label}</span>
          <span className="timeline-item__year">{item.phase}</span>
        </div>
        <h3 className="timeline-item__title">{item.title}</h3>
        <p className="timeline-item__desc">{item.desc}</p>
      </div>
    </div>
  );
}

function IndustryCard({ ind, index }) {
  const { ref, isVisible } = useReveal(0.1);
  return (
    <MotionFloat delay={index * 0.12} y={5} duration={4.8}>
      <div
        ref={ref}
        className={`industry-card glass-card${isVisible ? ' industry-card--visible' : ''}`}
        style={{ transitionDelay: `${index * 0.08}s` }}
      >
        <span className="industry-card__icon">{ind.icon}</span>
        <div>
          <div className="industry-card__name">{ind.name}</div>
          <div className="industry-card__desc">{ind.desc}</div>
        </div>
      </div>
    </MotionFloat>
  );
}

export default function About() {
  const headRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('visible'); },
      { threshold: 0.1 }
    );
    if (headRef.current) observer.observe(headRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="section about">
      <div className="container">

        {/* Header */}
        <div ref={headRef} className="reveal about__header">
          <SectionLabel>About Me</SectionLabel>
          <h2 className="section-title">
            From Engineering Foundations to{' '}
            <span className="gradient-text">Backend Engineering</span>
          </h2>
          <p className="about__intro">{personalInfo.bio}</p>
        </div>

        {/* Two-column layout */}
        <div className="about__grid">

          {/* Left: Experience cards */}
          <div className="about__experience">
            <div id="experience" />
            <div className="about__experience-head">
              <SectionLabel>Experience</SectionLabel>
              <p className="about__experience-intro">
                Java backend engineering experience across AI hiring platforms, banking systems, secure APIs, microservices, and database optimization.
              </p>
            </div>
            <div className="about__experience-grid">
              {experience.map((item, index) => (
                <ExperienceCard key={item.title} item={item} index={index} />
              ))}
            </div>
          </div>

          {/* Right: Journey timeline */}
          <div className="about__timeline">
            <SectionLabel className="about__timeline-label">Journey</SectionLabel>
            {about.story.map((item, i) => (
              <TimelineItem key={item.phase} item={item} index={i} />
            ))}

            <MotionFloat y={7} duration={5.2}>
            <div className="about__edu glass-card">
              <div className="about__edu-icon">EDU</div>
              <div>
                {education.map((item) => (
                  <div key={item.degree} className="about__edu-item">
                    <div className="about__edu-degree">{item.degree}</div>
                    <div className="about__edu-uni">{item.school}</div>
                    <div className="about__edu-year tag">{item.period} | {item.detail}</div>
                  </div>
                ))}
              </div>
            </div>
            </MotionFloat>
          </div>
        </div>
      </div>

      {/* Background accent */}
      <div className="about__bg-glow" />
    </section>
  );
}
