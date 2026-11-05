"use client";

import { useEffect, useRef, useState } from "react";

const tabs = [
  ["about", "About"],
  ["stages", "How we build"],
  ["work", "Projects"],
  ["plans", "House plans"],
  ["services", "Services"],
  ["process", "Process"],
  ["spec", "Quality"],
  ["faq", "FAQs"],
  ["contact", "Contact"],
];

export default function SectionTabs() {
  const [active, setActive] = useState("about");
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
    if (nav && link) nav.scrollTo({ left: link.offsetLeft - nav.offsetLeft - 20, behavior: "smooth" });
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
