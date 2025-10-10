import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

import { THEME } from "../constants/theme";

type FloatingCardProps = {
  position: [number, number, number];
  color: string;
};

function FloatingCard({ position, color }: FloatingCardProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() + position[0]) * 0.2;
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() + position[1]) * 0.2;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() + position[0]) * 0.3;
    }
  });

  return (
    <RoundedBox
      ref={meshRef}
      args={[1, 1.4, 0.1]}
      radius={0.05}
      smoothness={4}
      position={position}
    >
      <meshStandardMaterial
        color={color}
        roughness={0.3}
        metalness={0.5}
        transparent
        opacity={0.8}
      />
    </RoundedBox>
  );
}

export function FloatingCards3D() {
  return (
    <div className="w-full h-[400px]">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.3} color={THEME.colors.accent} />

        <FloatingCard position={[-2, 0, 0]} color={THEME.colors.primary} />
        <FloatingCard position={[0, 0, -1]} color={THEME.colors.tertiary} />
        <FloatingCard position={[2, 0, 0]} color={THEME.colors.accent} />
      </Canvas>
    </div>
  );
}
