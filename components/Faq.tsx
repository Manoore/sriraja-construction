import { faqs } from "@/lib/content";
import { MaskedWords, Reveal } from "./Motion";

export default function Faq() {
  return (
    <section id="faq">
      <div className="wrap">
        <div className="head">
          <MaskedWords text="Frequently asked questions." />
        </div>
        <Reveal className="faq">
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
