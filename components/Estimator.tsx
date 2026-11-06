"use client";

import { animate, useMotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { estimateRates } from "@/lib/site";
import { MaskedWords, Reveal } from "./Motion";

const FLOOR_OPTIONS = ["G", "G+1", "G+2", "G+3"];

/** Indian-style amount: lakh below one crore, crore above. */
function money(v: number) {
  if (v >= 1e7) return `₹${(v / 1e7).toFixed(2)} Cr`;
  return `₹${(v / 1e5).toFixed(1)} L`;
}

function Amount({ value }: { value: number }) {
  const mv = useMotionValue(value);
  const [shown, setShown] = useState(value);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const c = animate(mv, value, { duration: 0.5, ease: "easeOut", onUpdate: setShown });
    return () => c.stop();
  }, [value, mv]);
  return <>{money(shown)}</>;
}

export default function Estimator() {
  const [perFloor, setPerFloor] = useState(1200);
  const [floors, setFloors] = useState(2);
  const [tier, setTier] = useState(1);
  const total = perFloor * floors;
  const rate = estimateRates[tier];
  const low = total * rate.low;
  const high = total * rate.high;

  return (
    <section id="estimate" className="estimate">
      <div className="wrap">
        <div className="head">
                    <MaskedWords text="Get a first idea of your budget." />
          <Reveal><p>Move the controls for an instant indicative range for building an independent home.</p></Reveal>
        </div>
        <Reveal className="estimator">
          <div className="est-controls">
            <div className="est-field">
              <label htmlFor="est-area">Built-up area per floor <output>{perFloor.toLocaleString("en-IN")} sq ft</output></label>
              <input id="est-area" type="range" min={400} max={5000} step={50} value={perFloor} onChange={(e) => setPerFloor(+e.target.value)} />
            </div>
            <fieldset className="est-field">
              <legend>Floors</legend>
              <div className="chips">
                {FLOOR_OPTIONS.map((f, i) => (
                  <button key={f} type="button" aria-pressed={floors === i + 1} onClick={() => setFloors(i + 1)}>{f}</button>
                ))}
              </div>
            </fieldset>
            <fieldset className="est-field">
              <legend>Finish level</legend>
              <div className="chips">
                {estimateRates.map((r, i) => (
                  <button key={r.name} type="button" aria-pressed={tier === i} onClick={() => setTier(i)}>{r.name}</button>
                ))}
              </div>
              <p className="est-help">{rate.text}</p>
            </fieldset>
          </div>
          <div className="est-result" aria-live="polite">
            <span>Indicative construction cost</span>
            <strong><Amount value={low} /> to <Amount value={high} /></strong>
            <dl>
              <div><dt>Total built-up</dt><dd>{total.toLocaleString("en-IN")} sq ft</dd></div>
              <div><dt>Rate used</dt><dd>₹{rate.low.toLocaleString("en-IN")} to ₹{rate.high.toLocaleString("en-IN")} per sq ft</dd></div>
            </dl>
            <p>Indicative only. Excludes land, approvals, interiors, compound wall and GST. A site visit and itemised BOQ set the actual price.</p>
            <a className="btn" href="#contact"><span>Get an exact quote</span></a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
