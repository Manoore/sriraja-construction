"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { plans } from "@/lib/plans";
import { LogoMark } from "./Logo";
import { MaskedWords, Reveal } from "./Motion";
import PlanDrawing from "./PlanDrawing";

export default function HousePlans() {
  const [index, setIndex] = useState(0);
  const plan = plans[index];

  return (
    <section id="plans" className="cream">
      <div className="wrap">
        <div className="head">
          <MaskedWords text="House plans for Hyderabad plots." />
          <Reveal><p>Sample layouts with room sizes in feet, column positions and Vastu placement. We adapt each plan to your plot, family and budget.</p></Reveal>
        </div>
        <Reveal className="covers">
          {plans.map((p, i) => (
            <button key={p.tab} type="button" className="cover" aria-pressed={i === index} onClick={() => setIndex(i)}>
              <span className="cover-book">
                <LogoMark size={30} />
                <span className="cover-size">{p.cover[0]}</span>
                <span className="cover-sub">{p.cover[1]}</span>
              </span>
              <span className="cover-label">{p.title}</span>
            </button>
          ))}
        </Reveal>
        <div className="plan-sheet">
          <div className="plan-box"><PlanDrawing key={plan.tab} plan={plan} /></div>
          <AnimatePresence mode="wait">
            <motion.div key={plan.tab} className="plan-info" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <h3>{plan.title}</h3>
              <dl className="plan-facts">
                {plan.facts.map(([label, value]) => (
                  <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
                ))}
              </dl>
              <table className="sched">
                <thead>
                  <tr><th scope="col">Room</th><th scope="col">Size (ft)</th><th scope="col">Sq ft</th></tr>
                </thead>
                <tbody>
                  {plan.rooms.filter((r) => r.listed !== false).map((r) => (
                    <tr key={r.name}><td>{r.name}</td><td>{r.size}</td><td>{r.area}</td></tr>
                  ))}
                  <tr><td>Total built-up</td><td></td><td>{plan.total.toLocaleString("en-IN")}</td></tr>
                </tbody>
              </table>
              <p className="plan-vastu">{plan.vastu}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <p className="credits">Areas are measured to wall centre lines. Setbacks are illustrative. These sample layouts are not for construction: every project needs site-specific structural design and a plan that follows current GHMC or HMDA rules.</p>
      </div>
    </section>
  );
}
