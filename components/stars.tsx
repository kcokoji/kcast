"use client";
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function StarsEffect() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas>
        <Stars radius={50} count={1800} factor={3} fade speed={2} />
      </Canvas>
    </div>
  );
}
