"use client";

import Image from "next/image";
import { useState } from "react";
import { credits, projects } from "@/lib/content";
import { drawings } from "./ProjectDrawings";

const CATEGORIES = ["All", "Residential", "Commercial", "Institutional", "Industrial"];

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const shown = projects.filter((p) => filter === "All" || p.category === filter);

  return (
    <section id="work" className="cream">
      <div className="wrap">
        <div className="head">
          <p className="label">Projects</p>
          <h2>Buildings of every size, finished with care</h2>
          <p>These six projects are samples. The three photos are licensed stock images of other builders&apos; work, and the drawings show the remaining building types.</p>
        </div>
        <div className="filters" role="group" aria-label="Filter projects by type">
          {CATEGORIES.map((c) => (
            <button key={c} type="button" aria-pressed={filter === c} onClick={() => setFilter(c)}>{c}</button>
          ))}
        </div>
        <div className="work">
          {shown.map((p) => {
            const Drawing = p.drawing ? drawings[p.drawing] : null;
            return (
              <article className="card" key={p.name}>
                <div className="photo">
                  {p.photo ? (
                    <Image src={p.photo} alt={`Photo representing a ${p.name.toLowerCase()}`} fill sizes="(max-width: 600px) 100vw, (max-width: 940px) 50vw, 33vw" />
                  ) : (
                    Drawing && <Drawing />
                  )}
                  {p.stock && <span className="stock-tag">Stock photo, not our project</span>}
                </div>
                <div>
                  <p className="cat">{p.category}</p>
                  <h3>{p.name}</h3>
                  <p className="where">{p.place}</p>
                  <dl>
                    <div><dt>Sq ft</dt><dd>{p.area}</dd></div>
                    <div><dt>Floors</dt><dd>{p.floors}</dd></div>
                    <div><dt>Build</dt><dd>{p.time}</dd></div>
                  </dl>
                </div>
              </article>
            );
          })}
        </div>
        <p className="credits">
          Stock photos:{" "}
          {credits.map((c) => (
            <span key={c.href}>
              <a href={c.href}>{c.label}</a> by {c.author}, <a href={c.licenseHref}>{c.license}</a>{c.note}.{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
