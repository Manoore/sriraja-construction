"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, type RefObject } from "react";
import { Apartment } from "./Models";
import { Progress } from "./kit";
import { Backdrop, Glow, Stage, isSmallDevice } from "./Scene";

function CameraRig({ progress }: { progress: RefObject<number> }) {
  const mouse = useRef(0);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      mouse.current = (e.clientX / window.innerWidth - 0.5) * 2;
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  useFrame(({ camera, size }) => {
    const p = progress.current ?? 1;
    const narrow = size.width / size.height < 1;
    const angle = -0.95 + p * 1.05 + mouse.current * 0.06;
    const r = (narrow ? 150 : 86) - p * 6;
    camera.position.x += (Math.sin(angle) * r - camera.position.x) * 0.08;
    camera.position.z += (Math.cos(angle) * r - camera.position.z) * 0.08;
    camera.position.y += ((narrow ? 30 : 24 - p * 10) - camera.position.y) * 0.08;
    camera.lookAt(narrow ? 0 : -11, narrow ? 19 : 6 + p * 4, 2);
  });
  return null;
}

/** The apartment model, assembled by `progress` (0 to 1). */
export default function BuildScene({ progress }: { progress: RefObject<number> }) {
  return (
    <Stage className="canvas-fill" camera={{ position: [-40, 24, 50] }}>
      <Backdrop />
      <CameraRig progress={progress} />
      <Progress.Provider value={progress}>
        <Apartment />
      </Progress.Provider>
      <Glow enabled={!isSmallDevice()} />
    </Stage>
  );
}
