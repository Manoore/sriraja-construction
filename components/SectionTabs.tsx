"use client";

import { useEffect, useRef, useState } from "react";

const tabs = [
  ["why", "Why SriRaja"],
  ["explore", "Explore in 3D"],
  ["stages", "How we build"],
  ["plans", "House plans"],
  ["estimate", "Estimator"],
  ["work", "How we work"],
  ["faq", "FAQs"],
  ["gallery", "Gallery"],
  ["contact", "Contact"],
];

export default function SectionTabs() {
  const [active, setActive] = useState("why");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-35% 0px -60% 0px" },
    );
    tabs.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    const link = nav?.querySelector<HTMLElement>(`[href="#${active}"]`);
    if (nav && link && nav.scrollWidth > nav.clientWidth) {
      nav.scrollTo({ left: link.offsetLeft - nav.offsetLeft - 20, behavior: "smooth" });
    }
  }, [active]);

  return (
    <div className="tabs">
      <div className="wrap">
        <nav aria-label="Page sections" ref={navRef}>
          {tabs.map(([id, label]) => (
            <a key={id} href={`#${id}`} aria-current={active === id}>{label}</a>
          ))}
        </nav>
      </div>
    </div>
  );
}
