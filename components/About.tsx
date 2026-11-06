"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { MaskedWords, Reveal } from "./Motion";

const SLIDES = [
  { image: "/images/apartment.jpg", title: "One accountable team", text: "You deal with the people responsible for your site, from the first estimate to the day you collect your keys. Drawings, approvals and construction stay under one roof." },
  { image: "/images/facade.jpg", title: "Tested, not assumed", text: "Every project starts with a soil test. Concrete cubes are tested at 7 and 28 days, and a structural engineer signs off on the design." },
  { image: "/images/office.jpg", title: "Costs you can follow", text: "An itemised bill of quantities sets out materials and brands in writing. Payments follow construction stages, with a site update each week." },
];

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path d={direction === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Centred introduction shown directly below the hero, above the section tabs. */
export function Intro() {
  return (
    <div className="intro">
      <Reveal className="wrap">
        <p>A home or building reflects everything you value: your family, your work and your future. {site.name} builds homes, apartments and commercial buildings across Hyderabad, with care in every stage from foundation to finish.</p>
        <p className="intro-strong">Build it once. Build it right.</p>
      </Reveal>
    </div>
  );
}

export default function About() {
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(true);
  const reduced = useReducedMotion();
  const slide = SLIDES[index];
  const go = (next: number) => {
    setAuto(false);
    setIndex((next + SLIDES.length) % SLIDES.length);
  };

  useEffect(() => {
    if (!auto || reduced) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 6500);
    return () => clearInterval(t);
  }, [auto, reduced]);

  return (
    <section id="why">
      <div className="wrap">
        <div className="head">
          <MaskedWords text="Why families and businesses build with us." />
        </div>
        <div className="carousel" role="group" aria-roledescription="carousel" aria-label="Reasons to build with SriRaja">
          <div className="carousel-frame">
            <AnimatePresence initial={false}>
              <motion.div key={slide.image} className="carousel-slide" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
                <Image src={slide.image} alt="" fill sizes="(max-width: 1200px) 100vw, 1160px" />
                <h3>{slide.title}</h3>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="carousel-controls">
            <button type="button" aria-label="Previous" onClick={() => go(index - 1)}><Arrow direction="left" /></button>
            <div className="carousel-dots">
              {SLIDES.map((s, i) => <button key={s.title} type="button" aria-label={`Show ${s.title}`} aria-current={i === index} onClick={() => go(i)} />)}
            </div>
            <button type="button" aria-label="Next" onClick={() => go(index + 1)}><Arrow direction="right" /></button>
          </div>
          <AnimatePresence mode="wait">
            <motion.p key={slide.title} className="carousel-text" aria-live={auto ? "off" : "polite"} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              {slide.text}
            </motion.p>
          </AnimatePresence>
          <p className="carousel-facts">7 construction stages | 28-day cube tests | 5 types of building work</p>
        </div>
      </div>
    </section>
  );
}
