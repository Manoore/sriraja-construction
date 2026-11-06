"use client";

import { Fragment, useContext, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { B, Car, Lamp, M, Part, Progress, T, Tree, WinWall, useFacade } from "./kit";

/* ---------- Five-storey apartment block, assembled by build progress ---------- */

const FLOOR_H = 3.2;
const PLINTH = 0.6;
const COL_X = [-12, -6, 0, 6, 12];
const COL_Z = [-7, 0, 7];
const FLOORS = 5;
const y = (f: number) => PLINTH + f * FLOOR_H;
const TOP = y(FLOORS);

export function Apartment() {
  const progress = useContext(Progress);
  useFrame(() => {
    const p = progress?.current ?? 1;
    M.litBuild.emissiveIntensity = THREE.MathUtils.smoothstep(p, T(6), 1) * 1.1;
  });

  const floorSpan = (stage: number, f: number, of = FLOORS): [number, number] => {
    const a = T(stage) + (f / of) * (T(1) * 0.9);
    return [a, a + T(1) * 0.35];
  };

  return (
    <group>
      {/* Bhoomi puja: pegs, string line and marigolds */}
      <Part t={[0, T(0.4)]} out={T(1.6)}>
        {[[-13, -8], [13, -8], [-13, 8], [13, 8]].map(([x, z]) => <B key={`${x}${z}`} p={[x, 0, z]} s={[0.14, 1, 0.14]} m={M.bamboo} />)}
        <B p={[0, 0.82, 8]} s={[26, 0.03, 0.03]} m={M.gold} shadow={false} />
        <B p={[0, 0.82, -8]} s={[26, 0.03, 0.03]} m={M.gold} shadow={false} />
        <B p={[-13, 0.82, 0]} s={[0.03, 0.03, 16]} m={M.gold} shadow={false} />
        <B p={[13, 0.82, 0]} s={[0.03, 0.03, 16]} m={M.gold} shadow={false} />
        {Array.from({ length: 9 }, (_, i) => <mesh key={i} position={[-1.6 + i * 0.4, 0.14, 8.8]} material={M.marigold}><sphereGeometry args={[0.15, 10, 10]} /></mesh>)}
      </Part>

      {/* Foundation: excavated earth and footings */}
      <Part t={[T(1), T(1.5)]} out={T(3)}>
        <B p={[-18, 0, 4]} s={[5, 1.3, 7]} m={M.soil} />
        <B p={[18, 0, -3]} s={[4, 1, 6]} m={M.soil} />
      </Part>
      <Part t={[T(1), T(1.9)]} out={T(2.6)}>
        <B p={[0, 0, 0]} s={[26, 0.08, 16]} m={M.soil} shadow={false} />
      </Part>
      <Part t={[T(1.2), T(1.9)]}>
        {COL_X.map((x) => COL_Z.map((z) => (
          <Fragment key={`${x}${z}`}>
            <B p={[x, 0, z]} s={[2, 0.35, 2]} m={M.footing} />
            <B p={[x, 0.35, z]} s={[0.55, 0.4, 0.55]} m={M.concrete} />
          </Fragment>
        )))}
      </Part>

      {/* Plinth */}
      <Part t={[T(2), T(2.7)]}>
        <B p={[0, 0, 0]} s={[25, PLINTH, 15]} m={M.concrete} />
      </Part>

      {/* RCC frame, floor by floor */}
      {Array.from({ length: FLOORS }, (_, f) => (
        <Part key={f} t={floorSpan(3, f)}>
          {COL_X.map((x) => COL_Z.map((z) => <B key={`${x}${z}`} p={[x, y(f), z]} s={[0.5, FLOOR_H, 0.5]} m={M.concrete} />))}
          <B p={[0, y(f + 1) - 0.25, 0]} s={[25, 0.3, 15]} m={M.concrete} />
        </Part>
      ))}

      {/* Bamboo scaffold */}
      <Part t={[T(3), T(3.8)]} out={T(5.2)}>
        {[-14.2, -13, 13, 14.2].map((x) => [-8, 0, 8].map((z) => <B key={`${x}${z}`} p={[x, 0, z]} s={[0.1, TOP + 2, 0.1]} m={M.bamboo} />))}
        {Array.from({ length: 7 }, (_, i) => (
          <Fragment key={i}>
            <B p={[-13.6, 1.6 + i * 2.4, 0]} s={[1.5, 0.07, 16.4]} m={M.bamboo} />
            <B p={[13.6, 1.6 + i * 2.4, 0]} s={[1.5, 0.07, 16.4]} m={M.bamboo} />
          </Fragment>
        ))}
      </Part>

      {/* Brickwork */}
      {Array.from({ length: FLOORS - 1 }, (_, i) => {
        const f = i + 1;
        return (
          <Part key={f} t={floorSpan(4, i, FLOORS - 1)} out={T(5.75)}>
            <B p={[0, y(f), 7]} s={[24, FLOOR_H - 0.25, 0.25]} m={M.brick} />
            <B p={[0, y(f), -7]} s={[24, FLOOR_H - 0.25, 0.25]} m={M.brick} />
            <B p={[-12, y(f), 0]} s={[0.25, FLOOR_H - 0.25, 14]} m={M.brick} />
            <B p={[12, y(f), 0]} s={[0.25, FLOOR_H - 0.25, 14]} m={M.brick} />
          </Part>
        );
      })}

      {/* Finishes: plaster, windows, balconies */}
      {Array.from({ length: FLOORS - 1 }, (_, i) => {
        const f = i + 1;
        return (
          <Part key={f} t={floorSpan(5, i, FLOORS - 1)}>
            {[-9, -3, 3, 9].map((x, b) => {
              const litHere = (f + b) % 3 !== 0;
              const glass = litHere ? M.litBuild : M.glass;
              const balcony = b === 1 || b === 2;
              return (
                <Fragment key={x}>
                  {balcony ? (
                    <>
                      <B p={[x, y(f), 7.05]} s={[5.75, FLOOR_H - 0.25, 0.25]} m={glass} shadow={false} />
                      <B p={[x, y(f) - 0.04, 8.25]} s={[6, 0.22, 2.6]} m={M.plaster} />
                      <B p={[x, y(f) + 0.18, 9.45]} s={[6, 1.05, 0.05]} m={M.railGlass} shadow={false} />
                      <B p={[x - 3, y(f), 8.3]} s={[0.22, FLOOR_H, 2.5]} m={M.wood} />
                      <B p={[x + 3, y(f), 8.3]} s={[0.22, FLOOR_H, 2.5]} m={M.wood} />
                    </>
                  ) : (
                    <WinWall c={[x, y(f), 7.2]} w={5.75} h={FLOOR_H - 0.25} axis="x" glass={glass} />
                  )}
                  <WinWall c={[x, y(f), -7.2]} w={5.75} h={FLOOR_H - 0.25} axis="x" glass={(f + b) % 2 ? M.litBuild : M.glass} />
                </Fragment>
              );
            })}
            {[-3.5, 3.5].map((z, b) => (
              <Fragment key={z}>
                <WinWall c={[-12.2, y(f), z]} w={6.9} h={FLOOR_H - 0.25} axis="z" glass={(f + b) % 2 ? M.litBuild : M.glass} />
                <WinWall c={[12.2, y(f), z]} w={6.9} h={FLOOR_H - 0.25} axis="z" glass={(f + b + 1) % 2 ? M.litBuild : M.glass} />
              </Fragment>
            ))}
            <B p={[0, y(f + 1) - 0.32, 7.45]} s={[24.8, 0.34, 0.5]} m={M.plaster} />
          </Part>
        );
      })}

      {/* Ground floor lobby, roof, parapet and tanks */}
      <Part t={[T(5), T(5.9)]}>
        <B p={[0, y(0), 2]} s={[10, FLOOR_H - 0.3, 8]} m={M.litBuild} shadow={false} />
        <B p={[0, y(1) - 0.2, 8.4]} s={[12, 0.25, 3]} m={M.wood} />
        <B p={[0, TOP, 0]} s={[25.4, 1, 15.4]} m={M.plaster} />
        <B p={[0, TOP + 1, 0]} s={[24.4, 0.05, 14.4]} m={M.concrete} shadow={false} />
        <B p={[-3, TOP + 1, -2]} s={[7, 3, 5]} m={M.plaster} />
        <B p={[-3, TOP + 4, -2]} s={[7.6, 0.25, 5.6]} m={M.wood} />
        {[-5, -1.5].map((x) => <mesh key={x} position={[x, TOP + 4.9, -2]} material={M.tank} castShadow><cylinderGeometry args={[0.8, 0.8, 1.3, 16]} /></mesh>)}
      </Part>

      {/* Griha pravesh: garden, cars and a marigold toran */}
      <Part t={[T(5.9), T(6.6)]}>
        <B p={[0, 0, 19]} s={[34, 0.06, 18]} m={M.paving} shadow={false} />
        <B p={[-22, 0, 8]} s={[10, 0.1, 34]} m={M.grass} shadow={false} />
        <B p={[22, 0, 8]} s={[10, 0.1, 34]} m={M.grass} shadow={false} />
        {[[-21, 18, 7], [-23, 6, 6], [22, 16, 7], [23, 4, 6], [-19, -5, 8], [20, -8, 7]].map(([x, z, h], i) => <Tree key={i} p={[x, 0, z]} h={h} seed={i + 1} />)}
        {[-10, 10, -14, 14].map((x) => <Lamp key={x} p={[x, 0, 22]} />)}
        <Car p={[-9, PLINTH, 4]} />
        <Car p={[8, PLINTH, 3]} m={M.steelSheet} />
      </Part>
      <Part t={[T(6.4), T(6.9)]}>
        {Array.from({ length: 25 }, (_, i) => {
          const u = i / 24;
          return <mesh key={i} position={[-5.4 + u * 10.8, y(1) - 0.75 - 1.2 * 4 * u * (1 - u) * 0.6, 9.9]} material={M.marigold}><sphereGeometry args={[0.13, 8, 8]} /></mesh>;
        })}
      </Part>
    </group>
  );
}

/* ---------- Modern family villa ---------- */

export function Villa() {
  return (
    <group>
      <B p={[0, 0, 4]} s={[44, 0.05, 40]} m={M.grass} shadow={false} />
      <B p={[-4, 0, 11]} s={[6, 0.08, 16]} m={M.paving} shadow={false} />
      {/* Ground volume */}
      <B p={[1, 0, 0]} s={[20, 0.4, 12]} m={M.stone} />
      <B p={[-2, 0.4, -1]} s={[11, 3.2, 9]} m={M.lit} shadow={false} />
      {Array.from({ length: 7 }, (_, i) => <B key={i} p={[-7.3 + i * 1.8, 0.4, 3.58]} s={[0.1, 3.2, 0.1]} m={M.darkMetal} shadow={false} />)}
      <B p={[-2, 3.5, 3.6]} s={[11, 0.1, 0.1]} m={M.darkMetal} shadow={false} />
      <B p={[8, 0.4, -1]} s={[9, 3.2, 9]} m={M.stone} />
      <B p={[10, 1.2, 3.55]} s={[3, 1.6, 0.1]} m={M.lit} shadow={false} />
      {/* Roof slab with overhang */}
      <B p={[1.5, 3.6, 0.5]} s={[24, 0.3, 14]} m={M.plaster} />
      {/* Upper cantilevered volume */}
      <B p={[3.5, 3.9, -1]} s={[15, 3.1, 10]} m={M.plaster} />
      <B p={[3.5, 4.5, 4.05]} s={[9, 2, 0.1]} m={M.lit} shadow={false} />
      {Array.from({ length: 22 }, (_, i) => <B key={i} p={[-3.6 + i * 0.32 + 7.1 * 0, 3.9, 4.25]} s={[0.1, 3.1, 0.14]} m={M.wood} />)}
      <B p={[3.5, 7, -0.6]} s={[17, 0.28, 12]} m={M.darkMetal} />
      {/* Terrace rail */}
      <B p={[-6.4, 3.9, 5]} s={[0.05, 1.05, 4]} m={M.railGlass} shadow={false} />
      <B p={[-8.4, 3.9, 7]} s={[4, 1.05, 0.05]} m={M.railGlass} shadow={false} />
      {/* Pool and deck */}
      <B p={[5, 0, 11]} s={[16, 0.25, 10]} m={M.wood} />
      <B p={[6, 0.21, 11]} s={[12, 0.06, 6]} m={M.water} shadow={false} />
      {/* Compound wall */}
      {[-20, 20].map((x) => <B key={x} p={[x, 0, 4]} s={[0.3, 1.6, 40]} m={M.stone} />)}
      <B p={[-12.5, 0, 24]} s={[15, 1.6, 0.3]} m={M.stone} />
      <B p={[12.5, 0, 24]} s={[15, 1.6, 0.3]} m={M.stone} />
      <Tree p={[-17, 0, 2]} h={7} seed={-15} />
      <Tree p={[17, 0, 18]} h={7} seed={15} />
      <Tree p={[-14, 0, -6]} h={8} seed={3} />
      <Tree p={[16, 0, -8]} h={9} seed={5} />
      <Car p={[-4, 0.08, 8]} r={0} />
      <Lamp p={[-8, 0, 15]} />
      <Lamp p={[0, 0, 19]} />
    </group>
  );
}

/* ---------- Commercial office, G+6 ---------- */

export function Office() {
  const facade = useFacade(14, 7, 0.62, 3);
  return (
    <group>
      <B p={[0, 0, 12]} s={[70, 0.06, 40]} m={M.paving} shadow={false} />
      <B p={[0, 0, 0]} s={[36, 4.4, 24]} m={M.stone} />
      <B p={[0, 0.8, 12.05]} s={[20, 3.4, 0.1]} m={M.lit} shadow={false} />
      <B p={[0, 4.2, 14]} s={[24, 0.3, 6]} m={M.gold} />
      {[-10, 10].map((x) => <B key={x} p={[x, 0, 16.5]} s={[0.35, 4.2, 0.35]} m={M.gold} />)}
      <B p={[0, 4.4, 0]} s={[30, 25.2, 20]} m={facade} />
      {Array.from({ length: 16 }, (_, i) => <B key={i} p={[-15 + i * 2, 4.4, 10.2]} s={[0.16, 25.2, 0.5]} m={M.gold} />)}
      <B p={[0, 29.6, 0]} s={[31, 0.5, 21]} m={M.plaster} />
      <B p={[-6, 30.1, -2]} s={[9, 3, 7]} m={M.concrete} />
      {[-26, 26, -30, 30].map((x, i) => <Tree key={x} p={[x, 0, 17 - i * 6]} h={8} seed={i} />)}
      {[-20, -14, 14, 20].map((x) => <Lamp key={x} p={[x, 0, 26]} />)}
      {[-19, -15, 15, 19].map((x, i) => <Car key={x} p={[x, 0.06, 20]} m={i % 2 ? M.steelSheet : M.car} />)}
    </group>
  );
}

/* ---------- Shop-and-flat building, G+3 ---------- */

export function ShopFlat() {
  return (
    <group>
      <B p={[0, 0, 8]} s={[50, 0.06, 26]} m={M.paving} shadow={false} />
      <B p={[0, 0, 0]} s={[22, 4.2, 14]} m={M.darkMetal} />
      {[-7.2, 0, 7.2].map((x) => (
        <Fragment key={x}>
          <B p={[x, 0.3, 7.05]} s={[6.4, 3.1, 0.1]} m={M.lit} shadow={false} />
          <B p={[x, 3.4, 8]} s={[6.8, 0.15, 2]} m={M.gold} />
        </Fragment>
      ))}
      {[0, 1, 2].map((f) => (
        <Fragment key={f}>
          <B p={[0, 4.2 + f * 3.2, 0]} s={[22, 3, 14]} m={M.plaster} />
          {[-7.2, 0, 7.2].map((x, b) => (
            <Fragment key={x}>
              <B p={[x, 5 + f * 3.2, 7.03]} s={[4.2, 1.7, 0.08]} m={(f + b) % 2 ? M.lit : M.glass} shadow={false} />
              <B p={[x, 4.3 + f * 3.2, 7.8]} s={[5.4, 0.15, 1.6]} m={M.plaster} />
              <B p={[x, 4.45 + f * 3.2, 8.55]} s={[5.4, 0.9, 0.05]} m={M.railGlass} shadow={false} />
            </Fragment>
          ))}
          <B p={[0, 7 + f * 3.2, 0]} s={[22.6, 0.22, 14.6]} m={M.wood} />
        </Fragment>
      ))}
      <B p={[0, 13.8, 0]} s={[22.6, 0.9, 14.6]} m={M.plaster} />
      <Car p={[-6, 0.06, 13]} r={Math.PI / 2} />
      <Car p={[6, 0.06, 14]} r={Math.PI / 2} m={M.steelSheet} />
      <Tree p={[-16, 0, 8]} h={7} seed={2} />
      <Tree p={[16, 0, 9]} h={6} seed={4} />
      <Lamp p={[0, 0, 15]} />
    </group>
  );
}

/* ---------- School block, G+2 ---------- */

export function School() {
  return (
    <group>
      <B p={[0, 0, 12]} s={[80, 0.05, 44]} m={M.grass} shadow={false} />
      <B p={[0, 0, 18]} s={[30, 0.08, 16]} m={M.terracotta} shadow={false} />
      {[0, 1, 2].map((f) => (
        <Fragment key={f}>
          <B p={[0, f * 3.6, -2]} s={[50, 3.4, 8]} m={M.plaster} />
          <B p={[0, f * 3.6 + 3.3, 1]} s={[50, 0.25, 4]} m={M.plaster} />
          {Array.from({ length: 13 }, (_, i) => {
            const x = -24 + i * 4;
            return (
              <Fragment key={x}>
                <B p={[x, f * 3.6, 2.7]} s={[0.35, 3.4, 0.35]} m={M.terracotta} />
                {i < 12 && Math.abs(x + 2) > 3 && <B p={[x + 2, f * 3.6 + 1, 2.03]} s={[2.4, 1.6, 0.06]} m={(f + i) % 3 ? M.lit : M.glass} shadow={false} />}
              </Fragment>
            );
          })}
          {f > 0 && <B p={[0, f * 3.6, 2.9]} s={[50, 1, 0.1]} m={M.terracotta} />}
        </Fragment>
      ))}
      <B p={[0, 0, 1]} s={[10, 13.2, 10]} m={M.stone} />
      <B p={[0, 3, 6.03]} s={[5, 8, 0.1]} m={M.lit} shadow={false} />
      <B p={[0, 13.2, 1]} s={[11, 0.4, 11]} m={M.terracotta} />
      <B p={[0, 10.8, -2]} s={[51, 0.4, 13]} m={M.terracotta} />
      <B p={[-20, 0, 18]} s={[0.12, 9, 0.12]} m={M.steelSheet} />
      {[-34, 34, -36, 36].map((x, i) => <Tree key={x} p={[x, 0, 6 + i * 4]} h={9} seed={i} />)}
      <Lamp p={[-10, 0, 27]} />
      <Lamp p={[10, 0, 27]} />
    </group>
  );
}

/* ---------- Pre-engineered warehouse ---------- */

export function Warehouse() {
  const gable = useMemo(() => {
    const w = 25;
    const s = new THREE.Shape();
    s.moveTo(-w, 0);
    s.lineTo(-w, 9);
    s.lineTo(0, 12);
    s.lineTo(w, 9);
    s.lineTo(w, 0);
    s.closePath();
    return new THREE.ExtrudeGeometry(s, { depth: 40, bevelEnabled: false });
  }, []);
  return (
    <group>
      <B p={[0, 0, 12]} s={[90, 0.05, 80]} m={M.paving} shadow={false} />
      <mesh geometry={gable} position={[0, 0, -30]} material={M.steelSheet} castShadow receiveShadow />
      <B p={[0, 0, 10.02]} s={[50.4, 2.2, 0.1]} m={M.steelBlue} />
      {Array.from({ length: 26 }, (_, i) => <B key={i} p={[-25 + i * 2, 2.2, 10.03]} s={[0.1, 6.7 + (1 - Math.abs(-25 + i * 2) / 25) * 3, 0.1]} m={M.steelBlue} shadow={false} />)}
      {[-15, -5, 5, 15].map((x, i) => (
        <Fragment key={x}>
          <B p={[x, 0, 10.1]} s={[6, 5.4, 0.1]} m={i === 1 ? M.lit : M.darkMetal} />
          <B p={[x, 5.5, 11]} s={[7.5, 0.18, 2]} m={M.gold} />
        </Fragment>
      ))}
      <B p={[0, 12, -10]} s={[10, 0.7, 36]} m={M.steelBlue} />
      <group position={[-5, 0, 18]}>
        <B p={[0, 0.5, -1]} s={[2.8, 3.2, 8]} m={M.plaster} />
        <B p={[0, 0.5, 4]} s={[2.6, 2.4, 2]} m={M.steelBlue} />
      </group>
      {[-36, 36].map((x, i) => <Tree key={x} p={[x, 0, 12]} h={9} seed={i} />)}
      {[-24, 0, 24].map((x) => <Lamp key={x} p={[x, 0, 34]} />)}
    </group>
  );
}

export const MODELS = {
  apartment: { Model: Apartment, camera: [-34, 15, 50], target: [0, 9, 3] },
  villa: { Model: Villa, camera: [-27, 10, 33], target: [1, 3.8, 2] },
  office: { Model: Office, camera: [-42, 16, 58], target: [0, 14, 3] },
  shops: { Model: ShopFlat, camera: [-26, 9, 36], target: [0, 7, 2] },
  school: { Model: School, camera: [-42, 14, 54], target: [0, 6, 2] },
  warehouse: { Model: Warehouse, camera: [-46, 15, 58], target: [0, 5, 2] },
} as const;

export type ModelName = keyof typeof MODELS;
