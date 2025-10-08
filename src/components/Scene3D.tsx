import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

import { ACCENT_COLOR, PRIMARY_COLOR } from "../constants/colors";
import { pseudoRandom } from "../lib/pseudo-random";

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 100, 100]} scale={2}>
      <MeshDistortMaterial
        color={PRIMARY_COLOR}
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null);

  const particlesCount = 1000;
  const positions = useMemo(() => {
    const data = new Float32Array(particlesCount * 3);
    for (let i = 0; i < data.length; i++) {
      data[i] = (pseudoRandom(i + 1) - 0.5) * 10;
    }
    return data;
  }, [particlesCount]);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color={ACCENT_COLOR}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

type AutoOrbitCameraProps = {
  radius?: number;
  speed?: number;
};

function AutoOrbitCamera({ radius = 5, speed = 0.1 }: AutoOrbitCameraProps) {
  const { camera } = useThree();
  const radiusRef = useRef(radius);

  useEffect(() => {
    radiusRef.current = Math.max(1, camera.position.length());
    camera.lookAt(0, 0, 0);
  }, [camera]);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime() * speed;
    const currentRadius = radiusRef.current;
    camera.position.x = Math.cos(elapsed) * currentRadius;
    camera.position.z = Math.sin(elapsed) * currentRadius;
    camera.position.y = Math.sin(elapsed * 0.3) * 0.5;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export function Scene3D() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color={ACCENT_COLOR} />
        
        <AnimatedSphere />
        <Particles />
        <AutoOrbitCamera radius={5} speed={0.1} />
      </Canvas>
    </div>
  );
}
