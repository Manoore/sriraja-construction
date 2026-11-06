"use client";

import { createContext, useContext, useMemo, useRef, type ReactNode, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* Shared building blocks for the 3D models. Units are metres. */

const std = (color: string, roughness = 0.8, metalness = 0, extra: THREE.MeshStandardMaterialParameters = {}) =>
  new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra });

export const M = {
  plaster: std("#f2efe9", 0.9),
  stone: std("#d6d0c4", 0.95),
  concrete: std("#b5b1a8", 0.95),
  footing: std("#8f8c85", 1),
  brick: std("#b8694a", 0.95),
  wood: std("#c9a97f", 0.7),
  darkMetal: std("#3a3732", 0.6, 0.3),
  gold: std("#c9a557", 0.35, 0.85),
  glass: std("#2a3236", 0.15, 0.7),
  railGlass: std("#d8e2e4", 0.1, 0.2, { transparent: true, opacity: 0.3 }),
  lit: std("#3a2c1c", 0.5, 0, { emissive: "#ffc98a", emissiveIntensity: 0.8 }),
  /** Fades up with the build progress on the apartment block. */
  litBuild: std("#2a3236", 0.3, 0.3, { emissive: "#ffc98a", emissiveIntensity: 0 }),
  terracotta: std("#c9a97f", 0.8),
  soil: std("#6a5540", 1),
  paving: std("#2a2723", 0.95),
  grass: std("#211f1b", 1),
  leaf: std("#e9e5dc", 0.95),
  leaf2: std("#f3f0e9", 0.95),
  trunk: std("#c9a97f", 0.9),
  water: std("#7fb0bb", 0.45, 0.2, { emissive: "#2f7f90", emissiveIntensity: 0.35 }),
  steelSheet: std("#dedbd3", 0.8),
  steelBlue: std("#8d8a83", 0.7),
  bamboo: std("#b89b5f", 0.8),
  marigold: std("#f2a30f", 0.6, 0, { emissive: "#f2860f", emissiveIntensity: 0.9 }),
  car: std("#efece5", 0.7),
  tank: std("#55524c", 0.8),
};

const unit = new THREE.BoxGeometry(1, 1, 1);
const shift = new THREE.Matrix4().makeTranslation(0, 0.5, 0);
unit.applyMatrix4(shift);

type V3 = [number, number, number];

/** A box whose position is the centre of its base. */
export function B({ p, s, m, shadow = true }: { p: V3; s: V3; m: THREE.Material; shadow?: boolean }) {
  return <mesh geometry={unit} position={p} scale={s} material={m} castShadow={shadow} receiveShadow />;
}

/* Build progress: 1 means finished. */
export const Progress = createContext<RefObject<number> | null>(null);
export const STAGE_COUNT = 7;
export const T = (stage: number) => stage / STAGE_COUNT;

const ease = (k: number) => 1 - Math.pow(1 - k, 3);

/** Grows its children upward between progress values t[0] and t[1], and hides them after `out`. */
export function Part({ t, out, children }: { t: [number, number]; out?: number; children: ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const progress = useContext(Progress);
  useFrame(() => {
    const g = ref.current;
    if (!g) return;
    const p = progress?.current ?? 1;
    const k = Math.min(1, Math.max(0, (p - t[0]) / Math.max(0.001, t[1] - t[0])));
    g.visible = k > 0.001 && (out === undefined || p < out);
    const e = ease(k);
    g.scale.y = Math.max(0.001, e);
  });
  return <group ref={ref}>{children}</group>;
}

/** Seeded random, so the same windows light up on every render. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/** Curtain-wall material with a canvas-painted grid of lit and dark windows. */
export function facadeMaterial(cols: number, rows: number, litShare: number, seed = 7, glass = "#14242c") {
  const size = 1024;
  const base = document.createElement("canvas");
  const glow = document.createElement("canvas");
  base.width = base.height = glow.width = glow.height = size;
  const a = base.getContext("2d")!;
  const b = glow.getContext("2d")!;
  a.fillStyle = "#0d0f12";
  a.fillRect(0, 0, size, size);
  b.fillStyle = "#000";
  b.fillRect(0, 0, size, size);
  const rnd = seeded(seed * 9973);
  const w = size / cols;
  const h = size / rows;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const px = x * w + w * 0.06;
      const py = y * h + h * 0.1;
      const pw = w * 0.88;
      const ph = h * 0.8;
      a.fillStyle = glass;
      a.fillRect(px, py, pw, ph);
      if (rnd() < litShare) {
        const warm = ["#ffcf94", "#ffbe73", "#ffe2b8", "#f7a95b"][Math.floor(rnd() * 4)];
        b.globalAlpha = 0.45 + rnd() * 0.55;
        b.fillStyle = warm;
        b.fillRect(px, py, pw, ph);
      }
    }
  }
  const map = new THREE.CanvasTexture(base);
  const emissiveMap = new THREE.CanvasTexture(glow);
  map.colorSpace = emissiveMap.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = emissiveMap.anisotropy = 8;
  return new THREE.MeshStandardMaterial({ map, emissiveMap, emissive: "#ffffff", emissiveIntensity: 1.5, metalness: 0.75, roughness: 0.18 });
}

export function useFacade(cols: number, rows: number, lit: number, seed = 7) {
  return useMemo(() => facadeMaterial(cols, rows, lit, seed), [cols, rows, lit, seed]);
}

const canopyGeo = new THREE.IcosahedronGeometry(1, 3);

export function Tree({ p, h = 5, seed = 1 }: { p: V3; h?: number; seed?: number }) {
  const r = h * 0.34;
  return (
    <group position={p} rotation={[0, seed * 1.7, 0]}>
      <B p={[0, 0, 0]} s={[0.28, h * 0.55, 0.28]} m={M.trunk} />
      <mesh geometry={canopyGeo} position={[0, h * 0.72, 0]} scale={[r, r * 0.95, r]} material={M.leaf} castShadow />
      <mesh geometry={canopyGeo} position={[r * 0.55, h * 0.58, r * 0.2]} scale={r * 0.62} material={M.leaf2} castShadow />
      <mesh geometry={canopyGeo} position={[-r * 0.5, h * 0.62, -r * 0.25]} scale={r * 0.55} material={M.leaf2} castShadow />
    </group>
  );
}

export function Car({ p, r = 0, m = M.car }: { p: V3; r?: number; m?: THREE.Material }) {
  return (
    <group position={p} rotation={[0, r, 0]}>
      <B p={[0, 0.25, 0]} s={[1.8, 0.65, 4.2]} m={m} />
      <B p={[0, 0.9, -0.2]} s={[1.6, 0.55, 2.2]} m={M.glass} />
    </group>
  );
}

export function Lamp({ p }: { p: V3 }) {
  return (
    <group position={p}>
      <B p={[0, 0, 0]} s={[0.1, 3.2, 0.1]} m={M.darkMetal} shadow={false} />
      <B p={[0, 3.2, 0]} s={[0.32, 0.2, 0.32]} m={M.lit} shadow={false} />
    </group>
  );
}

/** A wall with a window opening. `axis` is the direction the wall runs in. */
export function WinWall({ c, w, h, axis, glass, wall = M.plaster, t = 0.25 }: { c: V3; w: number; h: number; axis: "x" | "z"; glass: THREE.Material; wall?: THREE.Material; t?: number }) {
  const ow = w * 0.56;
  const sill = h * 0.3;
  const head = h * 0.14;
  const oh = h - sill - head;
  const side = (w - ow) / 2;
  const at = (along: number, y: number): V3 => (axis === "x" ? [c[0] + along, c[1] + y, c[2]] : [c[0], c[1] + y, c[2] + along]);
  const sz = (len: number, hh: number, depth = t): V3 => (axis === "x" ? [len, hh, depth] : [depth, hh, len]);
  return (
    <>
      <B p={at(-(ow + side) / 2, 0)} s={sz(side, h)} m={wall} />
      <B p={at((ow + side) / 2, 0)} s={sz(side, h)} m={wall} />
      <B p={at(0, 0)} s={sz(ow, sill)} m={wall} />
      <B p={at(0, h - head)} s={sz(ow, head)} m={wall} />
      <B p={at(0, sill)} s={sz(ow, oh, t * 0.4)} m={glass} shadow={false} />
    </>
  );
}
