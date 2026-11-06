"use client";

import { ReactLenis } from "lenis/react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Smooth scrolling for the whole page, with anchor links offset by the sticky tabs. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  if (reduced) return <>{children}</>;
  return (
    <ReactLenis root options={{ lerp: 0.11, anchors: { offset: -56 } }}>
      {children}
    </ReactLenis>
  );
}

/** Fades and lifts content into view once. */
export function Reveal({ children, delay = 0, className, y = 28 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-8% 0px" }} transition={{ duration: 0.85, delay, ease: EASE }}>
      {children}
    </motion.div>
  );
}

/** Slides each word up from behind a mask when it enters the view. */
export function MaskedWords({ text, as: Tag = "h2", className, delay = 0, immediate = false }: { text: string; as?: "h1" | "h2"; className?: string; delay?: number; immediate?: boolean }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const seen = useInView(ref, { once: true, margin: "-8% 0px" });
  const show = immediate || seen;
  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <Fragment key={`${word}${i}`}>
          <span className="mask" aria-hidden="true">
            <motion.span initial={{ y: "112%" }} animate={show ? { y: 0 } : { y: "112%" }} transition={{ duration: 1, delay: delay + i * 0.07, ease: EASE }}>
              {word}
            </motion.span>
          </span>{" "}
        </Fragment>
      ))}
    </Tag>
  );
}

function ScrollWord({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return <motion.span style={{ opacity }}>{word} </motion.span>;
}

/** A statement whose words light up as the reader scrolls past it. */
export function ScrollStatement({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = text.split(" ");
  return (
    <p className="statement" ref={ref}>
      {words.map((w, i) => (
        <ScrollWord key={`${w}${i}`} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
      ))}
    </p>
  );
}

/** Counts up to a number when it enters the view. */
export function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLElement>(null);
  const seen = useInView(ref, { once: true });
  const value = useMotionValue(0);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!seen) return;
    const controls = animate(value, to, { duration: 1.6, ease: "easeOut", onUpdate: (v) => setShown(Math.round(v)) });
    return () => controls.stop();
  }, [seen, to, value]);

  return <b ref={ref}>{shown}</b>;
}

/** Image frame whose picture drifts slowly as the page scrolls. */
export function Parallax({ children, className, amount = 8 }: { children: ReactNode; className?: string; amount?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);
  return (
    <div ref={ref} className={className}>
      <motion.div className="parallax-inner" style={{ y }}>{children}</motion.div>
    </div>
  );
}
