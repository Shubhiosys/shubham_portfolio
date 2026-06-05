import { useState, useEffect, useRef } from 'react';
import './Loader.css';

const bootLines = [
  'INITIALIZING NEURAL CORE...',
  'LOADING BACKEND SERVICE MATRIX...',
  'CALIBRATING JAVA RUNTIME...',
  'ESTABLISHING API LINKS...',
  'ACTIVATING MICROSERVICES...',
  'RENDERING PLATFORM LAYER...',
  'SYSTEM READY.',
];

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedLines, setDisplayedLines] = useState([]);
  const [showName, setShowName] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let prog = 0;
    const interval = setInterval(() => {
      prog += Math.random() * 4 + 1;
      if (prog > 100) prog = 100;
      setProgress(Math.floor(prog));
      if (prog >= 100) clearInterval(interval);
    }, 60);

    const lineTimers = bootLines.map((_, i) =>
      setTimeout(() => {
        setCurrentLine(i);
        setDisplayedLines(prev => [...prev, bootLines[i]]);
      }, i * 420)
    );

    const nameTimer = setTimeout(() => setShowName(true), 2200);
    const fadeTimer = setTimeout(() => setFadeOut(true), 3200);
    const doneTimer = setTimeout(() => onComplete?.(), 3700);

    return () => {
      clearInterval(interval);
      lineTimers.forEach(clearTimeout);
      clearTimeout(nameTimer);
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div className={`loader${fadeOut ? ' loader--fade' : ''}`}>
      {/* Animated grid */}
      <div className="loader__grid" />

      {/* Scan line */}
      <div className="loader__scanline" />

      {/* Corner decorations */}
      <div className="loader__corner loader__corner--tl" />
      <div className="loader__corner loader__corner--tr" />
      <div className="loader__corner loader__corner--bl" />
      <div className="loader__corner loader__corner--br" />

      <div className="loader__content">
        {/* Logo mark */}
        <div className="loader__logo">
          <div className="loader__logo-ring" />
          <div className="loader__logo-ring loader__logo-ring--2" />
          <div className="loader__logo-core">
            <span>S</span>
          </div>
        </div>

        {/* Boot terminal */}
        <div className="loader__terminal">
          {displayedLines.map((line, i) => (
            <div
              key={i}
              className={`loader__terminal-line${i === displayedLines.length - 1 ? ' loader__terminal-line--active' : ' loader__terminal-line--done'}`}
            >
              <span className="loader__terminal-prompt">{'>'}</span>
              <span>{line}</span>
              {i === displayedLines.length - 1 && (
                <span className="loader__terminal-cursor" />
              )}
            </div>
          ))}
        </div>

        {/* Name reveal */}
        <div className={`loader__name${showName ? ' loader__name--visible' : ''}`}>
          <span className="loader__name-text">SHUBHAM SINGH</span>
          <span className="loader__name-sub">BACKEND ENGINEER | JAVA | SPRING BOOT</span>
        </div>

        {/* Progress bar */}
        <div className="loader__progress-wrapper">
          <div className="loader__progress-bar">
            <div
              className="loader__progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="loader__progress-text">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
