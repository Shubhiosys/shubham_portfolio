import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import HeroScene3D from './HeroScene3D';
import './Hero.css';

export default function HeroBackground({ isMobile, mouseNorm }) {
  return (
    <>
      <div className="hero__canvas" aria-hidden>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 58 }}
          gl={{ antialias: true, alpha: true }}
          dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)}
        >
          <Suspense fallback={null}>
            <HeroScene3D isMobile={isMobile} mouseNorm={mouseNorm} />
          </Suspense>
        </Canvas>
      </div>
      <div className="grid-bg hero__grid" aria-hidden />
      <div className="hero__orb hero__orb--1" aria-hidden />
      <div className="hero__orb hero__orb--2" aria-hidden />
      <div className="hero__orb hero__orb--3" aria-hidden />
    </>
  );
}
