"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useLenis } from "lenis/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { projects, type Project } from "@/lib/content";
import { MaskedWords, Reveal } from "./Motion";

const ViewerScene = dynamic(() => import("./three/ViewerScene"), { ssr: false });

export default function Projects() {
  const [viewing, setViewing] = useState<Project | null>(null);
  const [active, setActive] = useState(0);
  const lenis = useLenis();

  useEffect(() => {
    if (!viewing) return;
    lenis?.stop();
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setViewing(null);
    window.addEventListener("keydown", esc);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", esc);
    };
  }, [viewing, lenis]);

  return (
    <section id="explore" className="cream">
      <div className="wrap">
        <div className="head">
          <MaskedWords text="Explore every building type in 3D." />
          <Reveal><p>Choose a building type, then drag to look around its scale model.</p></Reveal>
        </div>
        <Reveal className="panels">
          {projects.map((p, i) => (
            <button
              key={p.name}
              type="button"
              className={`panel${i === active ? " on" : ""}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setViewing(p)}
              aria-label={`Open 3D model: ${p.name}`}
            >
              <Image src={p.image} alt="" fill sizes="(max-width: 760px) 100vw, 45vw" />
              <span className="panel-title">{p.name}</span>
              <span className="panel-more">
                <span>{p.text}</span>
                <span className="panel-scope">{p.scope}</span>
              </span>
              <span className="panel-play" aria-hidden="true">3D</span>
            </button>
          ))}
        </Reveal>
      </div>

      <AnimatePresence>
        {viewing && (
          <motion.div className="viewer dark" role="dialog" aria-modal="true" aria-label={`3D model of ${viewing.name}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ViewerScene name={viewing.model} />
            <div className="viewer-bar">
              <div>
                <h3>{viewing.name}</h3>
                <p>Concept scale model. Drag to rotate, scroll or pinch to zoom.</p>
              </div>
              <button type="button" className="btn" autoFocus onClick={() => setViewing(null)}><span>Close</span></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
