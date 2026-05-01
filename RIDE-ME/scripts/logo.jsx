// RideMe — Logo SVG fiel al original (R con pin + líneas de velocidad + gradiente cyan→blue)
// Exporta: RMLogoSVG, RMLogoMark, RMWordmark

function RMLogoSVG({ width = 220, height = 180, animate = false }) {
  // Reproduces: R with location pin + speed lines + "RideMe" wordmark + tagline
  return (
    <svg width={width} height={height} viewBox="0 0 220 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="rmG1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00B4FF"/>
          <stop offset="100%" stopColor="#1A45BF"/>
        </linearGradient>
        <linearGradient id="rmG2" x1="0" y1="0" x2="1" y2="0.5">
          <stop offset="0%" stopColor="#00CFFF"/>
          <stop offset="100%" stopColor="#2563EB"/>
        </linearGradient>
        <linearGradient id="rmGLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00E5FF"/>
          <stop offset="100%" stopColor="#2563EB"/>
        </linearGradient>
      </defs>

      {/* Speed lines (left of R) */}
      <rect x="14" y="22" width="38" height="8" rx="4" fill="url(#rmGLine)" opacity="0.9"/>
      <rect x="20" y="36" width="30" height="7" rx="3.5" fill="url(#rmGLine)" opacity="0.75"/>
      <rect x="26" y="49" width="22" height="6" rx="3" fill="url(#rmGLine)" opacity="0.6"/>

      {/* R letter body — thick stroke style */}
      {/* Vertical stem */}
      <rect x="60" y="16" width="16" height="80" rx="4" fill="url(#rmG1)"/>
      {/* Top bowl of R */}
      <path d="M76 16 Q118 16 118 38 Q118 58 96 62 L76 64 L76 50 L90 48 Q102 46 102 38 Q102 30 76 30 Z"
        fill="url(#rmG1)"/>
      {/* Leg of R — diagonal */}
      <path d="M76 62 L96 62 L120 96 L102 96 Z" fill="url(#rmG1)"/>

      {/* Pin inside R bowl */}
      <path d="M93 34 C88 34 84 38 84 43 C84 50 93 60 93 60 C93 60 102 50 102 43 C102 38 98 34 93 34 Z"
        fill="white"/>
      <circle cx="93" cy="43" r="4" fill="url(#rmG2)"/>

      {/* Wordmark: "Ride" navy, "Me" blue */}
      <text x="14" y="130" fontFamily="Inter, system-ui" fontWeight="800" fontSize="38" letterSpacing="-1" fill="#0D1B3D">Ride</text>
      <text x="87" y="130" fontFamily="Inter, system-ui" fontWeight="800" fontSize="38" letterSpacing="-1" fill="#2563EB">Me</text>

      {/* Tagline */}
      <text x="110" y="152" fontFamily="Inter, system-ui" fontWeight="600" fontSize="11" letterSpacing="3" fill="#4A5876" textAnchor="middle">TU RIDE, TU DESTINO.</text>
    </svg>
  );
}

// Just the R icon mark (for icons, app bar, etc.)
function RMLogoMark({ size = 40 }) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id="rmMarkG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00B4FF"/>
          <stop offset="100%" stopColor="#1A45BF"/>
        </linearGradient>
        <linearGradient id="rmMarkGL" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00E5FF"/>
          <stop offset="100%" stopColor="#2563EB"/>
        </linearGradient>
      </defs>
      {/* Speed lines */}
      <rect x="4" y="8" width="22" height="6" rx="3" fill="url(#rmMarkGL)" opacity="0.9"/>
      <rect x="8" y="18" width="16" height="5" rx="2.5" fill="url(#rmMarkGL)" opacity="0.7"/>
      <rect x="12" y="27" width="10" height="4" rx="2" fill="url(#rmMarkGL)" opacity="0.55"/>
      {/* R stem */}
      <rect x="30" y="5" width="10" height="55" rx="3" fill="url(#rmMarkG)"/>
      {/* R bowl */}
      <path d="M40 5 Q72 5 72 22 Q72 37 56 40 L40 42 L40 31 L52 29 Q62 27 62 22 Q62 17 40 18 Z" fill="url(#rmMarkG)"/>
      {/* R leg */}
      <path d="M40 40 L56 40 L76 60 L60 60 Z" fill="url(#rmMarkG)"/>
      {/* Pin */}
      <path d="M57 14 C52 14 48 18 48 23 C48 30 57 38 57 38 C57 38 66 30 66 23 C66 18 62 14 57 14 Z" fill="white"/>
      <circle cx="57" cy="23" r="4" fill="url(#rmMarkG)"/>
    </svg>
  );
}

// Just wordmark text
function RMWordmark({ size = 32, dark = false }) {
  return (
    <span style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: size, letterSpacing: '-0.03em', lineHeight: 1 }}>
      <span style={{ color: dark ? '#fff' : '#0D1B3D' }}>Ride</span>
      <span style={{ color: '#2563EB' }}>Me</span>
    </span>
  );
}

Object.assign(window, { RMLogoSVG, RMLogoMark, RMWordmark });
