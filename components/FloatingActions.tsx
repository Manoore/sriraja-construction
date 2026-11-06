import { site } from "@/lib/site";

export default function FloatingActions() {
  return (
    <div className="float">
      <a className="float-est" href="#estimate" aria-label="Open cost estimator" title="Cost estimator">
        <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M8.5 8h7M8.5 12h7M8.5 16h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
      </a>
      <a href={site.whatsapp ? `https://wa.me/${site.whatsapp}` : "#contact"} aria-label={site.whatsapp ? "Chat on WhatsApp" : "Send an enquiry"} title={site.whatsapp ? "WhatsApp" : "Enquire"}>
        <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.8L3.5 20.5l4.3-1.1A8.5 8.5 0 1 0 12 3.5z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M8.5 11h7M8.5 14h4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
      </a>
    </div>
  );
}
