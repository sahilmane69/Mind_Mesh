import type { ReactThreeFiber } from "@react-three/fiber";
import type * as THREE from "three";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshStandardMaterial: ReactThreeFiber.MaterialNode<
        THREE.MeshStandardMaterial,
        [THREE.MeshStandardMaterialParameters]
      >;
      ambientLight: ReactThreeFiber.LightNode<THREE.AmbientLight, typeof THREE.AmbientLight>;
      directionalLight: ReactThreeFiber.LightNode<
        THREE.DirectionalLight,
        typeof THREE.DirectionalLight
      >;
      pointLight: ReactThreeFiber.LightNode<THREE.PointLight, typeof THREE.PointLight>;
      points: ReactThreeFiber.Object3DNode<THREE.Points, typeof THREE.Points>;
      bufferGeometry: ReactThreeFiber.BufferGeometryNode<
        THREE.BufferGeometry,
        typeof THREE.BufferGeometry
      >;
      bufferAttribute: ReactThreeFiber.Node<THREE.BufferAttribute, typeof THREE.BufferAttribute>;
      pointsMaterial: ReactThreeFiber.MaterialNode<
        THREE.PointsMaterial,
        [THREE.PointsMaterialParameters]
      >;
    }
  }
}

export {};
