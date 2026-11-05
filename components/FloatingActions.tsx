import { site } from "@/lib/site";

export default function FloatingActions() {
  return (
    <div className="float">
      <a href="#contact">Enquire</a>
      {site.whatsapp && <a href={`https://wa.me/${site.whatsapp}`}>WhatsApp</a>}
    </div>
  );
}
