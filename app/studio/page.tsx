"use client";

import dynamic from "next/dynamic";

const Studio = dynamic(() => import("@/components/three/Studio"), { ssr: false });

/** Internal page for generating renders with scripts/render-stills.mjs. */
export default function StudioPage() {
  return <Studio />;
}
