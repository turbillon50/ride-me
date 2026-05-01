// RideMe — Logo + brand glyphs (SVG components)
function RMLogoMark({ size = 32, color = 'var(--rm-blue)', cyan = 'var(--rm-cyan)' }) {
  // Pin shape with stylized R inside, drop shadow circle
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="rmPinG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color}/>
          <stop offset="100%" stopColor={cyan}/>
        </linearGradient>
      </defs>
      {/* Pin */}
      <path d="M32 4C19.85 4 10 13.62 10 25.5C10 36.6 21.4 49.6 28.6 57.2C30.4 59.1 33.6 59.1 35.4 57.2C42.6 49.6 54 36.6 54 25.5C54 13.62 44.15 4 32 4Z"
        fill="url(#rmPinG)"/>
      {/* Inner white circle */}
      <circle cx="32" cy="25" r="13" fill="white"/>
      {/* Stylized R */}
      <path d="M26 17H33C36 17 38 19 38 22C38 24.4 36.5 26.1 34.4 26.6L38.5 33H35.2L31.5 27H28.6V33H26V17ZM28.6 19.4V24.7H32.7C34.1 24.7 35.2 23.6 35.2 22.05C35.2 20.5 34.1 19.4 32.7 19.4H28.6Z"
        fill="var(--rm-navy)"/>
    </svg>
  );
}

function RMLogoLockup({ size = 28, color = 'var(--rm-navy)', cyan = 'var(--rm-cyan)' }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <RMLogoMark size={size} color="var(--rm-blue)" cyan={cyan} />
      <span style={{
        fontFamily: 'Inter', fontWeight: 800, fontSize: size * 0.74,
        letterSpacing: '-0.02em', color, lineHeight: 1
      }}>
        Ride<span style={{ color: 'var(--rm-blue)' }}>Me</span>
      </span>
    </div>
  );
}

// Tiny inline icons (24px viewBox)
const RMIcon = {
  home: (p={}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><path d="M3 11l9-7 9 7v9a2 2 0 01-2 2h-3v-7H8v7H5a2 2 0 01-2-2v-9z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>,
  clock: (p={}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/><path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  chat: (p={}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><path d="M4 5h16v11H8l-4 4V5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>,
  user: (p={}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  search: (p={}) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8"/><path d="M20 20l-4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  pin: (p={}) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}><path d="M12 22s7-7.6 7-13a7 7 0 10-14 0c0 5.4 7 13 7 13z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8"/></svg>,
  arrowR: (p={}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  arrowL: (p={}) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}><path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  menu: (p={}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  bell: (p={}) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}><path d="M6 16V11a6 6 0 1112 0v5l2 2H4l2-2zM10 20a2 2 0 004 0" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>,
  car: (p={}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><path d="M3 13l2-5a2 2 0 012-1.5h10a2 2 0 012 1.5l2 5v5h-2.5a2 2 0 11-4 0h-3a2 2 0 11-4 0H3v-5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>,
  cash: (p={}) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}><rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.8"/></svg>,
  card: (p={}) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}><rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M3 11h18" stroke="currentColor" strokeWidth="1.8"/></svg>,
  star: (p={}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.1 6.6 7.2.8-5.4 5 1.6 7.1L12 18l-6.5 3.5L7 14.4 1.7 9.4l7.2-.8L12 2z"/></svg>,
  phone: (p={}) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}><path d="M5 4h4l2 5-3 2a12 12 0 005 5l2-3 5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>,
  shield: (p={}) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}><path d="M12 3l8 3v6c0 5-4 9-8 10-4-1-8-5-8-10V6l8-3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>,
  check: (p={}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}><path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  x: (p={}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
  plus: (p={}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
  minus: (p={}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}><path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
  filter: (p={}) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}><path d="M3 5h18l-7 8v6l-4-2v-4L3 5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>,
  doc: (p={}) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}><path d="M6 3h9l5 5v13H6V3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M14 3v6h6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>,
  globe: (p={}) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" stroke="currentColor" strokeWidth="1.8"/></svg>,
  trip: (p={}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><circle cx="6" cy="6" r="2" stroke="currentColor" strokeWidth="1.8"/><circle cx="18" cy="18" r="2" stroke="currentColor" strokeWidth="1.8"/><path d="M6 8v3a3 3 0 003 3h6a3 3 0 013 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  more: (p={}) => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" {...p}><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg>,
  trend: (p={}) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}><path d="M3 17l6-6 4 4 7-8" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round"/><path d="M14 7h6v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  alert: (p={}) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}><path d="M12 3l10 17H2L12 3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M12 10v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><circle cx="12" cy="17" r="1" fill="currentColor"/></svg>,
  cog: (p={}) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/><path d="M19.4 15a1.7 1.7 0 00.4 1.9l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.9-.4 1.7 1.7 0 00-1 1.5V21a2 2 0 01-4 0v-.1a1.7 1.7 0 00-1-1.5 1.7 1.7 0 00-1.9.4l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.4-1.9 1.7 1.7 0 00-1.5-1H3a2 2 0 010-4h.1a1.7 1.7 0 001.5-1 1.7 1.7 0 00-.4-1.9l-.1-.1A2 2 0 016.9 4.3l.1.1a1.7 1.7 0 001.9.4H9a1.7 1.7 0 001-1.5V3a2 2 0 014 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.9-.4l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.4 1.9V9a1.7 1.7 0 001.5 1H21a2 2 0 010 4h-.1a1.7 1.7 0 00-1.5 1z" stroke="currentColor" strokeWidth="1.5"/></svg>,
  upload: (p={}) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}><path d="M12 16V4M6 10l6-6 6 6M4 20h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
};
