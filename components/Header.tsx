import { site } from "@/lib/site";

export default function Header() {
  return (
    <header className="site-head">
      <div className="wrap">
        <span className="place">{site.city}</span>
        <a className="logo" href="#home">{site.shortName}</a>
        <a className="btn" href="#contact">Enquire</a>
      </div>
    </header>
  );
}
