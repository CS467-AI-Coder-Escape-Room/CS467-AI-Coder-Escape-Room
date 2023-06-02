import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import * as THREE from 'three';

const ParticleSystem = () => {
  const particlesRef = useRef([]);

  // Initialize the particles
  const numParticles = 1000;
  const initialPositions = Array.from({ length: numParticles }, () => [
    Math.random() * 10 - 5,
    Math.random() * 10 - 5,
    Math.random() * 10 - 5,
  ]);
  const updateFrequency = 2; // Update positions every 60 frames
  let frameCount = 0;

  // Update the particle positions
  useFrame(() => {
    frameCount++;
    if (frameCount % updateFrequency === 0) {
      const particles = particlesRef.current;
      for (let i = 0; i < numParticles; i++) {
        const particle = particles[i];
        particle.position.x += Math.random() * 0.01 - 0.005;
        particle.position.y += Math.random() * 0.01 - 0.005;
        particle.position.z += Math.random() * 0.01 - 0.005;
      }
    }
  });

  return (
    <group>
      {initialPositions.map((position, index) => (
        <mesh key={index} position={position} ref={(ref) => (particlesRef.current[index] = ref)}>
          <sphereGeometry args={[0.002, 16, 16]} />
          <meshBasicMaterial color={new THREE.Color(0xD3D3D3)} />
        </mesh>
      ))}
    </group>
  );
};

export default ParticleSystem;
  