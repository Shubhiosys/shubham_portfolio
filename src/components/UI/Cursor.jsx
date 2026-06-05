import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '../../hooks/usePortfolio';
import './Cursor.css';

export default function Cursor() {
  const isMobile = useIsMobile();
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    if (isMobile) return;

    let mouseX = 0, mouseY = 0;
    let curX = 0, curY = 0;
    let rafId;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
      }
    };

    const onPointerOver = (e) => {
      const target = e.target.closest('a, button, [data-magnetic], input, textarea, select, label');
      setIsPointer(!!target);
    };

    const animate = () => {
      curX += (mouseX - curX) * 0.12;
      curY += (mouseY - curY) * 0.12;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${curX - 20}px, ${curY - 20}px)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onPointerOver);
    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onPointerOver);
      cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div ref={cursorRef} className={`cursor-ring${isPointer ? ' cursor-ring--pointer' : ''}`} />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}
