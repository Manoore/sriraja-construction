"use client";

import { Canvas, type CanvasProps } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { useEffect, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";

const BG = "#100e0b";

/** Dark studio around a white architectural scale model. */
export function Backdrop() {
  return (
    <>
      <color attach="background" args={[BG]} />
      <fog attach="fog" args={[BG, 95, 240]} />
      <hemisphereLight args={["#fff4e2", "#1a1612", 0.5]} />
      <directionalLight
        position={[-38, 52, 42]}
        color="#fff1dc"
        intensity={2.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0004}
        shadow-radius={5}
        shadow-camera-left={-70}
        shadow-camera-right={70}
        shadow-camera-top={70}
        shadow-camera-bottom={-70}
        shadow-camera-far={200}
      />
      <directionalLight position={[45, 18, -30]} color="#d7a95c" intensity={1.1} />
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={0.9} color="#fff1dc" position={[-30, 30, 30]} scale={[80, 50, 1]} />
        <Lightformer form="rect" intensity={0.5} color="#c9a557" position={[40, 12, -20]} scale={[60, 30, 1]} />
      </Environment>
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.02, 0]} receiveShadow>
        <circleGeometry args={[320, 64]} />
        <meshStandardMaterial color="#1a1713" roughness={0.9} />
      </mesh>
    </>
  );
}

/** Soft glow on capable devices; off on phones to keep scrolling smooth. */
export function Glow({ enabled = true }: { enabled?: boolean }) {
  if (!enabled) return null;
  return (
    <EffectComposer multisampling={0}>
      <Bloom mipmapBlur intensity={0.4} luminanceThreshold={0.95} luminanceSmoothing={0.2} />
      <Vignette eskil={false} offset={0.3} darkness={0.5} />
    </EffectComposer>
  );
}

export const isSmallDevice = () => typeof window !== "undefined" && window.matchMedia("(max-width: 800px)").matches;

export function canUseWebGL() {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

type StageProps = { children: ReactNode; camera: { position: [number, number, number]; fov?: number }; className?: string } & Omit<CanvasProps, "camera" | "children">;

/** Canvas with shared renderer settings. Rendering pauses while it is off-screen. */
export function Stage({ children, camera, className, ...rest }: StageProps) {
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const small = isSmallDevice();

  useEffect(() => {
    if (!host.current) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(host.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={host} className={className}>
      <Canvas
        shadows="soft"
        frameloop={visible ? "always" : "never"}
        dpr={small ? [1, 1.25] : [1, 1.75]}
        gl={{ antialias: !small, powerPreference: "high-performance" }}
        camera={{ fov: 34, near: 0.5, far: 800, ...camera }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1;
        }}
        {...rest}
      >
        {children}
      </Canvas>
    </div>
  );
}
