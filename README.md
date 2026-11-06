# SriRaja Construction website

Next.js, React and Three.js site, hosted on Vercel.

## Run locally

```bash
npm install
npm run dev
```

## Where to edit

- `lib/site.ts`: company name, phone, WhatsApp, email, address, registration numbers
- `lib/content.ts`: projects, services, process, specification, FAQs
- `lib/plans.ts`: house plan data
- `public/images/`: photos
- `public/renders/`: scale-model images, generated from the `/studio` page
- `components/three/`: 3D building models
- `app/icon.svg`, `components/Logo.tsx`: logo and favicon
- `app/globals.css`: colours, fonts, layout

Pushing to `main` deploys to production. Other branches get Vercel preview links.

## Before final launch

Fill in company details and estimator rates in `lib/site.ts`, replace representative
photos with your own, and connect the enquiry form in `components/Contact.tsx`.
