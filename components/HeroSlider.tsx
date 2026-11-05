"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const slides = [
  { src: "/images/five-storey.jpg", alt: "Stock photo of a residential apartment building" },
  { src: "/images/house.jpg", alt: "Stock photo of a brick and stone family house" },
  { src: "/images/commercial.jpg", alt: "Stock photo of a commercial office campus" },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5500);
    return () => clearInterval(timer);
  }, [auto]);

  return (
    <div className="hero">
      {slides.map((s, i) => (
        <div className={`slide${i === current ? " on" : ""}`} key={s.src}>
          <Image src={s.src} alt={i === current ? s.alt : ""} fill priority={i === 0} sizes="100vw" />
        </div>
      ))}
      <span className="stock-tag">Stock photo, not our project</span>
      <div className="wrap hero-body">
        <h1>{site.name}</h1>
        <p className="where">{site.city}</p>
        <div className="hero-foot">
          <p>Homes, apartments and commercial buildings. One team takes your project from soil test to handover.</p>
          <div className="hero-side">
            <div className="dots" role="group" aria-label="Choose hero photo">
              {slides.map((s, i) => (
                <button
                  key={s.src}
                  type="button"
                  aria-current={i === current}
                  aria-label={`Show photo ${i + 1}`}
                  onClick={() => {
                    setAuto(false);
                    setCurrent(i);
                  }}
                >
                  {`0${i + 1}`}
                </button>
              ))}
            </div>
            <a className="btn" href="#contact">Schedule a call</a>
          </div>
        </div>
      </div>
    </div>
  );
}
