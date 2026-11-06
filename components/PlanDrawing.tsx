import type { Plan } from "@/lib/plans";

const FT = 14;

export default function PlanDrawing({ plan: p }: { plan: Plan }) {
  const mL = 40;
  const mT = p.road === "N" ? 74 : 44;
  const mR = p.road === "E" ? 86 : 44;
  const mB = 62;
  const px = p.plot[0] * FT;
  const py = p.plot[1] * FT;
  const W = px + mL + mR;
  const H = py + mT + mB;
  const hx = mL + p.house[0] * FT;
  const hy = mT + p.house[1] * FT;
  const X = (v: number) => hx + v * FT;
  const Y = (v: number) => hy + v * FT;
  const sy = mT + py + 44;
  const ax = mL + px - 10;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${p.title}, floor plan`}>
      {p.road === "E" ? (
        <>
          <rect className="road" x={mL + px + 8} y={mT} width="40" height={py} />
          <text className="rs" fontSize="11" textAnchor="middle" transform={`translate(${mL + px + 32} ${mT + py / 2}) rotate(90)`}>ROAD, EAST SIDE</text>
        </>
      ) : (
        <>
          <rect className="road" x={mL} y="16" width={px} height="40" />
          <text className="rs" fontSize="11" textAnchor="middle" x={mL + px / 2} y="40">ROAD, NORTH SIDE</text>
        </>
      )}
      <rect className="pb" x={mL} y={mT} width={px} height={py} />

      <path className="thin" d={`M${mL} ${mT + py + 16}H${mL + px}M${mL} ${mT + py + 11}V${mT + py + 21}M${mL + px} ${mT + py + 11}V${mT + py + 21}`} />
      <text className="rs" fontSize="11" textAnchor="middle" x={mL + px / 2} y={mT + py + 20}>{p.plot[0]} ft</text>
      <path className="thin" d={`M${mL - 16} ${mT}V${mT + py}M${mL - 21} ${mT}H${mL - 11}M${mL - 21} ${mT + py}H${mL - 11}`} />
      <text className="rs" fontSize="11" textAnchor="middle" transform={`translate(${mL - 12} ${mT + py / 2}) rotate(-90)`}>{p.plot[1]} ft</text>

      <path className="thin" d={`M${mL} ${sy}H${mL + 10 * FT}M${mL} ${sy - 4}V${sy + 4}M${mL + 10 * FT} ${sy - 4}V${sy + 4}`} />
      <text className="rs" fontSize="11" x={mL + 10 * FT + 8} y={sy + 4}>10 ft</text>
      <path className="ac" d={`M${ax} ${sy - 13}l6 15l-6 -4l-6 4z`} />
      <text className="rs" fontSize="11" textAnchor="middle" x={ax} y={sy + 15}>N</text>

      {p.stair && (
        <>
          {[3, 4, 5, 6, 7, 8, 9, 10].map((x) => <line key={x} className="thin" x1={X(x)} y1={Y(0)} x2={X(x)} y2={Y(10)} />)}
          <line className="wi" x1={X(3)} y1={Y(5)} x2={X(10)} y2={Y(5)} />
        </>
      )}
      {p.walls.map((w) => <line key={w.join()} className="wi draw-in" pathLength={1} x1={X(w[0])} y1={Y(w[1])} x2={X(w[2])} y2={Y(w[3])} />)}
      <rect className="wx draw-in" pathLength={1} x={X(0)} y={Y(0)} width={p.house[2] * FT} height={p.house[3] * FT} />

      {p.opens?.map((o) => <rect key={o.join()} className="gap" x={X(o[1]) - 5} y={Y(o[2])} width="10" height={o[3] * FT} />)}

      {p.windows.map((w) => {
        const x = X(w[1]);
        const y = Y(w[2]);
        const L = w[3] * FT;
        return w[0] === "h" ? (
          <g key={w.join()}>
            <rect className="gap" x={x} y={y - 6} width={L} height="12" />
            {[-4.5, 0, 4.5].map((d) => <line key={d} className="thin" x1={x} y1={y + d} x2={x + L} y2={y + d} />)}
          </g>
        ) : (
          <g key={w.join()}>
            <rect className="gap" x={x - 6} y={y} width="12" height={L} />
            {[-4.5, 0, 4.5].map((d) => <line key={d} className="thin" x1={x + d} y1={y} x2={x + d} y2={y + L} />)}
          </g>
        );
      })}

      {p.doors.map((door) => {
        const [axis, dx, dy, width, dir] = door;
        const x = X(dx);
        const y = Y(dy);
        const L = width * FT;
        return axis === "h" ? (
          <g key={door.join()}>
            <rect className="gap" x={x} y={y - 6} width={L} height="12" />
            <line className="d" x1={x} y1={y} x2={x} y2={y + dir * L} />
            <path className="thin" d={`M${x + L} ${y}A${L} ${L} 0 0 ${dir > 0 ? 1 : 0} ${x} ${y + dir * L}`} />
          </g>
        ) : (
          <g key={door.join()}>
            <rect className="gap" x={x - 6} y={y} width="12" height={L} />
            <line className="d" x1={x} y1={y} x2={x + dir * L} y2={y} />
            <path className="thin" d={`M${x} ${y + L}A${L} ${L} 0 0 ${dir > 0 ? 0 : 1} ${x + dir * L} ${y}`} />
          </g>
        );
      })}

      {p.columns.map((c) => <rect key={c.join()} className="cl" x={X(c[0]) - 5} y={Y(c[1]) - 5} width="10" height="10" />)}

      {p.rooms.map((r) => {
        if (r.x === undefined || r.y === undefined) return null;
        return (
          <g key={r.name}>
            <text className="rm" fontSize="13" textAnchor="middle" x={X(r.x)} y={Y(r.y)}>{r.label ?? r.name}</text>
            {r.size && <text className="rs" fontSize="11" textAnchor="middle" x={X(r.x)} y={Y(r.y) + 15}>{r.size.split(",")[0]}</text>}
          </g>
        );
      })}
    </svg>
  );
}
