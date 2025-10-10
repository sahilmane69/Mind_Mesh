/**
 * Pre-generated particle positions for consistent SSR/client rendering.
 * Using deterministic pseudo-random algorithm to avoid Math.random() hydration mismatches.
 */

export interface ParticlePosition {
  id: number;
  delay: number;
  x: string;
  y: string;
  size: number;
  duration: number;
}

/**
 * Generate deterministic "random" values using a seeded algorithm
 */
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/**
 * Pre-generated particle positions (20 particles for Hero component)
 */
export const PARTICLE_POSITIONS: ParticlePosition[] = Array.from({ length: 20 }, (_, i) => {
  const seed = i + 1;
  return {
    id: i,
    delay: seededRandom(seed * 1.1) * 2,
    x: `${seededRandom(seed * 2.3) * 100}%`,
    y: `${seededRandom(seed * 3.7) * 100}%`,
    size: 2 + Math.floor(seededRandom(seed * 4.1) * 4),
    duration: 3 + seededRandom(seed * 5.9) * 4,
  };
});

/**
 * Pre-generated 3D particle positions for Scene3D component (5000 particles)
 */
export function generateParticlePositions3D(count: number = 5000): Float32Array {
  const positions = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    const seed = i + 1;
    positions[i * 3] = (seededRandom(seed * 1.1) - 0.5) * 10;
    positions[i * 3 + 1] = (seededRandom(seed * 2.3) - 0.5) * 10;
    positions[i * 3 + 2] = (seededRandom(seed * 3.7) - 0.5) * 10;
  }
  
  return positions;
}
