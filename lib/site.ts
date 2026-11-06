/** Company details used across the site. Empty values are hidden until you fill them in. */
export const site = {
  name: "SriRaja Construction",
  shortName: "SriRaja",
  url: "https://www.srirajaconstructions.com",
  description: "SriRaja Construction is a Hyderabad builder of homes, apartments and commercial buildings.",
  city: "Hyderabad, Telangana",
  phone: "",
  /** Digits with country code, for example 919000000000. The WhatsApp button appears once this is set. */
  whatsapp: "",
  email: "",
  streetAddress: "",
  established: "",
  serviceAreas: "",
  gstin: "",
  rera: "",
};

/** Rates per sq ft used by the cost estimator. Set these to your own pricing. */
export const estimateRates = [
  { name: "Standard", low: 1900, high: 2300, text: "Reliable materials and clean, simple finishes." },
  { name: "Premium", low: 2400, high: 3000, text: "Better flooring, fittings, doors and exterior finishes." },
  { name: "Luxury", low: 3200, high: 4500, text: "Designer finishes, imported fittings and custom details." },
];
