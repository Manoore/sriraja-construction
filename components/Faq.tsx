import { faqs } from "@/lib/content";

export default function Faq() {
  return (
    <section id="faq">
      <div className="wrap">
        <div className="head">
          <p className="label">FAQs</p>
          <h2>Frequently asked questions</h2>
        </div>
        <div className="faq">
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
