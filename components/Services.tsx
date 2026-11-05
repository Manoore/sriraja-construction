import { services } from "@/lib/content";

export default function Services() {
  return (
    <section id="services" className="cream">
      <div className="wrap">
        <div className="head">
          <p className="label">Services</p>
          <h2>What we build</h2>
        </div>
        <ul className="service-grid">
          {services.map((s) => (
            <li className="service" key={s.name}>
              <h3>{s.name}</h3>
              <p>{s.text}</p>
              <p className="scope">{s.scope}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
