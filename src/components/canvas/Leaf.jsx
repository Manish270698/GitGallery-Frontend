import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { leaf } from "../../assets/index";

const Leaf = (props) => {
  const ref = useRef();
  const texture = useTexture(leaf);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta / 10;
      ref.current.rotation.y += delta / 15;
      ref.current.position.y -= delta / 2; // Move from top to bottom
      if (ref.current.position.y < -5) {
        ref.current.position.y = 5; // Reset position to top
      }
    }
  });

  return (
    <mesh ref={ref} {...props}>
      <planeGeometry args={[0.5, 1]} />
      <meshStandardMaterial map={texture} transparent side={THREE.DoubleSide} />
    </mesh>
  );
};

export default Leaf;
