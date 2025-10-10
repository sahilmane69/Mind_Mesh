"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function MovingPoints() {
  const pointsRef = useRef<any>(null);
  useEffect(() => {
    let raf = 0;
    const animate = () => {
      if (pointsRef.current) {
        pointsRef.current.rotation.y += 0.0008;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <group ref={pointsRef}>
      {/* Small geometry keeps perf high */}
      <mesh>
        <icosahedronGeometry args={[2, 1]} />
        <meshBasicMaterial color="#5ee1ff" wireframe opacity={0.15} transparent />
      </mesh>
    </group>
  );
}

export default function SceneBackgroundLite() {
  const isDesktop = typeof window !== "undefined" ? window.matchMedia("(hover: hover) and (pointer: fine)").matches : true;
  if (!isDesktop) return null;
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 opacity-20">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.25]}>
        <Suspense fallback={null}>
          <MovingPoints />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}


