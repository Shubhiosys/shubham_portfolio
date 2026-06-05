import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';

function ParticleField({ count = 600 }) {
  const ref = useRef();
  const positions = useRef(new Float32Array(count * 3));
  const colors = useRef(new Float32Array(count * 3));

  useEffect(() => {
    for (let i = 0; i < count; i++) {
      positions.current[i * 3] = (Math.random() - 0.5) * 40;
      positions.current[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions.current[i * 3 + 2] = (Math.random() - 0.5) * 40;
      const t = Math.random();
      colors.current[i * 3] = 0;
      colors.current[i * 3 + 1] = t * 0.83 + (1 - t) * 0.65;
      colors.current[i * 3 + 2] = t * 1 + (1 - t) * 0.45;
    }
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.015;
    ref.current.rotation.y = state.clock.elapsedTime * 0.025;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions.current} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors.current} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.035} vertexColors transparent opacity={0.3} sizeAttenuation />
    </points>
  );
}

function NeuralCore({ mouseNorm }) {
  const meshRef = useRef();
  const ringRef = useRef();
  const ring2Ref = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.15 + (mouseNorm?.y || 0) * 0.35;
      meshRef.current.rotation.y = t * 0.22 + (mouseNorm?.x || 0) * 0.35;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.3;
      ringRef.current.rotation.x = Math.PI / 4 + Math.sin(t * 0.25) * 0.08;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.22;
      ring2Ref.current.rotation.y = Math.PI / 3 + Math.cos(t * 0.18) * 0.08;
    }
  });

  return (
    <group position={[2.2, 0, 0]}>
      <Float speed={1.6} rotationIntensity={0.2} floatIntensity={0.35}>
        <Sphere ref={meshRef} args={[0.85, 48, 48]}>
          <MeshDistortMaterial color="#00d4ff" wireframe distort={0.25} speed={1.6} transparent opacity={0.22} />
        </Sphere>
        <Sphere args={[0.55, 24, 24]}>
          <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.35} transparent opacity={0.05} />
        </Sphere>
      </Float>
      <mesh ref={ringRef}>
        <torusGeometry args={[1.35, 0.006, 12, 80]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.7} transparent opacity={0.35} />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.65, 0.004, 12, 80]} />
        <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.6} transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

function CameraController({ mouseNorm }) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 8));

  useFrame(() => {
    if (!mouseNorm) return;
    target.current.x += ((mouseNorm.x || 0) * 0.5 - target.current.x) * 0.04;
    target.current.y += ((mouseNorm.y || 0) * 0.35 - target.current.y) * 0.04;
    camera.position.lerp(target.current, 0.04);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function HeroScene3D({ isMobile, mouseNorm }) {
  const particleCount = isMobile ? 200 : 600;

  return (
    <>
      <ambientLight intensity={0.08} />
      <pointLight position={[10, 10, 10]} intensity={0.35} color="#00d4ff" />
      <pointLight position={[-10, -10, -5]} intensity={0.2} color="#00ff88" />
      <Stars radius={70} depth={40} count={isMobile ? 200 : 600} factor={2.2} fade speed={0.4} />
      <ParticleField count={particleCount} />
      {!isMobile && <NeuralCore mouseNorm={mouseNorm} />}
      {!isMobile && <CameraController mouseNorm={mouseNorm} />}
      <EffectComposer>
        <Bloom intensity={isMobile ? 0.3 : 0.5} luminanceThreshold={0.25} luminanceSmoothing={0.92} radius={0.5} />
        {!isMobile && <ChromaticAberration offset={[0.0002, 0.0002]} />}
      </EffectComposer>
    </>
  );
}
