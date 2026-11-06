"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { MaskedWords } from "./Motion";

const slides = [
  { src: "/images/apartment.jpg", kind: "Apartments", alt: "Modern apartment building at dusk" },
  { src: "/images/villa.jpg", kind: "Independent homes", alt: "Modern villa with a swimming pool at dusk" },
  { src: "/images/office.jpg", kind: "Commercial buildings", alt: "Modern glass office building lit at night, reflected in water" },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [auto, setAuto] = useState(true);
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);

  useEffect(() => {
    if (!auto || reduced) return;
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, [auto, reduced]);

  return (
    <div className="hero" ref={ref}>
      <motion.div className="hero-media" style={{ y: imageY }}>
        {slides.map((s, i) => (
          <div className={`slide${i === current ? " on" : ""}`} key={s.src}>
            <Image src={s.src} alt={i === current ? s.alt : ""} fill priority={i === 0} sizes="100vw" />
          </div>
        ))}
      </motion.div>
      <div className="wrap hero-body">
        <div className="hero-copy">
          <MaskedWords as="h1" text={site.name} immediate delay={0.9} />
          <motion.p className="hero-city" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }}>{site.city}</motion.p>
          <motion.ul className="hero-lines" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.35, duration: 0.8 }}>
            <li>Independent homes and villas</li>
            <li>Apartments</li>
            <li>Commercial buildings</li>
            <li>Turnkey construction</li>
          </motion.ul>
        </div>
        <motion.div className="hero-side" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 0.8 }}>
          <div className="dots" role="group" aria-label="Choose hero image">
            {slides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                aria-current={i === current}
                aria-label={`Show ${s.kind}`}
                onClick={() => {
                  setAuto(false);
                  setCurrent(i);
                }}
              />
            ))}
          </div>
          <a className="btn" href="#contact"><span>Schedule a call</span></a>
        </motion.div>
      </div>
    </div>
  );
}
