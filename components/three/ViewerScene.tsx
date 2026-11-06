"use client";

import { OrbitControls } from "@react-three/drei";
import { MODELS, type ModelName } from "./Models";
import { Backdrop, Glow, Stage, isSmallDevice } from "./Scene";

/** Drag-to-rotate view of one model. */
export default function ViewerScene({ name }: { name: ModelName }) {
  const { Model, camera, target } = MODELS[name];
  /* Portrait screens need the camera further back to fit the whole building. */
  const scale = isSmallDevice() ? 1.9 : 1;
  const position = camera.map((v, i) => (i === 1 ? v : v * scale)) as [number, number, number];
  return (
    <Stage className="canvas-fill" camera={{ position }}>
      <Backdrop />
      <Model />
      <OrbitControls makeDefault target={[...target]} autoRotate autoRotateSpeed={0.7} enableDamping enablePan={false} minDistance={22} maxDistance={190} maxPolarAngle={Math.PI / 2.08} />
      <Glow enabled={!isSmallDevice()} />
    </Stage>
  );
}
