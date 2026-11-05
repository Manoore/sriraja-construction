import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="site-foot">
      <div className="wrap">
        <span className="logo">{site.name}</span>
        <span>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</span>
      </div>
    </footer>
  );
}
