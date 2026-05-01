// RideMe Logo + Brand
// The "R" with the location pin — extracted from the reference renders.

function RideMeMark({ size = 40, variant = 'blue' }) {
  // variants: blue (gradient on white), white (mono), navy (mono)
  const isBlue = variant === 'blue';
  const id = React.useId();
  const gradId = `rm-grad-${id}`;
  const fill = variant === 'white' ? '#FFFFFF' : variant === 'navy' ? '#0D1B3D' : `url(#${gradId})`;
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {isBlue && (
        <defs>
          <linearGradient id={gradId} x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00B4FF"/>
            <stop offset="55%" stopColor="#2563EB"/>
            <stop offset="100%" stopColor="#1D4FD7"/>
          </linearGradient>
        </defs>
      )}
      {/* The R shape — left vertical stroke + bowl + leg */}
      <path
        d="M10 6h18c10 0 17 6.5 17 16 0 7-3.7 12.2-9.6 14.8L46.5 58H36L26 39H20v19H10V6zm10 9v15h7.5c4.6 0 7.7-3 7.7-7.6S32.1 15 27.5 15H20z"
        fill={fill}
      />
      {/* Pin (location marker) – placed at the leg end */}
      <circle cx="49" cy="20" r="9" fill={fill}/>
      <path d="M49 35l-5-8h10l-5 8z" fill={fill}/>
      <circle cx="49" cy="20" r="3.4" fill="#FFFFFF"/>
    </svg>
  );
}

function RideMeLockup({ size = 28, variant = 'blue', tagline = false }) {
  const wordColor = variant === 'white' ? '#fff' : '#0D1B3D';
  const meColor = variant === 'white' ? '#fff' : '#2563EB';
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.34, lineHeight: 1 }}>
      <RideMeMark size={size * 1.5} variant={variant}/>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          fontSize: size,
          lineHeight: 1,
        }}>
          <span style={{ color: wordColor }}>Ride</span>
          <span style={{ color: meColor }}>Me</span>
        </div>
        {tagline && (
          <div style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: 500,
            fontSize: size * 0.32,
            letterSpacing: '0.18em',
            color: variant === 'white' ? 'rgba(255,255,255,0.85)' : '#4A5876',
            textTransform: 'uppercase',
          }}>
            Tu ride, tu destino.
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { RideMeMark, RideMeLockup });
