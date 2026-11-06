import type { ModelName } from "@/components/three/Models";

export type Project = {
  category: "Residential" | "Commercial" | "Institutional" | "Industrial";
  name: string;
  text: string;
  scope: string;
  image: string;
  imageKind: "Representative photo" | "Concept model";
  model: ModelName;
};

export const projects: Project[] = [
  { category: "Residential", name: "Independent home", text: "Custom family homes and villas, planned around your plot and lifestyle.", scope: "Ground to G+3", image: "/images/villa.jpg", imageKind: "Representative photo", model: "villa" },
  { category: "Residential", name: "Five-storey apartment block", text: "Efficient, well-lit apartment buildings for landowners and developers.", scope: "G+4 and above", image: "/images/apartment.jpg", imageKind: "Representative photo", model: "apartment" },
  { category: "Commercial", name: "Commercial office", text: "Office buildings with structure, facade and services coordinated from day one.", scope: "RCC frame, facade, MEP", image: "/images/office.jpg", imageKind: "Representative photo", model: "office" },
  { category: "Commercial", name: "Shop-and-flat building", text: "Street-level shops with homes above, a practical choice for main-road plots.", scope: "G+2 to G+4", image: "/renders/shops.jpg", imageKind: "Concept model", model: "shops" },
  { category: "Institutional", name: "School block", text: "Bright classrooms and open corridors, phased around the academic calendar.", scope: "G to G+3", image: "/renders/school.jpg", imageKind: "Concept model", model: "school" },
  { category: "Industrial", name: "Pre-engineered warehouse", text: "Fast-build steel sheds with loading docks and clear internal spans.", scope: "PEB and RCC", image: "/renders/warehouse.jpg", imageKind: "Concept model", model: "warehouse" },
];

export const services = [
  { name: "Independent homes and villas", text: "Custom houses on your plot, from the first floor plan to the final coat of paint. Vastu-aligned layouts on request.", scope: "Ground to G+3. Turnkey or labour-and-material." },
  { name: "Apartments and group housing", text: "Stilt-plus-floors blocks for landowners and developers, including joint development projects.", scope: "S+3 and above. TG RERA documentation support." },
  { name: "Commercial buildings", text: "Offices, showrooms and shop-and-flat buildings, with electrical, plumbing and fire services coordinated from the start.", scope: "RCC frame, facade, MEP." },
  { name: "Institutional and industrial", text: "Schools, clinics, warehouses and factory sheds, built around your operating calendar.", scope: "RCC and pre-engineered steel." },
  { name: "Renovation and extensions", text: "Extra floors after a structural check, retrofitting, and repairs to leaking terraces and damp walls.", scope: "Structural audit first." },
];

export const steps = [
  { name: "Site visit", text: "We walk the plot, check documents and arrange a soil test." },
  { name: "Drawings and approvals", text: "Architectural and structural drawings, then the building permit through Telangana's BuildNow portal for GHMC or HMDA limits." },
  { name: "BOQ and contract", text: "An itemised bill of quantities, material brands in writing, and payments tied to stages." },
  { name: "Construction", text: "A site engineer on every job, with progress photos and a site update each week." },
  { name: "Handover", text: "Snag list cleared, as-built drawings and warranties handed over, with help on the occupancy certificate." },
];

export const spec = [
  ["Concrete", "M25 minimum for structural members, higher where the design requires", "Cube tests at 7 and 28 days"],
  ["Steel", "Fe 500D TMT bars from BIS-licensed makers", "Test certificate checked for each lot"],
  ["Structural design", "IS 456 for RCC, IS 875 for loads", "Structural engineer's sign-off"],
  ["Earthquake resistance", "IS 1893 forces with IS 13920 ductile detailing", "Seismic zone confirmed for each site"],
  ["Curing", "At least 7 days wet curing, 10 days for blended cement", "Logged on site by the engineer"],
  ["Waterproofing", "Terraces, toilets and sunken slabs treated before finishes", "Ponding test before tiling"],
  ["Rainwater harvesting", "Recharge pit built wherever current GHMC rules require one", "Checked before the occupancy certificate application"],
];

export const faqs = [
  { q: "Do you take turnkey contracts?", a: "Yes. You can choose a turnkey contract, or a labour-and-material contract where you buy selected items yourself." },
  { q: "Who handles the building permit?", a: "We prepare the drawings and file through Telangana's BuildNow portal for plots within GHMC or HMDA limits." },
  { q: "How are payments structured?", a: "Payments follow construction stages listed in your contract, with quantities and material brands set out in an itemised BOQ." },
  { q: "Can the plan follow Vastu?", a: "Yes. We can place the entrance, pooja room, kitchen and master bedroom to suit Vastu, within what the plot and building rules allow." },
  { q: "How long does a house take to build?", a: "It depends on plot, floors, finishes and approvals. The sample plans on this site show indicative durations, and we confirm a schedule for your project before work starts." },
  { q: "Will I get updates during construction?", a: "Yes. A site engineer shares progress photos and a site update each week." },
];

export const credits = [
  { label: "Kurt Kaiser on Wikimedia Commons", href: "https://commons.wikimedia.org/wiki/File:DC_modern_apartment_at_dusk.jpg" },
  { label: "rawpixel", href: "https://www.rawpixel.com/public-domain" },
];
