import { MotionFloat, SectionLabel } from '../UI/MotionPrimitives';
import { personalInfo } from '../../constants/data';
import './FinalCta.css';

export default function FinalCta() {
  return (
    <section className="final-cta">
      <MotionFloat y={10} duration={6}>
        <div className="container final-cta__inner glass-card">
          <div>
            <SectionLabel>Ready to scale</SectionLabel>
            <h2>Let's Build Backend Systems That Scale</h2>
            <p className="final-cta__copy">
              Available for backend engineering opportunities and Java/Spring Boot projects. I build secure APIs, microservices, and reliable database-backed systems for production teams.
            </p>
          </div>

          <div className="final-cta__actions">
            <a href="#contact" className="btn-primary" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}>Hire Me</a>
            <a href="https://wa.me/918871383015" target="_blank" rel="noreferrer" className="btn-secondary">WhatsApp Me</a>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="btn-secondary">View LinkedIn</a>
          </div>
        </div>
      </MotionFloat>
    </section>
  );
}
