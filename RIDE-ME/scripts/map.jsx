// RideMe — Stylized SVG map placeholder
// Renders streets, blocks, ROUTE polyline, pins, and optional driver dots.

function RMMap({
  showRoute = true,
  showDriverDots = 0, // count
  height = '100%',
  variant = 'day', // 'day' | 'night'
  // pickupOffset/dropOffset in 0..1 along route polyline endpoints
}) {
  const dark = variant === 'night';
  const bg = dark ? '#0E1A33' : '#E6EEF8';
  const block = dark ? '#13234A' : '#F4F8FD';
  const street = dark ? '#1B2C58' : '#FFFFFF';
  const streetLine = dark ? '#2A3D6A' : '#DCE5F1';
  const park = dark ? '#13322A' : '#D9EEDC';
  const water = dark ? '#0B2042' : '#CFE3F4';

  // a few driver dot positions (deterministic)
  const dots = [
    { x: 60, y: 110 }, { x: 240, y: 70 }, { x: 320, y: 180 },
    { x: 90, y: 240 }, { x: 180, y: 300 }, { x: 290, y: 270 },
  ].slice(0, showDriverDots);

  return (
    <div style={{ width: '100%', height, position: 'relative', overflow: 'hidden', background: bg }}>
      <svg viewBox="0 0 390 420" preserveAspectRatio="xMidYMid slice"
        width="100%" height="100%" style={{ display: 'block' }}>
        {/* base */}
        <rect width="390" height="420" fill={bg}/>
        {/* water (river diagonal) */}
        <path d="M-20 320 L420 220 L420 280 L-20 380 Z" fill={water} opacity="0.85"/>
        {/* park */}
        <path d="M30 50 L130 30 L160 110 L70 140 Z" fill={park} opacity="0.9"/>
        <path d="M260 280 L350 270 L360 340 L290 370 L255 320 Z" fill={park} opacity="0.85"/>

        {/* blocks (rounded rects in a loose grid) */}
        {[
          [10,160,80,60],[100,150,70,80],[180,140,80,70],[270,130,90,75],
          [10,230,75,90],[95,240,80,70],[180,220,90,90],[280,210,100,70],
          [10,330,90,80],[110,320,80,80],[200,320,100,90],[310,310,90,90],
          [200,40,80,70],[290,40,80,70],
        ].map(([x,y,w,h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} rx="6" fill={block}/>
        ))}

        {/* streets — wide strokes for main avenues */}
        <g stroke={street} strokeWidth="14" fill="none" strokeLinecap="round">
          <path d="M-10 200 L420 200"/>
          <path d="M-10 130 L420 130" opacity="0.85"/>
          <path d="M-10 300 L420 300"/>
          <path d="M180 -10 L180 440"/>
          <path d="M85 -10 L85 440" opacity="0.85"/>
          <path d="M285 -10 L285 440"/>
        </g>
        {/* dashed centerlines on big avenues */}
        <g stroke={streetLine} strokeWidth="1.4" strokeDasharray="6 8" fill="none">
          <path d="M-10 200 L420 200"/>
          <path d="M180 -10 L180 440"/>
        </g>

        {/* diagonal street */}
        <path d="M-10 60 L420 380" stroke={street} strokeWidth="10" strokeLinecap="round" fill="none"/>

        {/* ROUTE */}
        {showRoute && (
          <g>
            <path d="M70 340 C 100 280, 160 260, 200 220 S 280 140, 320 90"
              stroke="var(--rm-blue)" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M70 340 C 100 280, 160 260, 200 220 S 280 140, 320 90"
              stroke="var(--rm-cyan)" strokeWidth="2.5" strokeDasharray="0 10" strokeLinecap="round" fill="none" opacity="0.9"/>
            {/* pickup pin (origin, green) */}
            <g transform="translate(70 340)">
              <circle r="11" fill="white" stroke="var(--rm-blue)" strokeWidth="3"/>
              <circle r="4" fill="var(--rm-blue)"/>
            </g>
            {/* destination pin */}
            <g transform="translate(320 90)">
              <path d="M0 -22 C-12 -22 -18 -13 -18 -6 C-18 5 0 18 0 18 C0 18 18 5 18 -6 C18 -13 12 -22 0 -22 Z"
                fill="var(--rm-blue)"/>
              <circle cy="-8" r="5" fill="white"/>
            </g>
          </g>
        )}

        {/* driver dots */}
        {dots.map((d,i) => (
          <g key={i} transform={`translate(${d.x} ${d.y})`}>
            <circle r="14" fill="var(--rm-blue)" opacity="0.18">
              <animate attributeName="r" values="10;18;10" dur="2.4s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.25;0;0.25" dur="2.4s" repeatCount="indefinite"/>
            </circle>
            <rect x="-8" y="-6" width="16" height="12" rx="3" fill="var(--rm-navy)"/>
            <rect x="-6" y="-4" width="12" height="3" rx="1" fill="var(--rm-cyan)"/>
          </g>
        ))}
      </svg>

      {/* subtle vignette */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: dark
          ? 'radial-gradient(120% 80% at 50% 0%, transparent 60%, rgba(0,0,0,0.35))'
          : 'radial-gradient(120% 80% at 50% 0%, transparent 60%, rgba(13,27,61,0.08))',
      }}/>
    </div>
  );
}

window.RMMap = RMMap;
