import Image from "next/image";
import { site } from "@/lib/site";

const stats = [
  ["7", "Stages from bhoomi puja to griha pravesh"],
  ["28", "Day concrete cube tests"],
  ["5", "Types of building work"],
];

function Field({ label, value, add }: { label: string; value: string; add: string }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{value || <span className="todo">{add}</span>}</dd>
    </div>
  );
}

export default function About() {
  return (
    <section id="about">
      <div className="wrap">
        <div className="about">
          <div className="copy">
            <p className="label">{site.name}</p>
            <h2>A builder you can reach on any working day</h2>
            <p>
              {site.name} is a Hyderabad building contractor serving families, landowners and businesses. You deal with the
              people responsible for your site, from the first estimate to the day you collect your keys.
            </p>
            <p><span className="todo">Add: your founding story and projects delivered</span></p>
            <dl className="register" style={{ width: "100%" }}>
              <Field label="Established" value={site.established} add="Add year" />
              <Field label="Head office" value={site.city} add="Add city" />
              <Field label="Service areas" value={site.serviceAreas} add="Add localities" />
              <Field label="GSTIN" value={site.gstin} add="Add number" />
              <Field label="TG RERA reg." value={site.rera} add="Add if applicable" />
            </dl>
          </div>
          <div className="collage">
            <div className="a">
              <Image src="/images/five-storey.jpg" alt="Stock photo of an apartment building" fill sizes="(max-width: 860px) 80vw, 35vw" />
              <span className="stock-tag">Stock photos</span>
            </div>
            <div className="b">
              <Image src="/images/house.jpg" alt="Stock photo of a family house" fill sizes="(max-width: 860px) 60vw, 28vw" />
            </div>
          </div>
        </div>
        <div className="stats">
          {stats.map(([n, text]) => (
            <div className="stat" key={text}>
              <span className="ghost" aria-hidden="true">{n}</span>
              <b>{n}</b>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
