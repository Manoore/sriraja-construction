# SriRaja Construction website

Next.js and React site, exported as static files and hosted on GitHub Pages.

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
- `app/globals.css`: colours, fonts, layout

Pushing to `main` builds and deploys automatically.

## Before final launch

Replace sample projects, stock photos and placeholder contact details, then remove
the draft banner in `app/page.tsx`. Connect the enquiry form in `components/Contact.tsx`.
