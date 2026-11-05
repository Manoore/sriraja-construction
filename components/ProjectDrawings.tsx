/* Every drawing uses 6 px per metre, with the ground at y=172. */
const Y0 = 172;
const range = (from: number, to: number, step: number) => {
  const out: number[] = [];
  for (let v = from; v < to; v += step) out.push(v);
  return out;
};

type FrameProps = { id: string; x: number; topY: number; label: string; children: React.ReactNode };

function Frame({ id, x, topY, label, children }: FrameProps) {
  return (
    <svg viewBox="0 0 320 200" aria-hidden="true">
      <defs>
        <pattern id={id} width="30" height="30" patternUnits="userSpaceOnUse" y="22"><path className="fa" d="M30 0H0V30" /></pattern>
      </defs>
      <rect width="320" height="200" fill={`url(#${id})`} />
      {children}
      <line className="dh" x1="6" y1={Y0} x2="314" y2={Y0} />
      <path className="d" d="M12 188H72M12 185V191M72 185V191" />
      <text x="78" y="191" fontSize="9">10 m</text>
      <line className="d" x1={x - 3} y1={topY} x2={x + 9} y2={topY} />
      <text x={x + 12} y={topY + 3} fontSize="9">{label}</text>
    </svg>
  );
}

function Shops() {
  const x0 = 115, w = 90, g = 25, h = 18.6;
  const top = Y0 - g - 3 * h - 6;
  return (
    <Frame id="dShops" x={x0 + w + 12} topY={top} label="+14.80 m">
      <rect className="pl" x={x0} y={top} width={w} height={3 * h + 6} />
      <rect className="co" x={x0 - 3} y={Y0 - g - 2} width={w + 6} height="4" />
      {[0, 1, 2].map((f) => [0, 1, 2].map((i) => {
        const px = x0 + 7 + i * 28;
        const py = Y0 - g - (f + 1) * h + 5;
        return (
          <g key={`${f}-${i}`}>
            <rect className="gl" x={px} y={py} width="20" height="9" />
            <line className="d" x1={px - 2} y1={py - 2} x2={px + 22} y2={py - 2} />
          </g>
        );
      }))}
      {[0, 1, 2].map((i) => {
        const sx = x0 + i * 30;
        return (
          <g key={i}>
            <rect className="tr" x={sx + 2} y={Y0 - g + 2} width="26" height={g - 2} />
            {range(Y0 - g + 8, Y0, 5).map((y) => <line key={y} className="d" x1={sx + 2} y1={y} x2={sx + 28} y2={y} />)}
          </g>
        );
      })}
    </Frame>
  );
}

function School() {
  const x0 = 34, w = 252, h = 21.6;
  return (
    <Frame id="dSchool" x={x0 + 150} topY={Y0 - 3 * h - 11} label="+12.60 m">
      <rect className="pl" x={x0} y={Y0 - 3 * h} width={w} height={3 * h} />
      {[0, 1, 2].map((f) => range(0, 14, 1).filter((i) => i !== 6 && i !== 7).map((i) => (
        <path key={`${f}-${i}`} className="gl" d={`M${x0 + 3 + i * 17.8} ${Y0 - f * h}v-11a6 6 0 0 1 12 0v11z`} />
      )))}
      {[1, 2].map((f) => <line key={f} className="d" x1={x0} y1={Y0 - f * h} x2={x0 + w} y2={Y0 - f * h} />)}
      <rect className="pl" x={x0 + 106} y={Y0 - 3 * h - 11} width="40" height={3 * h + 11} />
      <rect className="gl" x={x0 + 118} y={Y0 - 3 * h} width="16" height={3 * h - 16} />
      <rect className="tr" x={x0 + 116} y={Y0 - 13} width="20" height="13" />
    </Frame>
  );
}

function Shed() {
  const x0 = 40, w = 240, e = 54, r = 66;
  return (
    <Frame id="dShed" x={x0 + w / 2 + 30} topY={Y0 - r - 18} label="+11.80 m">
      <polygon className="pl" points={`${x0},${Y0} ${x0},${Y0 - e} ${x0 + w / 2},${Y0 - r} ${x0 + w},${Y0 - e} ${x0 + w},${Y0}`} />
      {range(12, w, 12).map((v) => {
        const d = v <= w / 2 ? v : w - v;
        return <line key={v} className="d" x1={x0 + v} y1={Y0} x2={x0 + v} y2={Y0 - e - (r - e) * d / (w / 2)} />;
      })}
      {[36, 108, 180].map((d) => (
        <g key={d}>
          <rect className="tr" x={x0 + d} y={Y0 - 30} width="24" height="30" />
          {[24, 18, 12, 6].map((u) => <line key={u} className="d" x1={x0 + d} y1={Y0 - u} x2={x0 + d + 24} y2={Y0 - u} />)}
        </g>
      ))}
      <rect className="co" x={x0 + w / 2 - 24} y={Y0 - r - 5} width="48" height="5" />
    </Frame>
  );
}

export const drawings = { shops: Shops, school: School, shed: Shed };
