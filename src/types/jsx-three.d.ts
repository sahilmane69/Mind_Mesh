import type { ThreeElements } from '@react-three/fiber/three-types';

declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

export {};
