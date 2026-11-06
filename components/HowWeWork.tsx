"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { services, spec, steps } from "@/lib/content";
import { MaskedWords } from "./Motion";

const TABS = ["Services", "Process", "Quality"] as const;

export default function HowWeWork() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Services");

  return (
    <section id="work">
      <div className="wrap">
        <div className="head">
          <MaskedWords text="How we work with you." />
        </div>
        <div className="pill-tabs" role="tablist" aria-label="How we work">
          {TABS.map((t) => (
            <button key={t} type="button" role="tab" aria-selected={tab === t} onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>
        <div className="pill-panel" role="tabpanel" aria-label={tab}>
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              {tab === "Services" && (
                <ul className="service-list">
                  {services.map((s) => (
                    <li key={s.name}>
                      <h3>{s.name}</h3>
                      <p>{s.text}</p>
                      <p className="scope">{s.scope}</p>
                    </li>
                  ))}
                </ul>
              )}
              {tab === "Process" && (
                <ol className="steps">
                  {steps.map((s, i) => (
                    <li key={s.name}>
                      <span className="n">{`0${i + 1}`}</span>
                      <h3>{s.name}</h3>
                      <p>{s.text}</p>
                    </li>
                  ))}
                </ol>
              )}
              {tab === "Quality" && (
                <table className="spec">
                  <thead>
                    <tr><th scope="col">Item</th><th scope="col">Standard</th><th scope="col">How we check it</th></tr>
                  </thead>
                  <tbody>
                    {spec.map(([item, standard, check]) => (
                      <tr key={item}><th scope="row">{item}</th><td>{standard}</td><td>{check}</td></tr>
                    ))}
                  </tbody>
                </table>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
