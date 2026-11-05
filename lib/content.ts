export type Project = {
  category: "Residential" | "Commercial" | "Institutional" | "Industrial";
  name: string;
  place: string;
  area: string;
  floors: string;
  time: string;
  /** Photo path in public/. Without one, the drawing is shown. */
  photo?: string;
  /** Shows the stock-photo tag. Remove when using your own site photos. */
  stock?: boolean;
  drawing?: "shops" | "school" | "shed";
};

export const projects: Project[] = [
  { category: "Residential", photo: "/images/house.jpg", stock: true, name: "Single-family house", place: "Sample details", area: "3,200", floors: "G+1", time: "11 mo" },
  { category: "Residential", photo: "/images/five-storey.jpg", stock: true, name: "Five-storey apartment block", place: "Sample details", area: "30,000", floors: "G+4", time: "20 mo" },
  { category: "Commercial", photo: "/images/commercial.jpg", stock: true, name: "Commercial office campus", place: "Sample details", area: "56,000", floors: "G+6", time: "26 mo" },
  { category: "Commercial", drawing: "shops", name: "Shop-and-flat building", place: "Sample, Dilsukhnagar", area: "11,500", floors: "G+3", time: "14 mo" },
  { category: "Institutional", drawing: "school", name: "School block", place: "Sample, Miyapur", area: "16,000", floors: "G+2", time: "13 mo" },
  { category: "Industrial", drawing: "shed", name: "Pre-engineered warehouse", place: "Sample, Patancheru", area: "32,000", floors: "Single", time: "8 mo" },
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
  { label: "House in Mysore", href: "https://commons.wikimedia.org/wiki/File:Modern_residential_architecture_with_curved_design_and_exposed_brick_in_Mysore,_India.jpg", author: "Evan Lovely", license: "CC BY 2.0", licenseHref: "https://creativecommons.org/licenses/by/2.0", note: "" },
  { label: "Residential building, Ayyappa Society", href: "https://commons.wikimedia.org/wiki/File:Vernacular_styled_residential_building_in_Ayyappa_society.jpg", author: "iMahesh", license: "CC BY-SA 4.0", licenseHref: "https://creativecommons.org/licenses/by-sa/4.0", note: ", cropped" },
  { label: "Office buildings, HITEC City", href: "https://commons.wikimedia.org/wiki/File:Hyderabad_officeBuildings_2011_HiTec_City.jpg", author: "Chris Connelly", license: "CC BY 2.0", licenseHref: "https://creativecommons.org/licenses/by/2.0", note: ", cropped" },
];
