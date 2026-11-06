"use client";

import { useEffect, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import { MODELS, type ModelName } from "./Models";
import { Progress } from "./kit";
import { Backdrop, Glow, Stage } from "./Scene";

function LookAt({ target }: { target: readonly [number, number, number] }) {
  const camera = useThree((s) => s.camera);
  useEffect(() => {
    camera.lookAt(target[0], target[1], target[2]);
  }, [camera, target]);
  return null;
}

/** Renders one model at a fixed camera, used to generate the still images in public/renders. */
export default function Studio() {
  const [params, setParams] = useState<{ name: ModelName; p: number; hero: boolean } | null>(null);
  const progress = useRef(1);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const name = (q.get("m") ?? "apartment") as ModelName;
    const p = Number(q.get("p") ?? 1);
    progress.current = p;
    setParams({ name, p, hero: q.has("hero") });
  }, []);

  if (!params) return null;
  const { Model, camera, target } = MODELS[params.name];
  return (
    <Stage className="studio" camera={{ position: [...camera] as [number, number, number] }} gl={{ preserveDrawingBuffer: true, antialias: true }}>
      <LookAt target={target} />
      <Backdrop />
      <Progress.Provider value={progress}>
        <Model />
      </Progress.Provider>
      <Glow />
    </Stage>
  );
}
