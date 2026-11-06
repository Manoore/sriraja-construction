"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";

const BuildScene = dynamic(() => import("./three/BuildScene"), { ssr: false });

const STAGES = [
  ["Bhoomi puja", "Site surveyed, boundaries pegged and soil samples taken. Work begins on the date you choose."],
  ["Foundation", "Excavation to the depth the soil report calls for. RCC footings cast and cured."],
  ["Plinth", "Plinth beams tie the footings together. Anti-termite treatment and a damp-proof course go in before filling."],
  ["RCC frame", "Columns and slabs rise floor by floor. Concrete cubes go for testing from each pour."],
  ["Brickwork", "Walls and lintels go up, with electrical and plumbing conduits laid while the scaffold stands."],
  ["Finishes", "Plaster, waterproofing, flooring, windows and paint. Parapet and terrace tanks complete."],
  ["Griha pravesh", "Final inspection done, snag list cleared, keys and documents handed over. Your family moves in."],
];

export default function BuildStages() {
  const section = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [stage, setStage] = useState(0);
  const [mount3D, setMount3D] = useState(false);
  const [webgl, setWebgl] = useState(true);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 70, damping: 22, mass: 0.4 });

  useMotionValueEvent(smooth, "change", (v) => {
    if (!Number.isFinite(v)) return;
    progress.current = Math.max(0, Math.min(1, v * 1.03));
    setStage(Math.min(STAGES.length - 1, Math.floor(progress.current * STAGES.length)));
  });

  /* Load the 3D scene shortly before it scrolls into view. */
  useEffect(() => {
    const c = document.createElement("canvas");
    setWebgl(Boolean(c.getContext("webgl2") || c.getContext("webgl")));
    if (!section.current) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setMount3D(true), { rootMargin: "120% 0px" });
    io.observe(section.current);
    return () => io.disconnect();
  }, []);

  const jumpTo = (i: number) => {
    const el = section.current;
    if (!el) return;
    const distance = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: el.offsetTop + distance * ((i + 0.55) / STAGES.length), behavior: "smooth" });
  };

  return (
    <section id="stages" className="dark build" ref={section}>
      <div className="build-pin">
        {webgl ? (
          mount3D && <BuildScene progress={progress} />
        ) : (
          <Image src="/renders/apartment.jpg" alt="Scale model of a finished apartment block" fill sizes="100vw" className="build-fallback" />
        )}
        <div className="wrap build-overlay">
          <div className="build-copy">
            <p className="label">How we build</p>
            <h2>From <em>bhoomi puja</em> to <em>griha pravesh</em></h2>
            <div className="build-note" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div key={stage} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                  <span className="build-count">{`Stage ${stage + 1} of ${STAGES.length}`}</span>
                  <h3>{STAGES[stage][0]}</h3>
                  <p>{STAGES[stage][1]}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <ol className="build-rail" aria-label="Construction stages">
            {STAGES.map(([name], i) => (
              <li key={name}>
                <button type="button" className={i <= stage ? "done" : undefined} aria-current={i === stage ? "step" : undefined} aria-label={`Go to ${name}`} onClick={() => jumpTo(i)}>
                  <b>{i + 1}</b>
                  <span>{name}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
