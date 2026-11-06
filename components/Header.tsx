"use client";

import { useLenis } from "lenis/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { Logo } from "./Logo";

const LINKS = [
  ["#why", "Why SriRaja"],
  ["#explore", "Explore in 3D"],
  ["#stages", "How we build"],
  ["#plans", "House plans"],
  ["#estimate", "Cost estimator"],
  ["#work", "How we work"],
  ["#faq", "FAQs"],
  ["#gallery", "Gallery"],
  ["#contact", "Contact"],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", esc);
    };
  }, [open, lenis]);

  return (
    <>
      <header className="site-head">
        <div className="wrap">
          <button type="button" className="menu-btn" aria-expanded={open} aria-label="Open menu" onClick={() => setOpen(true)}>
            <span className="menu-word">Menu</span>
            <span className="menu-lines" aria-hidden="true"><i /><i /><i /></span>
          </button>
          <a className="logo-link" href="#home" aria-label={site.name}><Logo /></a>
          <span className="head-spacer" />
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div className="menu-overlay" role="dialog" aria-modal="true" aria-label="Site menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className="wrap menu-top">
              <button type="button" className="menu-btn" aria-label="Close menu" autoFocus onClick={() => setOpen(false)}>
                <span className="menu-word">Close</span>
                <span className="menu-x" aria-hidden="true" />
              </button>
              <Logo />
              <span className="head-spacer" />
            </div>
            <nav className="wrap menu-links" aria-label="Main">
              {LINKS.map(([href, label], i) => (
                <motion.a key={href} href={href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.06 + i * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                  {label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
