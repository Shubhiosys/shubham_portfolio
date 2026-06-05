import { useState } from 'react';
import { personalInfo } from '../../constants/data';
import { useReveal } from '../../hooks/usePortfolio';
import { MotionFloat, SectionLabel } from '../UI/MotionPrimitives';
import './Contact.css';

const rawApiUrl = import.meta.env.VITE_API_URL?.trim();
const apiBase = rawApiUrl && !rawApiUrl.includes('localhost:5173') ? rawApiUrl.replace(/\/$/, '') : '/api';
const API_URL = apiBase.includes('/api') ? apiBase : `${apiBase}/api`;

const buildApiUrl = (path) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_URL.replace(/\/$/, '')}${normalizedPath}`;
};

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');
  const { ref: headRef, isVisible: headVisible } = useReveal(0.2);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setError('');

    try {
      const requestUrl = buildApiUrl('/send-email');
      const response = await fetch(requestUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const responseText = await response.text();
      let data = {};
      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch (parseError) {
        data = {};
      }

      if (!response.ok) {
        throw new Error(data?.error || response.statusText || responseText || 'Failed to send message.');
      }

      setStatus('sent');
    } catch (err) {
      setStatus('error');
      setError(err.message || 'Unable to send your message right now.');
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="section contact">
      <div className="container">

        {/* Header */}
        <div ref={headRef} className={`reveal${headVisible ? ' visible' : ''}`}>
          <SectionLabel>Get In Touch</SectionLabel>
          <h2 className="section-title">
            Let's Build <span className="gradient-text">Reliable Backends Together</span>
          </h2>
          <p className="contact__subtitle">
            Looking to build Java services, Spring Boot APIs, secure authentication, microservices, or optimized database-backed platforms?
            Let's connect and engineer dependable systems together.
          </p>
        </div>

        <div className="contact__grid">

          {/* Left: Info cards */}
          <div className="contact__info">
            {[
              { icon: 'MAIL', label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
              { icon: 'IN', label: 'LinkedIn', value: 'LinkedIn', href: personalInfo.linkedin, external: true },
              { icon: 'GH', label: 'GitHub', value: 'GitHub', href: personalInfo.github, external: true },
            ].map((item, i) => (
              <MotionFloat key={item.label} delay={i * 0.15} y={6} duration={4.8}>
                <div className="contact__info-card glass-card">
                  <span className="contact__info-icon">{item.icon}</span>
                  <div>
                    <div className="contact__info-label">{item.label}</div>
                    <a
                      href={item.href}
                      className="contact__info-value"
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noreferrer' : undefined}
                    >
                      {item.value}
                    </a>
                  </div>
                </div>
              </MotionFloat>
            ))}
            <MotionFloat delay={0.5} y={6} duration={5}>
            <div className="contact__info-card glass-card contact__status-card">
              <div className="glow-dot" />
              <div>
                <div className="contact__info-label">Status</div>
                <div className="contact__info-value contact__status-text">Open to backend engineering opportunities and Java/Spring Boot projects</div>
              </div>
            </div>
            </MotionFloat>

            {/* Areas */}
            <MotionFloat delay={0.65} y={7} duration={5.5}>
            <div className="contact__areas glass-card">
              <div className="contact__areas-title">Available For</div>
              {[
                'Java Backend Development',
                'Spring Boot API Projects',
                'Microservices Architecture',
                'Database Optimization',
                'Secure Authentication Systems',
                'Full-time Backend Engineer Roles',
              ].map(area => (
                <div key={area} className="contact__area-item">
                  <span className="contact__area-dot" />
                  <span>{area}</span>
                </div>
              ))}
            </div>
            </MotionFloat>
          </div>

          {/* Right: Form */}
          <div className="contact__form-wrapper">
            {status === 'sent' ? (
              <MotionFloat y={6} duration={5}>
              <div className="contact__success glass-card">
                <div className="contact__success-icon">✅</div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. I'll get back to you within 24 hours.</p>
                <button className="btn-primary" onClick={() => { setStatus('idle'); setFormData({ name: '', email: '', subject: '', message: '' }); }}>
                  Send Another
                </button>
              </div>
              </MotionFloat>
            ) : (
              <MotionFloat y={8} duration={6}>
              <form className="contact__form glass-card" onSubmit={handleSubmit} id="contact-form">
                <div className="contact__form-row">
                  <div className="contact__field">
                    <label htmlFor="contact-name" className="contact__label">Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="contact__input"
                      required
                    />
                  </div>
                  <div className="contact__field">
                    <label htmlFor="contact-email" className="contact__label">Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="contact__input"
                      required
                    />
                  </div>
                </div>
                <div className="contact__field">
                  <label htmlFor="contact-subject" className="contact__label">Subject</label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project / Opportunity"
                    className="contact__input"
                    required
                  />
                </div>
                <div className="contact__field">
                  <label htmlFor="contact-message" className="contact__label">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, opportunity, or idea... Include your email or best reply method."
                    className="contact__input contact__textarea"
                    rows={6}
                    required
                  />
                </div>
                <p className="contact__note">
                  This message is delivered directly to my inbox at <strong>{personalInfo.email}</strong>. Your email address and details are included in every message.
                </p>
                {status === 'error' && (
                  <div className="contact__error-message">{error}</div>
                )}
                <button
                  type="submit"
                  className="btn-primary contact__submit"
                  disabled={status === 'sending'}
                  id="contact-submit"
                >
                  {status === 'sending' ? (
                    <>
                      <span className="contact__spinner" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Send Message
                    </>
                  )}
                </button>
              </form>
              </MotionFloat>
            )}
          </div>
        </div>
      </div>

      <div className="contact__bg-glow" />
    </section>
  );
}
