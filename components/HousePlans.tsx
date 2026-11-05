"use client";

import { useState } from "react";
import { plans } from "@/lib/plans";
import PlanDrawing from "./PlanDrawing";

export default function HousePlans() {
  const [index, setIndex] = useState(0);
  const plan = plans[index];

  return (
    <section id="plans">
      <div className="wrap">
        <div className="head">
          <p className="label">House plans</p>
          <h2>Single-family homes on common Hyderabad plots</h2>
          <p>Sample working layouts, with room sizes in feet, column positions and Vastu placement. We adapt the plan to your plot, family and budget.</p>
        </div>
        <div className="filters" role="group" aria-label="Choose a house plan">
          {plans.map((p, i) => (
            <button key={p.tab} type="button" aria-pressed={i === index} onClick={() => setIndex(i)}>{p.tab}</button>
          ))}
        </div>
        <div className="plan-sheet">
          <div className="plan-box"><PlanDrawing plan={plan} /></div>
          <div className="plan-info">
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
          </div>
        </div>
        <p className="credits">Areas are measured to wall centre lines. Setbacks are illustrative. These sample layouts are not for construction: every project needs site-specific structural design and a plan that follows current GHMC or HMDA rules.</p>
      </div>
    </section>
  );
}
