import { MotionFloat } from '../UI/MotionPrimitives';
import { personalInfo } from '../../constants/data';
import './ProjectDetail.css';

export default function ProjectDetail({ project, onBack }) {
  const goToContact = (e) => {
    e.preventDefault();
    window.location.href = '/#contact';
  };

  if (!project) {
    return (
      <section className="project-detail project-detail--empty">
        <div className="container">
          <MotionFloat y={8} duration={5}>
          <div className="project-detail__hero glass-card">
            <p className="project-detail__subtitle">Project not found</p>
            <h2 className="project-detail__title">No case study available</h2>
            <button className="btn-secondary" onClick={onBack}>Return to Portfolio</button>
          </div>
          </MotionFloat>
        </div>
      </section>
    );
  }

  return (
    <section className="project-detail">
      <div className="container">
        <MotionFloat y={6} duration={5.5}>
        <div className="project-detail__top glass-card">
          <button className="project-detail__back" onClick={onBack}>
            Back to case studies
          </button>
          <div className="project-detail__kicker">Case Study</div>
          <h1 className="project-detail__title">{project.title}</h1>
          <p className="project-detail__tagline">{project.subtitle}</p>
          <div className="project-detail__meta">
            <span>{project.industry}</span>
            <span>|</span>
            <span>{project.domain}</span>
          </div>
          <div className="project-detail__cta-row">
            <a href="/#contact" className="btn-primary" onClick={goToContact}>Hire Me</a>
            <a href="https://wa.me/918871383015" target="_blank" rel="noreferrer" className="btn-secondary">Discuss on WhatsApp</a>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="btn-secondary">View LinkedIn</a>
          </div>
        </div>
        </MotionFloat>

        <div className="project-detail__grid">
          <div className="project-detail__content">
            <section className="project-detail__section">
              <h2>Problem</h2>
              <p>{project.problem}</p>
            </section>

            <section className="project-detail__section">
              <h2>Solution</h2>
              <p>{project.solution}</p>
            </section>

            <section className="project-detail__section">
              <h2>Architecture</h2>
              <div className="project-detail__architecture">
                {project.architecture.map((item, index) => (
                  <div key={index} className="project-detail__architecture-item">
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="project-detail__section">
              <h2>Tech Stack</h2>
              <div className="project-detail__tech-stack">
                {project.techStack.map((tech) => (
                  <span key={tech} className="project-detail__tech-chip">{tech}</span>
                ))}
              </div>
            </section>

            <section className="project-detail__section">
              <h2>Impact</h2>
              <div className="project-detail__impact-grid">
                {project.impact.map((item) => (
                  <div key={item.metric} className="project-detail__impact-card">
                    <span className="project-detail__impact-value">{item.metric}</span>
                    <p>{item.label}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <MotionFloat delay={0.2} y={8} duration={6}>
          <aside className="project-detail__aside glass-card">
            <div className="project-detail__aside-card">
              <h3>Key Features</h3>
              <ul>
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="project-detail__aside-card project-detail__aside-card--highlight">
              <h3>Ready for your product</h3>
              <p>Let's turn your backend requirements into secure, scalable, and maintainable production systems.</p>
              <a href="/#contact" className="btn-primary" onClick={goToContact}>Let's Build This For You</a>
            </div>
          </aside>
          </MotionFloat>
        </div>
      </div>
    </section>
  );
}
