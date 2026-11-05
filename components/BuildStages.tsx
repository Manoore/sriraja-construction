"use client";

import { useEffect, useRef, useState } from "react";

const STAGES = [
  ["Bhoomi puja", "Site surveyed, boundaries pegged and soil samples taken. Work begins on the date you choose."],
  ["Foundation", "Excavation to the depth the soil report calls for. RCC footings cast and cured."],
  ["Plinth", "Plinth beams tie the footings together. Anti-termite treatment and a damp-proof course go in before filling."],
  ["RCC frame", "Columns and slabs rise floor by floor. Concrete cubes go for testing from each pour."],
  ["Brickwork", "Walls and lintels go up, with electrical and plumbing conduits laid while the scaffold stands."],
  ["Finishes", "Plaster, waterproofing, flooring, windows and paint. Parapet and terrace tanks complete."],
  ["Griha pravesh", "Final inspection done, snag list cleared, keys and documents handed over. Your family moves in."],
];

/* Drawn at 18 px per metre. */
const G = 380;
const P = 369;
const FH = 54;
const COLS = [158, 239, 320, 401, 482];
const lv = (i: number) => P - i * FH;
const top = lv(5);
const FLOORS = [1, 2, 3, 4];
const BAYS = [0, 1, 2, 3];
const range = (from: number, to: number, step: number) => {
  const out: number[] = [];
  for (let v = from; v < to; v += step) out.push(v);
  return out;
};

function Elevation({ stage }: { stage: number }) {
  const on = (from: number, to: number) => `layer${from <= stage && stage <= to ? " on" : ""}`;
  return (
    <svg viewBox="0 0 640 440" role="img" aria-label={`Front elevation of an apartment block at stage: ${STAGES[stage][0]}`}>
      <defs>
        <pattern id="grid5" width="90" height="90" patternUnits="userSpaceOnUse" y="20"><path className="fa" d="M90 0H0V90" /></pattern>
        <pattern id="bricks" width="18" height="10" patternUnits="userSpaceOnUse">
          <rect className="bk" width="18" height="10" />
          <path className="bl" d="M0 0H18M0 5H18M9 0V5M0 5V10M18 5V10" />
        </pattern>
      </defs>
      <rect width="640" height="440" fill="url(#grid5)" />
      <rect className="so" y={G} width="640" height="60" />
      <line className="dh" x1="0" y1={G} x2="640" y2={G} />
      <path className="d" d="M20 424H110M20 419V429M110 419V429" />
      <text x="118" y="428" fontSize="12">5 m</text>

      {/* Bhoomi puja */}
      <g className={on(0, 0)}>
        <line className="d" x1="150" y1={G - 14} x2="490" y2={G - 14} strokeDasharray="5 4" />
        {[150, 320, 490].map((x) => <line key={x} className="dh" x1={x} y1={G - 20} x2={x} y2={G} />)}
        <path className="ta" d={`M226 ${G - 2}c-9 0-11-7-8-12c1-2 2-3 2-5h12c0 2 1 3 2 5c3 5 1 12-8 12z`} />
        <circle className="tr" cx="226" cy={G - 23} r="6" />
        {[210, 217, 235, 242, 249].map((x) => <circle key={x} className="ac" cx={x} cy={G - 3} r="3.2" />)}
        <text x="320" y={G - 28} fontSize="12" textAnchor="middle">Site pegged out, 18 m frontage</text>
      </g>

      {/* Foundation */}
      <g className={on(1, 1)}>
        {COLS.map((x) => <polygon key={x} className="pit" points={`${x - 26},${G} ${x + 26},${G} ${x + 21},${G + 38} ${x - 21},${G + 38}`} />)}
      </g>
      <g className={on(1, 6)}>
        {COLS.map((x) => (
          <g key={x}>
            <rect className="co" x={x - 18} y={G + 27} width="36" height="9" />
            <rect className="co" x={x - 4} y={G} width="8" height="27" />
          </g>
        ))}
        <text x="508" y={G + 36} fontSize="12">-2.00 m</text>
      </g>

      {/* Plinth */}
      <g className={on(2, 6)}><rect className="co" x="150" y={P} width="340" height="11" /></g>

      {/* Brick infill, then plaster */}
      <g className={on(4, 4)}>
        {FLOORS.map((f) => BAYS.map((b) => <rect key={`${f}-${b}`} x={COLS[b] + 4} y={lv(f + 1)} width="73" height={FH} fill="url(#bricks)" />))}
      </g>
      <g className={on(5, 6)}>
        {FLOORS.map((f) => BAYS.map((b) => <rect key={`${f}-${b}`} className="pl" x={COLS[b] + 4} y={lv(f + 1)} width="73" height={FH} />))}
      </g>

      {/* RCC frame, floor by floor */}
      {[0, 1, 2, 3, 4].map((f) => (
        <g key={f} className={on(3, 6)} style={{ transitionDelay: `${f * 90}ms` }}>
          {COLS.map((x) => <rect key={x} className="co" x={x - 4} y={lv(f + 1)} width="8" height={FH} />)}
          <rect className="co" x="150" y={lv(f + 1) - 2} width="340" height="5" />
        </g>
      ))}

      {/* Bamboo scaffold */}
      <g className={on(3, 4)}>
        {[126, 138, 502, 514].map((x) => <line key={x} className="ba" x1={x} y1="66" x2={x} y2={G} />)}
        {range(80, G, 27).map((y) => (
          <g key={y}>
            <line className="ba" x1="122" y1={y} x2="146" y2={y} />
            <line className="ba" x1="494" y1={y} x2="518" y2={y} />
          </g>
        ))}
        {range(80, G - 27, 54).map((y) => (
          <g key={y}>
            <line className="ba" x1="126" y1={y} x2="138" y2={y + 27} />
            <line className="ba" x1="502" y1={y} x2="514" y2={y + 27} />
          </g>
        ))}
      </g>

      {/* Finishes */}
      <g className={on(5, 6)}>
        <rect className="pl" x="240" y={top - 54} width="81" height="54" />
        <rect className="co" x="236" y={top - 57} width="89" height="3" />
        <rect className="ta" x="252" y={top - 79} width="24" height="22" rx="4" />
        <rect className="ta" x="285" y={top - 79} width="24" height="22" rx="4" />
        <rect className="pl" x="150" y={top - 18} width="340" height="18" />
        {FLOORS.map((f) => (
          <g key={f}>
            {[0, 3].map((b) => {
              const x = COLS[b];
              const t = lv(f + 1) + 14;
              return (
                <g key={b}>
                  <rect className="gl" x={x + 20} y={t} width="41" height="24" />
                  <line className="d" x1={x + 40.5} y1={t} x2={x + 40.5} y2={t + 24} />
                  <rect className="co" x={x + 14} y={t - 5} width="53" height="3" />
                </g>
              );
            })}
            {[1, 2].map((b) => {
              const x = COLS[b];
              const yb = lv(f);
              const t = yb - 44;
              return (
                <g key={b}>
                  <rect className="gl" x={x + 26} y={t} width="29" height="44" />
                  <line className="d" x1={x + 40.5} y1={t} x2={x + 40.5} y2={yb} />
                  <line className="dh" x1={x + 5} y1={yb - 20} x2={x + 76} y2={yb - 20} />
                  {range(x + 12, x + 76, 8).map((r) => <line key={r} className="d" x1={r} y1={yb - 20} x2={r} y2={yb} />)}
                </g>
              );
            })}
          </g>
        ))}
        {[COLS[0] + 8, COLS[2] + 8].map((x) => (
          <g key={x}>
            <path className="pl" d={`M${x} ${P - 7}v-11l10-1l9-11h25l10 12l9 1v10z`} />
            <circle className="ta" cx={x + 13} cy={P - 6} r="5" />
            <circle className="ta" cx={x + 50} cy={P - 6} r="5" />
          </g>
        ))}
        <rect className="pl" x="62" y={G - 27} width="88" height="27" />
        <rect className="pl" x="490" y={G - 27} width="28" height="27" />
        <rect className="co" x="144" y={G - 34} width="8" height="34" />
        <rect className="co" x="488" y={G - 34} width="8" height="34" />
        <line className="dh" x1="42" y1={G} x2="42" y2={G - 44} />
        <circle className="tr" cx="42" cy={G - 62} r="24" />
        <circle className="tr" cx="24" cy={G - 46} r="15" />
        <circle className="tr" cx="62" cy={G - 46} r="15" />
      </g>

      {/* Griha pravesh: lit windows and a marigold toran */}
      <g className={on(6, 6)}>
        {FLOORS.map((f) => (
          <g key={f}>
            {[0, 3].map((b) => <rect key={b} className="lit" x={COLS[b] + 20} y={lv(f + 1) + 14} width="41" height="24" />)}
            {[1, 2].map((b) => <rect key={b} className="lit" x={COLS[b] + 26} y={lv(f) - 44} width="29" height="44" />)}
          </g>
        ))}
        {[COLS[1], COLS[2]].map((x) => range(0, 11, 1).map((n) => {
          const u = n / 10;
          return <circle key={`${x}-${n}`} className="ac" cx={x + 6 + n * 6.9} cy={lv(1) + 7 + 40 * u * (1 - u)} r="3.1" />;
        }))}
      </g>

      {/* Level marks: plinth 0.60 m plus 3 m per floor */}
      <g className={on(3, 6)}>
        {[1, 2, 3, 4, 5].map((i) => (
          <g key={i}>
            <line className="d" x1="524" y1={lv(i)} x2="536" y2={lv(i)} />
            <text x="540" y={lv(i) + 4} fontSize="12">{`+${(0.6 + i * 3).toFixed(2)}`}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}

export default function BuildStages() {
  const [stage, setStage] = useState(6);
  const [touched, setTouched] = useState(false);
  const figure = useRef<HTMLElement>(null);

  /* Plays the build once when the drawing first scrolls into view. */
  useEffect(() => {
    if (touched || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !figure.current) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        let current = 0;
        setStage(0);
        timer = setInterval(() => {
          current += 1;
          setStage(current);
          if (current === 6) clearInterval(timer);
        }, 480);
      },
      { threshold: 0.35 },
    );
    observer.observe(figure.current);
    return () => {
      observer.disconnect();
      clearInterval(timer);
    };
  }, [touched]);

  return (
    <section id="stages" className="dark">
      <div className="wrap stages-grid">
        <div className="stage-copy">
          <p className="label">How we build</p>
          <h2>From <em>bhoomi puja</em> to <em>griha pravesh</em></h2>
          <div className="stage-note" aria-live={touched ? "polite" : "off"}>
            <h3>{STAGES[stage][0]}</h3>
            <p>{STAGES[stage][1]}</p>
          </div>
        </div>
        <figure className="draw" ref={figure}>
          <Elevation stage={stage} />
          <ol className="stage-list" aria-label="Construction stages">
            {STAGES.map(([name], i) => (
              <li key={name}>
                <button
                  type="button"
                  className={i < stage ? "done" : undefined}
                  aria-current={i === stage ? "step" : undefined}
                  aria-label={`Stage ${i + 1}: ${name}`}
                  onClick={() => {
                    setTouched(true);
                    setStage(i);
                  }}
                >
                  <b>{i + 1}</b>
                  <span className="t">{name}</span>
                </button>
              </li>
            ))}
          </ol>
        </figure>
      </div>
    </section>
  );
}
