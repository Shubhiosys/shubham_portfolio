import { motion } from 'framer-motion';

const PARTICLES = [
  { top: '12%', left: '18%', delay: 0 },
  { top: '28%', left: '72%', delay: 0.6 },
  { top: '48%', left: '35%', delay: 1.2 },
  { top: '62%', left: '82%', delay: 0.3 },
  { top: '78%', left: '22%', delay: 1.8 },
  { top: '88%', left: '58%', delay: 0.9 },
];

const FORMULAS = [
  { text: 'Controller -> Service -> Repository', top: '16%', left: '64%', delay: 0 },
  { text: 'GET /api/v1/resources', top: '34%', left: '8%', delay: 1.1 },
  { text: 'JWT -> filter -> security context', top: '46%', left: '70%', delay: 2.2 },
  { text: 'cache hit -> Redis', top: '64%', left: '14%', delay: 0.7 },
  { text: 'ORM -> SQL -> index', top: '78%', left: '56%', delay: 1.8 },
  { text: 'build -> test -> deploy', top: '88%', left: '24%', delay: 2.8 },
];

const AI_SYMBOLS = [
  { text: 'Java', top: '14%', left: '8%', delay: 0 },
  { text: 'Spring Boot', top: '22%', left: '48%', delay: 0.4 },
  { text: 'Microservices', top: '30%', left: '76%', delay: 0.8 },
  { text: 'REST APIs', top: '40%', left: '20%', delay: 1.2 },
  { text: 'Hibernate', top: '52%', left: '60%', delay: 1.6 },
  { text: 'MySQL', top: '62%', left: '34%', delay: 2 },
  { text: 'JWT', top: '72%', left: '80%', delay: 2.4 },
  { text: 'Redis', top: '82%', left: '10%', delay: 2.8 },
  { text: 'Docker', top: '90%', left: '46%', delay: 3.2 },
  { text: 'Maven', top: '18%', left: '84%', delay: 0.2 },
  { text: 'CI/CD', top: '58%', left: '6%', delay: 1.4 },
  { text: 'Spring Security', top: '86%', left: '68%', delay: 2.6 },
];

const NODES = [
  { top: '18%', left: '36%', delay: 0 },
  { top: '30%', left: '50%', delay: 0.4 },
  { top: '42%', left: '40%', delay: 0.8 },
  { top: '56%', left: '58%', delay: 1.2 },
  { top: '68%', left: '46%', delay: 1.6 },
];

const DATA_STREAMS = [
  { top: '18%', delay: 0, width: '180px' },
  { top: '30%', delay: 0.6, width: '260px' },
  { top: '42%', delay: 1.2, width: '210px' },
  { top: '54%', delay: 0.2, width: '300px' },
  { top: '66%', delay: 0.9, width: '240px' },
  { top: '78%', delay: 1.5, width: '190px' },
  { top: '88%', delay: 0.4, width: '280px' },
];

export default function PortfolioAmbient() {
  return (
    <div className="portfolio-ambient" aria-hidden>
      <div className="portfolio-ambient__orb portfolio-ambient__orb--1" />
      <div className="portfolio-ambient__orb portfolio-ambient__orb--2" />
      <div className="portfolio-ambient__orb portfolio-ambient__orb--3" />
      <div className="portfolio-ambient__wave-field">
        <svg className="portfolio-ambient__waves" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <path d="M-80 520 C 180 420, 260 620, 520 500 S 860 360, 1280 460" />
          <path d="M-120 360 C 140 260, 330 430, 560 320 S 900 180, 1320 300" />
          <path d="M-70 650 C 210 540, 360 720, 620 610 S 930 480, 1280 580" />
        </svg>

        <svg className="portfolio-ambient__mesh" viewBox="0 0 900 620" preserveAspectRatio="xMidYMid meet">
          <path d="M170 120 L350 190 L260 320 L470 390 L640 260 L750 420" />
          <path d="M350 190 L520 110 L640 260 L470 390 L360 520" />
          <path d="M260 320 L170 120 L520 110" />
        </svg>
      </div>

      <div className="portfolio-ambient__stream-layer">
        {DATA_STREAMS.map((stream, i) => (
          <span
            key={`stream-${i}`}
            className="portfolio-ambient__stream"
            style={{
              top: stream.top,
              width: stream.width,
              animationDelay: `${stream.delay}s`,
            }}
          />
        ))}
      </div>

      {PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          className="portfolio-ambient__particle"
          style={{ top: p.top, left: p.left }}
          animate={{
            x: [0, 22, -8, 0],
            y: [0, -26, 8, 0],
            opacity: [0.35, 1, 0.35],
            scale: [1, 1.65, 1],
          }}
          transition={{
            duration: 1.8 + i * 0.18,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
        />
      ))}

      {NODES.map((node, i) => (
        <motion.span
          key={`node-${i}`}
          className={`portfolio-ambient__node${i > 2 ? ' portfolio-ambient__node--optional' : ''}`}
          style={{ top: node.top, left: node.left }}
          animate={{
            x: [0, 18, -10, 0],
            y: [0, -14, 8, 0],
            z: [0, 34, 0],
            scale: [1, 1.75, 1],
            opacity: [0.28, 1, 0.28],
          }}
          transition={{
            duration: 2.1 + i * 0.2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: node.delay,
          }}
        />
      ))}

      {FORMULAS.map((formula, i) => (
        <motion.span
          key={formula.text}
          className={`portfolio-ambient__formula${i > 2 ? ' portfolio-ambient__formula--optional' : ''}`}
          style={{ top: formula.top, left: formula.left }}
          animate={{
            x: [0, 44, -18, 0],
            y: [0, -30, 8, 0],
            opacity: [0.12, 0.48, 0.12],
          }}
          transition={{
            duration: 3.4 + i * 0.22,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: formula.delay,
          }}
        >
          {formula.text}
        </motion.span>
      ))}

      {AI_SYMBOLS.map((symbol, i) => (
        <motion.span
          key={symbol.text}
          className={`portfolio-ambient__ai-symbol${i > 6 ? ' portfolio-ambient__ai-symbol--optional' : ''}${i > 3 ? ' portfolio-ambient__ai-symbol--compact-optional' : ''}`}
          style={{ top: symbol.top, left: symbol.left }}
          animate={{
            x: [0, 70, -28, 0],
            y: [0, -46, 18, 0],
            scale: [1, 1.18, 0.96, 1],
            opacity: [0.05, 0.24, 0.08, 0.05],
          }}
          transition={{
            duration: 2.6 + (i % 4) * 0.35,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: symbol.delay,
          }}
        >
          {symbol.text}
        </motion.span>
      ))}
    </div>
  );
}
