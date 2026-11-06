"use client";

import { useState } from "react";
import { site } from "@/lib/site";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="contact">
      <div className="wrap">
        <div className="info-col">
          <p className="label">Enquire</p>
          <h2>Tell us about your plot</h2>
          <p>Share the location and size, and what you want to build. We&apos;ll come back with next steps and a site visit date.</p>
          <dl>
            {site.phone && <div><dt>Phone and WhatsApp</dt><dd><a href={`tel:${site.phone}`}>{site.phone}</a></dd></div>}
            {site.email && <div><dt>Email</dt><dd><a href={`mailto:${site.email}`}>{site.email}</a></dd></div>}
            <div><dt>Office</dt><dd>{site.streetAddress || site.city}</dd></div>
          </dl>
        </div>
        {/* Not connected yet. Add an API route in app/api/enquiry to send enquiries by email. */}
        <form
          className="enquiry"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <label>Your name<input name="name" autoComplete="name" required /></label>
          <label>Phone number<input name="phone" type="tel" autoComplete="tel" required /></label>
          <label>Plot location<input name="city" placeholder="For example, Kondapur" required /></label>
          <label>
            Project type
            <select name="type">
              <option>Independent home or villa</option>
              <option>Apartment building</option>
              <option>Commercial building</option>
              <option>School, clinic or industrial</option>
              <option>Renovation or extension</option>
            </select>
          </label>
          <label>Plot size (sq ft)<input name="size" type="number" min="0" inputMode="numeric" /></label>
          <label>Floors planned<input name="floors" placeholder="For example, G+2" /></label>
          <label className="wide">Anything else we should know<textarea name="message" rows={3} /></label>
          <button className="btn wide" type="submit"><span>Send enquiry</span></button>
          {submitted && (
            <p className="form-note wide" role="status">Online enquiries aren&apos;t connected yet, so your details were not sent.</p>
          )}
        </form>
      </div>
    </section>
  );
}
