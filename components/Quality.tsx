import { spec } from "@/lib/content";

export default function Quality() {
  return (
    <section id="spec" className="cream">
      <div className="wrap">
        <div className="head">
          <p className="label">Quality</p>
          <h2>What goes into the structure</h2>
          <p>The specification we work to on RCC buildings, with the check behind each line.</p>
        </div>
        <table className="spec">
          <thead>
            <tr><th scope="col">Item</th><th scope="col">Standard</th><th scope="col">How we check it</th></tr>
          </thead>
          <tbody>
            {spec.map(([item, standard, check]) => (
              <tr key={item}><th scope="row">{item}</th><td>{standard}</td><td>{check}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
