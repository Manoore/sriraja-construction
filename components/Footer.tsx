import { site } from "@/lib/site";
import { Logo } from "./Logo";

const GROUPS: [string, [string, string][]][] = [
  ["Build with us", [["#explore", "Building types"], ["#plans", "House plans"], ["#estimate", "Cost estimator"], ["#contact", "Enquire"]]],
  ["Our approach", [["#why", "Why SriRaja"], ["#stages", "How we build"], ["#work", "Services and quality"], ["#faq", "FAQs"]]],
];

export default function Footer() {
  return (
    <footer className="site-foot">
      <div className="wrap">
        <div className="foot-logo"><Logo /></div>
        <div className="foot-cols">
          {GROUPS.map(([title, links]) => (
            <nav key={title} aria-label={title}>
              <h3>{title}</h3>
              {links.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
            </nav>
          ))}
          <div>
            <h3>Visit us</h3>
            <p>{site.streetAddress || site.city}</p>
            {site.phone && <p><a href={`tel:${site.phone}`}>{site.phone}</a></p>}
            {site.email && <p><a href={`mailto:${site.email}`}>{site.email}</a></p>}
            {site.rera && <p>TG RERA: {site.rera}</p>}
            {site.gstin && <p>GSTIN: {site.gstin}</p>}
          </div>
        </div>
        <p className="foot-copy">&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
