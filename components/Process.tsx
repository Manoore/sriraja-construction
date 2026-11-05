import { steps } from "@/lib/content";

export default function Process() {
  return (
    <section id="process">
      <div className="wrap">
        <div className="head">
          <p className="label">Process</p>
          <h2>How a project runs</h2>
        </div>
        <ol className="steps">
          {steps.map((s, i) => (
            <li key={s.name}>
              <span className="n">{`0${i + 1}`}</span>
              <h3>{s.name}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
