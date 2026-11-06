"use client";

import Image from "next/image";
import { useRef } from "react";
import { credits, projects } from "@/lib/content";
import { MaskedWords } from "./Motion";

export default function Gallery() {
  const strip = useRef<HTMLDivElement>(null);
  const move = (dir: number) => strip.current?.scrollBy({ left: dir * strip.current.clientWidth * 0.7, behavior: "smooth" });

  return (
    <section id="gallery" className="cream gallery">
      <div className="wrap">
        <div className="head">
          <MaskedWords text="Designed around the way you live." />
        </div>
      </div>
      <div className="strip" ref={strip} tabIndex={0} role="region" aria-label="Image gallery">
        {projects.map((p) => (
          <figure key={p.name}>
            <Image src={p.image} alt={`${p.imageKind}: ${p.name}`} fill sizes="(max-width: 760px) 80vw, 34vw" />
            <figcaption>{p.name}</figcaption>
          </figure>
        ))}
      </div>
      <div className="wrap">
        <div className="carousel-controls strip-controls">
          <button type="button" aria-label="Scroll gallery left" onClick={() => move(-1)}>
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button type="button" aria-label="Scroll gallery right" onClick={() => move(1)}>
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
        <p className="credits center">
          Images show building types, not completed SriRaja projects. Photos are CC0 images by{" "}
          {credits.map((c, i) => <span key={c.href}><a href={c.href}>{c.label}</a>{i < credits.length - 1 ? " and " : "."}</span>)}
        </p>
      </div>
    </section>
  );
}
