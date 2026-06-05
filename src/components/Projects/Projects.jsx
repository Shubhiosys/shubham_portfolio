import { useState } from 'react';
import { projects } from '../../constants/data';
import { useReveal } from '../../hooks/usePortfolio';
import { MotionFloat, SectionLabel } from '../UI/MotionPrimitives';
import './Projects.css';

function ProjectCard({ project, index, onOpenProject }) {
  const { ref, isVisible } = useReveal(0.1);
  const [hovered, setHovered] = useState(false);

  return (
    <MotionFloat delay={(index % 3) * 0.18} y={8} duration={5}>
    <button
      ref={ref}
      type="button"
      className={`project-card${isVisible ? ' project-card--visible' : ''}${hovered ? ' project-card--hovered' : ''}`}
      style={{ transitionDelay: `${(index % 3) * 0.1}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpenProject(project.id)}
      aria-label={`View case study for ${project.title}`}
    >
      {/* Card top */}
      <div className="project-card__top">
        <div
          className="project-card__icon-bg"
          style={{ background: `radial-gradient(circle at 30% 40%, ${project.color}22, transparent 70%)` }}
        />
        <div className="project-card__icon" style={{ color: project.color }}>
          {project.icon}
        </div>
        <div className="project-card__type tag" style={{
          background: `${project.color}18`,
          borderColor: `${project.color}33`,
          color: project.color,
        }}>
          {project.type}
        </div>
      </div>

      {/* Card body */}
      <div className="project-card__body">
        <div className="project-card__category">{project.category}</div>
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__desc">{project.description}</p>

        {/* Tech tags */}
        <div className="project-card__tech">
          {project.tech.map(t => (
            <span key={t} className="project-card__tech-tag">{t}</span>
          ))}
        </div>
        <div className="project-card__actions">
          <span className="project-card__cta">View Case Study</span>
        </div>
      </div>

      {/* Hover glow border */}
      <div className="project-card__border" style={{ '--project-color': project.color }} />
    </button>
    </MotionFloat>
  );
}

const categories = ['All', ...new Set(projects.map(p => p.type))];

export default function Projects({ onOpenProject }) {
  const [filter, setFilter] = useState('All');
  const { ref: headRef, isVisible: headVisible } = useReveal(0.2);

  const filtered = filter === 'All' ? projects : projects.filter(p => p.type === filter);

  return (
    <section id="projects" className="section projects">
      <div className="container">

        {/* Header */}
        <div ref={headRef} className={`reveal${headVisible ? ' visible' : ''}`}>
          <SectionLabel>Featured Work</SectionLabel>
          <h2 className="section-title">
            Backend Project <span className="gradient-text">Laboratory</span>
          </h2>
          <p className="projects__subtitle">
            Real-world Java and Spring Boot systems built for AI hiring automation,
            banking workflows, secure APIs, and operational platforms.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="projects__filters scroll-x">
          {categories.map(cat => (
            <button
              key={cat}
              className={`projects__filter${filter === cat ? ' projects__filter--active' : ''}`}
              onClick={() => setFilter(cat)}
              id={`project-filter-${cat.replace(/\s+/g, '-').toLowerCase()}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="projects__grid">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} onOpenProject={onOpenProject} />
          ))}
        </div>

        {/* Bottom row */}
        <div className="projects__bottom">
          <a href="#" target="_blank" rel="noreferrer" className="btn-secondary">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
            View All on GitHub
          </a>
        </div>
      </div>

      <div className="projects__bg-glow" />
    </section>
  );
}
