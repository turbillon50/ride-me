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


// RideMe — App store (auth, role, locale, navigation, mock data)
const RM_LOCALES = { es: window.RM_I18N_ES, en: window.RM_I18N_EN };

function useT() {
  const { locale } = React.useContext(RMStoreCtx);
  return RM_LOCALES[locale] || RM_LOCALES.es;
}

const RMStoreCtx = React.createContext(null);

function RMStoreProvider({ children }) {
  const [locale, setLocale] = React.useState('es');
  const [role, setRole] = React.useState('passenger'); // 'passenger' | 'driver' | 'admin'
  const [route, setRoute] = React.useState({ name: 'splash', params: {} });
  const [authed, setAuthed] = React.useState(false);
  const [tab, setTab] = React.useState('home'); // active bottom tab
  // app data (mocked)
  const [trip, setTrip] = React.useState(null);
  const [driverOnline, setDriverOnline] = React.useState(false);
  const [adminSection, setAdminSection] = React.useState('dashboard');

  const goto = React.useCallback((name, params={}) => {
    setRoute({ name, params });
    window.scrollTo?.(0, 0);
  }, []);

  const value = {
    locale, setLocale,
    role, setRole,
    route, goto,
    authed, setAuthed,
    tab, setTab,
    trip, setTrip,
    driverOnline, setDriverOnline,
    adminSection, setAdminSection,
  };
  return <RMStoreCtx.Provider value={value}>{children}</RMStoreCtx.Provider>;
}

function useStore() { return React.useContext(RMStoreCtx); }

// Mock data
const RM_MOCK = {
  recentPlaces: [
    { id: 'r1', name: 'Plaza Antara', addr: 'Av. Ejército Nal. 843, Granada', icon: 'pin' },
    { id: 'r2', name: 'Casa', addr: 'Calle Tonalá 156, Roma Norte', icon: 'home' },
    { id: 'r3', name: 'Trabajo', addr: 'Reforma 222, Juárez', icon: 'work' },
    { id: 'r4', name: 'Aeropuerto CDMX', addr: 'Terminal 1, Benito Juárez', icon: 'pin' },
  ],
  drivers: [
    { id: 'd1', name: 'Carlos M.', rating: 4.9, trips: 1240, eta: 3, distance: 0.8, price: 95, car: 'Nissan Versa', plate: 'ABC-123', color: 'Blanco', photo: '#5BD0FF' },
    { id: 'd2', name: 'María L.', rating: 4.95, trips: 2100, eta: 5, distance: 1.4, price: 88, car: 'Toyota Yaris', plate: 'XYZ-987', color: 'Gris', photo: '#FFB37C' },
    { id: 'd3', name: 'Jorge R.', rating: 4.8, trips: 540, eta: 7, distance: 1.9, price: 105, car: 'Chevy Aveo', plate: 'JKL-456', color: 'Negro', photo: '#A8B8FF' },
    { id: 'd4', name: 'Ana P.', rating: 4.7, trips: 320, eta: 9, distance: 2.6, price: 92, car: 'VW Vento', plate: 'MNO-321', color: 'Rojo', photo: '#FF9DB3' },
  ],
  history: [
    { id: 'h1', date: '28 abr', from: 'Roma Norte', to: 'Polanco', fare: 142, status: 'completed', driver: 'Carlos M.' },
    { id: 'h2', date: '26 abr', from: 'Casa', to: 'Aeropuerto CDMX', fare: 285, status: 'completed', driver: 'Lucía F.' },
    { id: 'h3', date: '24 abr', from: 'Centro', to: 'Coyoacán', fare: 98, status: 'cancelled', driver: '—' },
    { id: 'h4', date: '20 abr', from: 'Condesa', to: 'Santa Fe', fare: 215, status: 'completed', driver: 'Mario T.' },
  ],
  scheduled: [
    { id: 's1', when: 'Mañana 7:30', from: 'Casa', to: 'Aeropuerto T1', fare: 290 },
    { id: 's2', when: 'Sáb 10:00', from: 'Roma Norte', to: 'Tepoztlán', fare: 1450 },
  ],
  conversations: [
    { id: 'c1', who: 'Carlos M.', last: 'Ya estoy en la esquina', time: '2m', unread: 1, color: '#5BD0FF' },
    { id: 'c2', who: 'Soporte RideMe', last: '¿Cómo te fue con tu viaje?', time: '1h', unread: 0, color: '#2563EB' },
  ],
  driverRequests: [
    { id: 'q1', rider: 'Lucía F.', from: 'Roma Norte', to: 'Polanco', distance: 5.4, suggested: 110, riderPrice: 95, expiresIn: 18 },
    { id: 'q2', rider: 'Diego R.', from: 'Condesa', to: 'Coyoacán', distance: 8.2, suggested: 165, riderPrice: 150, expiresIn: 22 },
  ],
  driverEarnings: { today: 845, trips: 9, rating: 4.92, hours: 6.4 },
  adminStats: {
    users: 12480, drivers: 1832, tripsToday: 642, revenue: 84230,
    pendingDrivers: 14, alerts: 3,
    chart: [22,28,24,32,40,38,46,52,48,55,62,58,64,70,66,72,80,78],
  },
  adminRecentTrips: [
    { id: 't1', user: 'Lucía F.', driver: 'Carlos M.', from: 'Roma', to: 'Polanco', fare: 142, status: 'in_progress' },
    { id: 't2', user: 'Diego R.', driver: 'María L.', from: 'Condesa', to: 'Coyoacán', fare: 165, status: 'completed' },
    { id: 't3', user: 'Pablo G.', driver: 'Jorge R.', from: 'Centro', to: 'Santa Fe', fare: 215, status: 'completed' },
    { id: 't4', user: 'Sofía A.', driver: 'Ana P.', from: 'Doctores', to: 'Del Valle', fare: 92, status: 'cancelled' },
  ],
};

window.RMStoreCtx = RMStoreCtx;
window.RMStoreProvider = RMStoreProvider;
window.useStore = useStore;
window.useT = useT;
window.RM_MOCK = RM_MOCK;


// RideMe — UI primitives

function RMButton({ variant='primary', size='md', full=false, icon, children, onClick, disabled, style={} }) {
  const sizes = { sm: { h: 36, px: 14, fs: 13 }, md: { h: 48, px: 18, fs: 15 }, lg: { h: 56, px: 22, fs: 16 } };
  const s = sizes[size];
  const variants = {
    primary: { bg: 'var(--rm-blue)', col: '#fff', border: 'transparent', shadow: 'var(--rm-shadow-blue)' },
    primaryDark: { bg: 'var(--rm-navy)', col: '#fff', border: 'transparent', shadow: 'var(--rm-shadow-md)' },
    cyan: { bg: 'var(--rm-cyan)', col: '#0D1B3D', border: 'transparent', shadow: '0 8px 22px rgba(0,180,255,0.32)' },
    secondary: { bg: '#fff', col: 'var(--rm-navy)', border: 'var(--rm-border-strong)', shadow: 'var(--rm-shadow-xs)' },
    ghost: { bg: 'transparent', col: 'var(--rm-blue)', border: 'transparent', shadow: 'none' },
    danger: { bg: '#fff', col: 'var(--rm-red)', border: 'var(--rm-red)', shadow: 'none' },
    success: { bg: 'var(--rm-green)', col: '#fff', border: 'transparent', shadow: '0 8px 22px rgba(16,185,129,0.32)' },
  };
  const v = variants[variant] || variants.primary;
  return (
    <button onClick={onClick} disabled={disabled}
      style={{
        height: s.h, padding: `0 ${s.px}px`, borderRadius: 'var(--rm-r-full)',
        background: v.bg, color: v.col, border: `1.5px solid ${v.border}`,
        boxShadow: disabled ? 'none' : v.shadow,
        fontWeight: 600, fontSize: s.fs, letterSpacing: '-0.01em',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        width: full ? '100%' : 'auto', opacity: disabled ? 0.5 : 1,
        transition: 'transform 0.12s ease, box-shadow 0.2s ease',
        ...style,
      }}>
      {icon}{children}
    </button>
  );
}

function RMInput({ label, icon, value, onChange, placeholder, type='text', hint, error, suffix, ...rest }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--rm-text-2)' }}>{label}</label>}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        height: 50, padding: '0 14px',
        background: '#fff', border: `1.5px solid ${error ? 'var(--rm-red)' : 'var(--rm-border)'}`,
        borderRadius: 'var(--rm-r-md)',
      }}>
        {icon && <span style={{ color: 'var(--rm-text-3)' }}>{icon}</span>}
        <input type={type} value={value || ''} placeholder={placeholder}
          onChange={(e) => onChange?.(e.target.value)}
          style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 15, color: 'var(--rm-text)' }}
          {...rest}/>
        {suffix}
      </div>
      {(hint || error) && <div style={{ fontSize: 12, color: error ? 'var(--rm-red)' : 'var(--rm-text-3)' }}>{error || hint}</div>}
    </div>
  );
}

function RMCard({ children, padding=16, style={} }) {
  return <div style={{ background: '#fff', borderRadius: 'var(--rm-r-lg)', padding, boxShadow: 'var(--rm-shadow-sm)', ...style }}>{children}</div>;
}

function RMBadge({ tone='neutral', children, style={} }) {
  const map = {
    neutral: { bg: '#EEF2F8', col: 'var(--rm-text-2)' },
    blue:    { bg: '#E2ECFD', col: 'var(--rm-blue-700)' },
    cyan:    { bg: '#DEF4FF', col: '#006A99' },
    green:   { bg: 'var(--rm-green-bg)', col: 'var(--rm-green)' },
    amber:   { bg: 'var(--rm-amber-bg)', col: '#92580B' },
    red:     { bg: 'var(--rm-red-bg)',   col: 'var(--rm-red)' },
  }[tone];
  return <span style={{
    background: map.bg, color: map.col, fontSize: 11, fontWeight: 600,
    padding: '4px 10px', borderRadius: 'var(--rm-r-full)', display: 'inline-flex',
    alignItems: 'center', gap: 4, ...style
  }}>{children}</span>;
}

function RMAvatar({ name='?', color='#5BD0FF', size=40 }) {
  const initials = name.split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase();
  return <div style={{
    width: size, height: size, borderRadius: '50%',
    background: color, color: '#0D1B3D', fontWeight: 700,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: size * 0.38, flexShrink: 0
  }}>{initials}</div>;
}

function RMTopBar({ title, onBack, right, dark=false }) {
  return (
    <div style={{
      height: 56, padding: '0 12px', display: 'flex', alignItems: 'center', gap: 8,
      background: dark ? 'transparent' : '#fff',
      color: dark ? '#fff' : 'var(--rm-text)',
      borderBottom: dark ? 'none' : '1px solid var(--rm-border)',
      position: 'sticky', top: 0, zIndex: 20,
    }}>
      {onBack && (
        <button onClick={onBack} style={{ width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: dark ? 'rgba(255,255,255,0.15)' : 'var(--rm-bg)' }}>
          <RMIcon.arrowL/>
        </button>
      )}
      <div style={{ flex: 1, fontWeight: 700, fontSize: 17, letterSpacing: '-0.01em' }}>{title}</div>
      {right}
    </div>
  );
}

function RMTabBar({ tabs, active, onChange }) {
  return (
    <div style={{
      height: 72, background: '#fff', borderTop: '1px solid var(--rm-border)',
      display: 'flex', alignItems: 'stretch',
      paddingBottom: 'env(safe-area-inset-bottom)', flexShrink: 0,
    }}>
      {tabs.map(t => {
        const on = active === t.id;
        return (
          <button key={t.id} onClick={() => onChange(t.id)}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: 4, color: on ? 'var(--rm-blue)' : 'var(--rm-text-3)', fontSize: 11, fontWeight: 600,
            }}>
            <span style={{ position: 'relative' }}>
              {t.icon}
              {t.badge ? <span style={{ position: 'absolute', top: -2, right: -6, width: 8, height: 8, borderRadius: '50%', background: 'var(--rm-red)' }}/> : null}
            </span>
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

function RMEmpty({ icon, title, sub, action }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '40px 24px', gap: 10 }}>
      <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--rm-bg)', color: 'var(--rm-text-3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {icon}
      </div>
      <div style={{ fontWeight: 700, fontSize: 17, marginTop: 6 }}>{title}</div>
      {sub && <div style={{ color: 'var(--rm-text-2)', fontSize: 14, maxWidth: 260 }}>{sub}</div>}
      {action}
    </div>
  );
}

function RMLocaleToggle() {
  const { locale, setLocale } = useStore();
  return (
    <div style={{ display: 'inline-flex', background: 'var(--rm-bg)', borderRadius: 'var(--rm-r-full)', padding: 3 }}>
      {['es','en'].map(l => (
        <button key={l} onClick={() => setLocale(l)}
          style={{
            padding: '6px 12px', borderRadius: 'var(--rm-r-full)',
            fontSize: 12, fontWeight: 700,
            background: locale === l ? '#fff' : 'transparent',
            color: locale === l ? 'var(--rm-blue)' : 'var(--rm-text-3)',
            boxShadow: locale === l ? 'var(--rm-shadow-xs)' : 'none',
          }}>{l.toUpperCase()}</button>
      ))}
    </div>
  );
}

function RMRouteRow({ from, to }) {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 6 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', border: '2.5px solid var(--rm-blue)', background: '#fff' }}/>
        <div style={{ width: 2, flex: 1, background: 'var(--rm-border-strong)', margin: '4px 0', minHeight: 22 }}/>
        <div style={{ width: 10, height: 10, borderRadius: 2, background: 'var(--rm-navy)' }}/>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--rm-text-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Origen</div>
          <div style={{ fontWeight: 600, fontSize: 14 }}>{from}</div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: 'var(--rm-text-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Destino</div>
          <div style={{ fontWeight: 600, fontSize: 14 }}>{to}</div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  RMButton, RMInput, RMCard, RMBadge, RMAvatar,
  RMTopBar, RMTabBar, RMEmpty, RMLocaleToggle, RMRouteRow,
});


// RideMe — Auth screens (Splash, Welcome, Login, Signup, Role)
function RMSplash() {
  const { goto } = useStore();
  React.useEffect(() => { const t = setTimeout(() => goto('welcome'), 1400); return () => clearTimeout(t); }, []);
  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18,
      background: 'linear-gradient(160deg, #0D1B3D 0%, #1A45BF 60%, #2563EB 100%)', color: '#fff',
    }}>
      <div style={{ animation: 'rm-fade-in 0.5s ease both' }}>
        <RMLogoMark size={88} cyan="#00B4FF" />
      </div>
      <div style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 36, letterSpacing: '-0.03em' }}>
        Ride<span style={{ color: 'var(--rm-cyan)' }}>Me</span>
      </div>
      <div style={{ opacity: 0.78, fontSize: 14 }}>Tu ride, tu destino.</div>
      <div style={{ marginTop: 20, display: 'flex', gap: 6 }}>
        {[0,1,2].map(i => (
          <span key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff',
            animation: `rm-dot-bounce 1.2s ${i * 0.15}s infinite ease-in-out` }}/>
        ))}
      </div>
    </div>
  );
}

function RMWelcome() {
  const t = useT();
  const { goto } = useStore();
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff' }}>
      <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 5 }}><RMLocaleToggle/></div>
      <div style={{
        flex: 1, position: 'relative',
        background: 'linear-gradient(180deg, #2563EB 0%, #1A45BF 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
      }}>
        {/* radar pulse */}
        {[0,1,2].map(i => (
          <div key={i} style={{
            position: 'absolute', width: 80, height: 80, borderRadius: '50%',
            border: '2px solid rgba(255,255,255,0.4)', animation: `rm-radar 2.6s ${i * 0.7}s infinite ease-out`,
          }}/>
        ))}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, color: '#fff' }}>
          <RMLogoMark size={84} />
          <div style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 38, letterSpacing: '-0.03em' }}>
            Ride<span style={{ color: 'var(--rm-cyan)' }}>Me</span>
          </div>
          <div style={{ fontSize: 14, opacity: 0.85 }}>{t.tagline}</div>
        </div>
      </div>
      <div style={{ padding: '24px 24px 28px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em', textAlign: 'center', marginBottom: 4 }}>
          {t.brand}
        </div>
        <div style={{ color: 'var(--rm-text-2)', fontSize: 14, textAlign: 'center', marginBottom: 10 }}>
          {t.tagline} {t.negotiateHint}
        </div>
        <RMButton variant="primary" full onClick={() => goto('login')}>{t.signIn}</RMButton>
        <RMButton variant="secondary" full onClick={() => goto('signup')}>{t.signUp}</RMButton>
        <div style={{ fontSize: 11, color: 'var(--rm-text-3)', textAlign: 'center', marginTop: 8, lineHeight: 1.5 }}>{t.terms}</div>
      </div>
    </div>
  );
}

function RMLogin() {
  const t = useT(); const { goto, setAuthed } = useStore();
  const [email, setEmail] = React.useState('lucia@example.com');
  const [pw, setPw] = React.useState('••••••••');
  const [loading, setLoading] = React.useState(false);

  const submit = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setAuthed(true); goto('roleSelect'); }, 800);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff' }}>
      <RMTopBar onBack={() => goto('welcome')} title={t.signIn} right={<RMLocaleToggle/>}/>
      <div style={{ flex: 1, padding: '8px 24px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <RMLogoMark size={56}/>
          <div style={{ fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em' }}>{t.signIn}</div>
        </div>
        <RMInput label={t.email} value={email} onChange={setEmail} placeholder="tucorreo@…"/>
        <RMInput label={t.password} type="password" value={pw} onChange={setPw}/>
        <div style={{ alignSelf: 'flex-end', fontSize: 13, color: 'var(--rm-blue)', fontWeight: 600 }}>{t.forgot}</div>
        <RMButton variant="primary" full onClick={submit} disabled={loading}>
          {loading ? <span className="rm-spinner" style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', animation: 'rm-spin 0.8s linear infinite' }}/> : t.signIn}
        </RMButton>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '8px 0' }}>
          <div style={{ flex: 1, height: 1, background: 'var(--rm-border)' }}/>
          <span style={{ fontSize: 12, color: 'var(--rm-text-3)' }}>{t.orContinue}</span>
          <div style={{ flex: 1, height: 1, background: 'var(--rm-border)' }}/>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <RMButton variant="secondary" full>Google</RMButton>
          <RMButton variant="secondary" full>Apple</RMButton>
        </div>
        <div style={{ textAlign: 'center', marginTop: 12, fontSize: 13, color: 'var(--rm-text-2)' }}>
          {t.noAccount} <span style={{ color: 'var(--rm-blue)', fontWeight: 700 }} onClick={() => goto('signup')}>{t.signUp}</span>
        </div>
      </div>
    </div>
  );
}

function RMSignup() {
  const t = useT(); const { goto, setAuthed } = useStore();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [pw, setPw] = React.useState('');
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff' }}>
      <RMTopBar onBack={() => goto('welcome')} title={t.signUp} right={<RMLocaleToggle/>}/>
      <div style={{ flex: 1, padding: '8px 24px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <RMInput label={t.fullName} value={name} onChange={setName} placeholder="Lucía Fernández"/>
        <RMInput label={t.email} value={email} onChange={setEmail} placeholder="lucia@example.com"/>
        <RMInput label={t.phone} value={phone} onChange={setPhone} placeholder="+52 55 …"/>
        <RMInput label={t.password} type="password" value={pw} onChange={setPw} placeholder="Mínimo 8 caracteres"/>
        <div style={{ fontSize: 11, color: 'var(--rm-text-3)', lineHeight: 1.5 }}>{t.terms}</div>
        <RMButton variant="primary" full onClick={() => { setAuthed(true); goto('roleSelect'); }}>{t.continue}</RMButton>
        <div style={{ textAlign: 'center', marginTop: 8, fontSize: 13, color: 'var(--rm-text-2)' }}>
          {t.haveAccount} <span style={{ color: 'var(--rm-blue)', fontWeight: 700 }} onClick={() => goto('login')}>{t.signIn}</span>
        </div>
      </div>
    </div>
  );
}

function RMRoleSelect() {
  const t = useT(); const { goto, setRole } = useStore();
  const pick = (r) => {
    setRole(r);
    if (r === 'passenger') goto('passengerHome');
    else if (r === 'driver') goto('driverDashboard');
    else goto('adminDashboard');
  };
  const Card = ({ id, title, sub, color, icon }) => (
    <button onClick={() => pick(id)} style={{
      width: '100%', textAlign: 'left', padding: 18, borderRadius: 'var(--rm-r-lg)',
      background: '#fff', border: '1.5px solid var(--rm-border)',
      display: 'flex', alignItems: 'center', gap: 14, boxShadow: 'var(--rm-shadow-sm)',
    }}>
      <div style={{ width: 56, height: 56, borderRadius: 'var(--rm-r-md)', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: 16 }}>{title}</div>
        <div style={{ fontSize: 13, color: 'var(--rm-text-2)' }}>{sub}</div>
      </div>
      <RMIcon.arrowR style={{ color: 'var(--rm-text-3)' }}/>
    </button>
  );
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--rm-bg)' }}>
      <RMTopBar onBack={() => goto('welcome')} title={t.chooseRole} right={<RMLocaleToggle/>}/>
      <div style={{ padding: '12px 20px', color: 'var(--rm-text-2)', fontSize: 13 }}>{t.chooseRoleSub}</div>
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Card id="passenger" title={t.rolePassenger} sub="Pide un viaje y elige el mejor precio" color="var(--rm-blue)" icon={<RMIcon.user/>}/>
        <Card id="driver" title={t.roleDriver} sub="Recibe solicitudes y envía ofertas" color="var(--rm-navy)" icon={<RMIcon.car/>}/>
        <Card id="admin" title={t.roleAdmin} sub="Gestiona la plataforma" color="var(--rm-cyan)" icon={<RMIcon.cog/>}/>
      </div>
    </div>
  );
}

Object.assign(window, { RMSplash, RMWelcome, RMLogin, RMSignup, RMRoleSelect });


// RideMe — Passenger screens
function RMPassengerHome() {
  const t = useT(); const { goto, setTrip } = useStore();
  const [dest, setDest] = React.useState('');
  const [showSheet, setShowSheet] = React.useState(false);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', background: 'var(--rm-bg)' }}>
      {/* Map background */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <RMMap showRoute={false} showDriverDots={6}/>
      </div>
      {/* Top floating bar */}
      <div style={{ position: 'relative', zIndex: 5, padding: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
        <button onClick={() => goto('passengerProfile')} style={{
          width: 44, height: 44, borderRadius: '50%', background: '#fff', boxShadow: 'var(--rm-shadow-md)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}><RMIcon.menu/></button>
        <div style={{ flex: 1 }}/>
        <RMLocaleToggle/>
        <button style={{
          width: 44, height: 44, borderRadius: '50%', background: '#fff', boxShadow: 'var(--rm-shadow-md)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--rm-blue)'
        }}><RMIcon.bell/></button>
      </div>
      {/* Spacer to push sheet down */}
      <div style={{ flex: 1 }}/>
      {/* Bottom sheet */}
      <div style={{
        position: 'relative', zIndex: 5, background: '#fff',
        borderRadius: '24px 24px 0 0', boxShadow: '0 -8px 30px rgba(13,27,61,0.12)',
        padding: '14px 18px 18px',
      }}>
        <div style={{ width: 40, height: 4, background: 'var(--rm-border-strong)', borderRadius: 2, margin: '0 auto 12px' }}/>
        <div style={{ fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em', marginBottom: 12 }}>{t.whereTo}</div>
        <button onClick={() => setShowSheet(true)} style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 12,
          padding: '14px 16px', background: 'var(--rm-bg)', borderRadius: 'var(--rm-r-md)',
          color: 'var(--rm-text-3)', fontSize: 15, textAlign: 'left',
        }}>
          <RMIcon.search/> <span style={{ flex: 1 }}>{t.whereTo}</span>
          <RMBadge tone="cyan">{t.now}</RMBadge>
        </button>
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          {RM_MOCK.recentPlaces.slice(0, 3).map(p => (
            <button key={p.id} onClick={() => { setDest(p.name); setShowSheet(true); }} style={{
              flex: 1, padding: 12, background: 'var(--rm-surface-alt)', borderRadius: 'var(--rm-r-md)',
              border: '1px solid var(--rm-border)', textAlign: 'left',
              display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0,
            }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: '#E2ECFD', color: 'var(--rm-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <RMIcon.pin/>
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
              <div style={{ fontSize: 10, color: 'var(--rm-text-3)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.addr}</div>
            </button>
          ))}
        </div>
      </div>

      {showSheet && <RMOriginDestSheet dest={dest} setDest={setDest} onClose={() => setShowSheet(false)} onContinue={(o, d) => {
        setTrip({ from: o, to: d, status: 'price' }); setShowSheet(false); goto('passengerPrice');
      }}/>}
    </div>
  );
}

function RMOriginDestSheet({ dest, setDest, onClose, onContinue }) {
  const t = useT();
  const [origin, setOrigin] = React.useState('Mi ubicación actual');
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 30, background: 'rgba(13,27,61,0.4)', display: 'flex', flexDirection: 'column' }}>
      <div onClick={onClose} style={{ flex: 1 }}/>
      <div style={{ background: '#fff', borderRadius: '20px 20px 0 0', padding: '14px 18px 18px',
        animation: 'rm-slide-up 0.25s ease both', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ width: 40, height: 4, background: 'var(--rm-border-strong)', borderRadius: 2, margin: '0 auto 8px' }}/>
        <div style={{ fontWeight: 800, fontSize: 18 }}>{t.whereTo}</div>
        <RMInput icon={<span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--rm-blue)', display: 'inline-block' }}/>}
          value={origin} onChange={setOrigin} placeholder={t.origin}/>
        <RMInput icon={<span style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--rm-navy)', display: 'inline-block' }}/>}
          value={dest} onChange={setDest} placeholder={t.destination} autoFocus/>
        <div style={{ fontSize: 12, color: 'var(--rm-text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 6 }}>{t.recent}</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {RM_MOCK.recentPlaces.map(p => (
            <button key={p.id} onClick={() => setDest(p.name)} style={{
              display: 'flex', gap: 12, padding: '12px 4px', alignItems: 'center', textAlign: 'left',
              borderBottom: '1px solid var(--rm-border)',
            }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--rm-bg)', color: 'var(--rm-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <RMIcon.pin/>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: 'var(--rm-text-3)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.addr}</div>
              </div>
            </button>
          ))}
        </div>
        <RMButton variant="primary" full onClick={() => onContinue(origin, dest || 'Plaza Antara')} disabled={!dest && !origin}>
          {t.continue}
        </RMButton>
      </div>
    </div>
  );
}

function RMPassengerPrice() {
  const t = useT(); const { goto, trip, setTrip } = useStore();
  const suggested = 110;
  const [price, setPrice] = React.useState(suggested);
  const [pay, setPay] = React.useState('cash');
  const from = trip?.from || 'Mi ubicación';
  const to = trip?.to || 'Plaza Antara';
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff' }}>
      <div style={{ height: 240, position: 'relative' }}>
        <RMMap showRoute showDriverDots={3} height="100%"/>
        <button onClick={() => goto('passengerHome')} style={{
          position: 'absolute', top: 12, left: 12,
          width: 40, height: 40, borderRadius: '50%', background: '#fff', boxShadow: 'var(--rm-shadow-md)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}><RMIcon.arrowL/></button>
      </div>
      <div style={{ flex: 1, padding: '16px 20px 20px', display: 'flex', flexDirection: 'column', gap: 14, overflow: 'auto' }} className="rm-scroll">
        <RMCard padding={14}>
          <RMRouteRow from={from} to={to}/>
        </RMCard>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>{t.proposedFare}</div>
            <div style={{ fontSize: 12, color: 'var(--rm-text-3)' }}>{t.fareSuggestion}: ${suggested}</div>
          </div>
          <RMCard padding={16}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <button onClick={() => setPrice(Math.max(40, price - 5))} style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--rm-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <RMIcon.minus/>
              </button>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 44, letterSpacing: '-0.04em', color: 'var(--rm-navy)' }}>${price}</div>
                <div style={{ fontSize: 12, color: 'var(--rm-text-3)' }}>MXN · {t.negotiateHint}</div>
              </div>
              <button onClick={() => setPrice(price + 5)} style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--rm-blue)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <RMIcon.plus/>
              </button>
            </div>
            <div style={{ marginTop: 12 }}>
              <input type="range" min="40" max="200" step="5" value={price}
                onChange={(e) => setPrice(+e.target.value)}
                style={{ width: '100%', accentColor: 'var(--rm-blue)' }}/>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--rm-text-3)' }}>
                <span>$40</span><span>$200</span>
              </div>
            </div>
          </RMCard>
        </div>

        <div>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{t.paymentMethod}</div>
          <div style={{ display: 'flex', gap: 10 }}>
            {[
              { id: 'cash', label: t.cash, icon: <RMIcon.cash/> },
              { id: 'card', label: t.card + ' •• 4242', icon: <RMIcon.card/> },
            ].map(p => (
              <button key={p.id} onClick={() => setPay(p.id)} style={{
                flex: 1, padding: 12, borderRadius: 'var(--rm-r-md)',
                background: pay === p.id ? '#E2ECFD' : '#fff',
                border: `1.5px solid ${pay === p.id ? 'var(--rm-blue)' : 'var(--rm-border)'}`,
                display: 'flex', alignItems: 'center', gap: 10, color: pay === p.id ? 'var(--rm-blue)' : 'var(--rm-text)',
                fontWeight: 600, fontSize: 14,
              }}>
                {p.icon}{p.label}
              </button>
            ))}
          </div>
        </div>

        <RMButton variant="primary" size="lg" full onClick={() => {
          setTrip({ ...trip, price, pay, status: 'searching' }); goto('passengerSearching');
        }}>{t.searchDrivers}</RMButton>
      </div>
    </div>
  );
}

Object.assign(window, { RMPassengerHome, RMPassengerPrice });


// RideMe — Passenger flow part 2: searching, offers, confirmed, in-progress, rating
function RMPassengerSearching() {
  const t = useT(); const { goto, trip } = useStore();
  const [secs, setSecs] = React.useState(28);
  React.useEffect(() => {
    const timer = setInterval(() => setSecs(s => Math.max(0, s - 1)), 1000);
    const advance = setTimeout(() => goto('passengerOffers'), 3500);
    return () => { clearInterval(timer); clearTimeout(advance); };
  }, []);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0 }}><RMMap showRoute showDriverDots={5}/></div>
      <div style={{ position: 'relative', padding: 12 }}>
        <button onClick={() => goto('passengerHome')} style={{
          width: 40, height: 40, borderRadius: '50%', background: '#fff', boxShadow: 'var(--rm-shadow-md)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}><RMIcon.arrowL/></button>
      </div>
      <div style={{ flex: 1 }}/>
      <div style={{ position: 'relative', background: '#fff', borderRadius: '24px 24px 0 0',
        padding: '24px 20px 20px', boxShadow: '0 -8px 30px rgba(13,27,61,0.12)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
        <div style={{ position: 'relative', width: 84, height: 84, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {[0,1,2].map(i => (
            <div key={i} style={{ position: 'absolute', width: 60, height: 60, borderRadius: '50%',
              border: '2px solid var(--rm-blue)', animation: `rm-radar 2.4s ${i*0.7}s infinite ease-out` }}/>
          ))}
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--rm-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', position: 'relative', boxShadow: 'var(--rm-shadow-blue)' }}>
            <RMIcon.car/>
          </div>
        </div>
        <div style={{ fontWeight: 800, fontSize: 19, letterSpacing: '-0.02em' }}>{t.searching}…</div>
        <div style={{ fontSize: 13, color: 'var(--rm-text-2)', textAlign: 'center' }}>{t.searchingSub}</div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', background: 'var(--rm-bg)', borderRadius: 'var(--rm-r-md)' }}>
          <div style={{ fontSize: 13, color: 'var(--rm-text-2)' }}>{t.expiresIn}</div>
          <div style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 18, color: 'var(--rm-navy)' }}>00:{String(secs).padStart(2,'0')}</div>
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
          <span style={{ color: 'var(--rm-text-3)' }}>{t.proposedFare}</span>
          <span style={{ fontWeight: 700 }}>${trip?.price || 110} MXN · {trip?.pay === 'cash' ? t.cash : t.card}</span>
        </div>
        <RMButton variant="danger" full onClick={() => goto('passengerHome')}>{t.cancelRequest}</RMButton>
      </div>
    </div>
  );
}

function RMPassengerOffers() {
  const t = useT(); const { goto, trip, setTrip } = useStore();
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--rm-bg)' }}>
      <div style={{ height: 180, position: 'relative' }}>
        <RMMap showRoute showDriverDots={4}/>
        <button onClick={() => goto('passengerSearching')} style={{
          position: 'absolute', top: 12, left: 12, width: 40, height: 40, borderRadius: '50%',
          background: '#fff', boxShadow: 'var(--rm-shadow-md)', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}><RMIcon.arrowL/></button>
        <div style={{ position: 'absolute', top: 12, right: 12, padding: '8px 12px', background: '#fff',
          borderRadius: 'var(--rm-r-full)', boxShadow: 'var(--rm-shadow-md)', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--rm-green)', animation: 'rm-pulse 1.6s infinite' }}/>
          {RM_MOCK.drivers.length} {t.driverOffers.toLowerCase()}
        </div>
      </div>
      <div style={{ flex: 1, padding: '14px 16px 16px', overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }} className="rm-scroll">
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <div style={{ fontWeight: 800, fontSize: 18, letterSpacing: '-0.01em' }}>{t.driverOffers}</div>
          <div style={{ fontSize: 12, color: 'var(--rm-text-3)' }}>{t.proposedFare}: ${trip?.price || 110}</div>
        </div>
        {RM_MOCK.drivers.map(d => (
          <RMCard key={d.id} padding={14}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <RMAvatar name={d.name} color={d.photo} size={48}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{d.name}</div>
                  <RMIcon.star style={{ color: '#F59E0B', width: 14, height: 14 }}/>
                  <span style={{ fontSize: 12, fontWeight: 600 }}>{d.rating}</span>
                  <span style={{ fontSize: 12, color: 'var(--rm-text-3)' }}>· {d.trips}</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--rm-text-2)' }}>{d.car} · {d.color} · {d.plate}</div>
                <div style={{ marginTop: 6, display: 'flex', gap: 8, fontSize: 11 }}>
                  <RMBadge tone="blue">{t.eta}: {d.eta} {t.etaMin}</RMBadge>
                  <RMBadge tone="neutral">{d.distance} {t.km}</RMBadge>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 22, letterSpacing: '-0.03em', color: 'var(--rm-navy)' }}>${d.price}</div>
                <RMButton variant="primary" size="sm" onClick={() => {
                  setTrip({ ...trip, driver: d, fare: d.price, status: 'confirmed' });
                  goto('passengerConfirmed');
                }}>{t.accept}</RMButton>
              </div>
            </div>
          </RMCard>
        ))}
      </div>
    </div>
  );
}

function RMPassengerConfirmed() {
  const t = useT(); const { goto, trip } = useStore();
  const d = trip?.driver || RM_MOCK.drivers[0];
  React.useEffect(() => { const x = setTimeout(() => goto('passengerInProgress'), 2200); return () => clearTimeout(x); }, []);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--rm-bg)' }}>
      <div style={{ flex: 1, position: 'relative' }}><RMMap showRoute showDriverDots={1}/></div>
      <div style={{ background: '#fff', borderRadius: '24px 24px 0 0', padding: '20px', boxShadow: '0 -8px 30px rgba(13,27,61,0.12)' }}>
        <div style={{ width: 40, height: 4, background: 'var(--rm-border-strong)', borderRadius: 2, margin: '0 auto 14px' }}/>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--rm-green-bg)', color: 'var(--rm-green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <RMIcon.check/>
          </div>
          <div style={{ fontWeight: 800, fontSize: 18 }}>{t.tripConfirmed}</div>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 12, background: 'var(--rm-surface-alt)', borderRadius: 'var(--rm-r-md)' }}>
          <RMAvatar name={d.name} color={d.photo} size={48}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>{d.name}</div>
            <div style={{ fontSize: 12, color: 'var(--rm-text-2)' }}>{d.car} · {d.plate}</div>
          </div>
          <div style={{ fontWeight: 800, fontSize: 18 }}>${d.price}</div>
        </div>
        <div style={{ marginTop: 14, fontSize: 13, color: 'var(--rm-text-2)', textAlign: 'center' }}>
          {t.onTheWay} · {t.eta} {d.eta} {t.etaMin}
        </div>
      </div>
    </div>
  );
}

function RMPassengerInProgress() {
  const t = useT(); const { goto, trip } = useStore();
  const d = trip?.driver || RM_MOCK.drivers[0];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--rm-bg)' }}>
      <div style={{ flex: 1, position: 'relative' }}>
        <RMMap showRoute/>
        <div style={{ position: 'absolute', top: 12, left: 12, padding: '8px 12px', background: 'var(--rm-blue)',
          color: '#fff', borderRadius: 'var(--rm-r-full)', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6,
          boxShadow: 'var(--rm-shadow-blue)' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff', animation: 'rm-pulse 1.6s infinite' }}/>
          {t.tripInProgress}
        </div>
        <div style={{ position: 'absolute', top: 12, right: 12, padding: '8px 14px', background: '#fff',
          borderRadius: 'var(--rm-r-full)', fontSize: 12, fontWeight: 700, boxShadow: 'var(--rm-shadow-md)' }}>
          {t.eta}: 8 {t.etaMin}
        </div>
      </div>
      <div style={{ background: '#fff', borderRadius: '24px 24px 0 0', padding: '20px', boxShadow: '0 -8px 30px rgba(13,27,61,0.12)' }}>
        <div style={{ width: 40, height: 4, background: 'var(--rm-border-strong)', borderRadius: 2, margin: '0 auto 14px' }}/>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <RMAvatar name={d.name} color={d.photo} size={52}/>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>{d.name}</div>
            <div style={{ fontSize: 12, color: 'var(--rm-text-2)' }}>{d.car} · {d.color} · {d.plate}</div>
          </div>
          <button style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--rm-green)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><RMIcon.phone/></button>
          <button onClick={() => goto('passengerChat')} style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--rm-blue)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><RMIcon.chat/></button>
        </div>
        <div style={{ marginTop: 14, padding: 12, background: 'var(--rm-surface-alt)', borderRadius: 'var(--rm-r-md)' }}>
          <RMRouteRow from={trip?.from || 'Roma Norte'} to={trip?.to || 'Polanco'}/>
        </div>
        <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 4px' }}>
          <div>
            <div style={{ fontSize: 12, color: 'var(--rm-text-3)' }}>{t.agreedFare}</div>
            <div style={{ fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em' }}>${d.price} MXN</div>
          </div>
          <RMBadge tone="blue">{trip?.pay === 'cash' ? t.cash : t.card}</RMBadge>
        </div>
        <RMButton variant="primary" full onClick={() => goto('passengerRating')}>{t.finishTrip}</RMButton>
      </div>
    </div>
  );
}

function RMPassengerRating() {
  const t = useT(); const { goto, trip } = useStore();
  const d = trip?.driver || RM_MOCK.drivers[0];
  const [stars, setStars] = React.useState(5);
  const [comment, setComment] = React.useState('');
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff' }}>
      <RMTopBar title={t.rateDriver} onBack={() => goto('passengerHome')}/>
      <div style={{ flex: 1, padding: 24, display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'center' }}>
        <RMAvatar name={d.name} color={d.photo} size={88}/>
        <div style={{ fontWeight: 800, fontSize: 22 }}>{d.name}</div>
        <div style={{ fontSize: 13, color: 'var(--rm-text-2)' }}>{d.car} · ${d.price} MXN</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {[1,2,3,4,5].map(n => (
            <button key={n} onClick={() => setStars(n)} style={{ width: 44, height: 44, color: n <= stars ? '#F59E0B' : '#D6E0EE' }}>
              <svg width="44" height="44" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.1 6.6 7.2.8-5.4 5 1.6 7.1L12 18l-6.5 3.5L7 14.4 1.7 9.4l7.2-.8L12 2z"/></svg>
            </button>
          ))}
        </div>
        <div style={{ width: '100%' }}>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)}
            placeholder={t.leaveComment} rows={3}
            style={{ width: '100%', padding: 14, borderRadius: 'var(--rm-r-md)', border: '1.5px solid var(--rm-border)', resize: 'none', fontSize: 14, fontFamily: 'inherit' }}/>
        </div>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <RMButton variant="primary" full onClick={() => goto('passengerHome')}>{t.submitRating}</RMButton>
          <button style={{ fontSize: 13, color: 'var(--rm-red)', fontWeight: 600, padding: 8 }}>{t.report}</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { RMPassengerSearching, RMPassengerOffers, RMPassengerConfirmed, RMPassengerInProgress, RMPassengerRating });


// RideMe — Passenger: scheduled, history, messages, profile
function RMPassengerScheduled() {
  const t = useT(); const { goto } = useStore();
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--rm-bg)' }}>
      <RMTopBar title={t.scheduledRides} right={<RMButton variant="ghost" size="sm" icon={<RMIcon.plus/>}>{t.newScheduled}</RMButton>}/>
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }} className="rm-scroll">
        {RM_MOCK.scheduled.map(s => (
          <RMCard key={s.id} padding={14}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <RMBadge tone="blue">{s.when}</RMBadge>
              <span style={{ fontWeight: 800 }}>${s.fare}</span>
            </div>
            <RMRouteRow from={s.from} to={s.to}/>
            <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
              <RMButton variant="secondary" size="sm" full>{t.edit}</RMButton>
              <RMButton variant="danger" size="sm" full>{t.cancel}</RMButton>
            </div>
          </RMCard>
        ))}
        {RM_MOCK.scheduled.length === 0 && <RMEmpty icon={<RMIcon.clock/>} title={t.noScheduled}/>}
      </div>
    </div>
  );
}

function RMPassengerHistory() {
  const t = useT();
  const [filter, setFilter] = React.useState('all');
  const filtered = RM_MOCK.history.filter(h => filter === 'all' || h.status === filter);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--rm-bg)' }}>
      <RMTopBar title={t.rideHistory}/>
      <div style={{ padding: '8px 16px', display: 'flex', gap: 8 }}>
        {[
          { id: 'all', label: t.filterAll },
          { id: 'completed', label: t.completed },
          { id: 'cancelled', label: t.cancelled },
        ].map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} style={{
            padding: '8px 14px', borderRadius: 'var(--rm-r-full)', fontSize: 13, fontWeight: 600,
            background: filter === f.id ? 'var(--rm-blue)' : '#fff',
            color: filter === f.id ? '#fff' : 'var(--rm-text-2)',
            border: filter === f.id ? '1.5px solid var(--rm-blue)' : '1.5px solid var(--rm-border)',
          }}>{f.label}</button>
        ))}
      </div>
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }} className="rm-scroll">
        {filtered.map(h => (
          <RMCard key={h.id} padding={14}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 12, color: 'var(--rm-text-3)' }}>{h.date}</span>
              <RMBadge tone={h.status === 'completed' ? 'green' : 'red'}>{h.status === 'completed' ? t.completed : t.cancelled}</RMBadge>
            </div>
            <RMRouteRow from={h.from} to={h.to}/>
            <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--rm-border)', paddingTop: 10 }}>
              <span style={{ fontSize: 12, color: 'var(--rm-text-2)' }}>{h.driver}</span>
              <span style={{ fontWeight: 800, fontSize: 16 }}>${h.fare}</span>
            </div>
          </RMCard>
        ))}
        {filtered.length === 0 && <RMEmpty icon={<RMIcon.trip/>} title={t.empty}/>}
      </div>
    </div>
  );
}

function RMPassengerMessages() {
  const t = useT(); const { goto } = useStore();
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff' }}>
      <RMTopBar title={t.messages || 'Mensajes'}/>
      <div style={{ flex: 1, overflow: 'auto' }} className="rm-scroll">
        {RM_MOCK.conversations.map(c => (
          <button key={c.id} onClick={() => goto('passengerChat')} style={{
            width: '100%', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
            borderBottom: '1px solid var(--rm-border)', textAlign: 'left',
          }}>
            <RMAvatar name={c.who} color={c.color} size={48}/>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{c.who}</div>
                <div style={{ fontSize: 11, color: 'var(--rm-text-3)' }}>{c.time}</div>
              </div>
              <div style={{ fontSize: 13, color: 'var(--rm-text-2)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.last}</div>
            </div>
            {c.unread > 0 && <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--rm-blue)', color: '#fff', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{c.unread}</div>}
          </button>
        ))}
      </div>
    </div>
  );
}

function RMPassengerChat() {
  const t = useT(); const { goto } = useStore();
  const [input, setInput] = React.useState('');
  const [msgs, setMsgs] = React.useState([
    { id: 1, from: 'them', text: 'Hola, ya estoy en camino.', time: '12:42' },
    { id: 2, from: 'me', text: '¡Perfecto! Estoy en la entrada.', time: '12:43' },
    { id: 3, from: 'them', text: 'Ya estoy en la esquina', time: '12:45' },
  ]);
  const send = () => {
    if (!input.trim()) return;
    setMsgs([...msgs, { id: Date.now(), from: 'me', text: input, time: '12:46' }]);
    setInput('');
  };
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#F6F9FD' }}>
      <RMTopBar onBack={() => goto('passengerMessages')} title="Carlos M." right={<button style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--rm-green)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><RMIcon.phone/></button>}/>
      <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 8, overflow: 'auto' }} className="rm-scroll">
        {msgs.map(m => (
          <div key={m.id} style={{ alignSelf: m.from === 'me' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
            <div style={{
              padding: '10px 14px', borderRadius: 18,
              background: m.from === 'me' ? 'var(--rm-blue)' : '#fff',
              color: m.from === 'me' ? '#fff' : 'var(--rm-text)',
              fontSize: 14, boxShadow: 'var(--rm-shadow-xs)',
              borderBottomRightRadius: m.from === 'me' ? 4 : 18,
              borderBottomLeftRadius: m.from === 'me' ? 18 : 4,
            }}>{m.text}</div>
            <div style={{ fontSize: 10, color: 'var(--rm-text-3)', marginTop: 2, textAlign: m.from === 'me' ? 'right' : 'left' }}>{m.time}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: 12, background: '#fff', borderTop: '1px solid var(--rm-border)', display: 'flex', gap: 8, alignItems: 'center' }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={t.typeMessage}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          style={{ flex: 1, padding: '12px 14px', borderRadius: 'var(--rm-r-full)', border: 'none', background: 'var(--rm-bg)', fontSize: 14, outline: 'none' }}/>
        <button onClick={send} style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--rm-blue)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <RMIcon.arrowR/>
        </button>
      </div>
    </div>
  );
}

function RMPassengerProfile() {
  const t = useT(); const { goto, setRole, setAuthed } = useStore();
  const Row = ({ icon, label, right, onClick, danger }) => (
    <button onClick={onClick} style={{
      width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
      background: '#fff', borderBottom: '1px solid var(--rm-border)', textAlign: 'left',
      color: danger ? 'var(--rm-red)' : 'var(--rm-text)',
    }}>
      <span style={{ width: 36, height: 36, borderRadius: 10, background: danger ? 'var(--rm-red-bg)' : 'var(--rm-bg)', color: danger ? 'var(--rm-red)' : 'var(--rm-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</span>
      <span style={{ flex: 1, fontWeight: 600, fontSize: 15 }}>{label}</span>
      {right || <RMIcon.arrowR style={{ color: 'var(--rm-text-3)' }}/>}
    </button>
  );
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--rm-bg)' }}>
      <div style={{ background: 'linear-gradient(160deg, var(--rm-navy) 0%, var(--rm-blue) 100%)', color: '#fff', padding: '20px 20px 30px', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <div style={{ fontWeight: 800, fontSize: 18 }}>{t.profile || 'Perfil'}</div>
          <RMLocaleToggle/>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <RMAvatar name="Lucía Fernández" color="#5BD0FF" size={64}/>
          <div>
            <div style={{ fontWeight: 800, fontSize: 18 }}>Lucía Fernández</div>
            <div style={{ fontSize: 13, opacity: 0.85 }}>lucia@example.com</div>
            <div style={{ marginTop: 6, display: 'flex', gap: 8 }}>
              <RMBadge tone="cyan"><RMIcon.star style={{ width: 12, height: 12 }}/> 4.9</RMBadge>
              <RMBadge tone="blue">142 viajes</RMBadge>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: -16, padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <RMCard padding={0} style={{ overflow: 'hidden' }}>
          <Row icon={<RMIcon.user/>} label={t.personalInfo}/>
          <Row icon={<RMIcon.card/>} label={t.paymentMethods} right={<RMBadge tone="neutral">3</RMBadge>}/>
          <Row icon={<RMIcon.shield/>} label={t.security}/>
          <Row icon={<RMIcon.bell/>} label={t.notifications}/>
        </RMCard>
        <RMCard padding={0} style={{ overflow: 'hidden' }}>
          <Row icon={<RMIcon.car/>} label={t.becomeDriver} onClick={() => { setRole('driver'); goto('driverDashboard'); }}/>
          <Row icon={<RMIcon.cog/>} label={t.adminDashboard} onClick={() => { setRole('admin'); goto('adminDashboard'); }}/>
          <Row icon={<RMIcon.doc/>} label={t.help}/>
        </RMCard>
        <RMCard padding={0} style={{ overflow: 'hidden' }}>
          <Row icon={<RMIcon.x/>} label={t.logout} danger onClick={() => { setAuthed(false); goto('welcome'); }}/>
        </RMCard>
      </div>
    </div>
  );
}

Object.assign(window, { RMPassengerScheduled, RMPassengerHistory, RMPassengerMessages, RMPassengerChat, RMPassengerProfile });


// RideMe — Driver screens
function RMDriverDashboard() {
  const t = useT(); const { goto, driverOnline, setDriverOnline, setTrip } = useStore();
  const e = RM_MOCK.driverEarnings;
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--rm-bg)' }}>
      <div style={{ background: 'linear-gradient(160deg, var(--rm-navy) 0%, var(--rm-blue) 100%)', color: '#fff', padding: '16px 18px 22px', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <RMAvatar name="Carlos M." color="#5BD0FF" size={40}/>
            <div>
              <div style={{ fontSize: 12, opacity: 0.8 }}>Hola,</div>
              <div style={{ fontWeight: 700 }}>Carlos M.</div>
            </div>
          </div>
          <RMLocaleToggle/>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', borderRadius: 'var(--rm-r-lg)', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 12, opacity: 0.8 }}>{driverOnline ? t.online : t.offline}</div>
            <div style={{ fontWeight: 800, fontSize: 18 }}>{driverOnline ? t.available : t.unavailable}</div>
          </div>
          <button onClick={() => setDriverOnline(!driverOnline)} style={{
            width: 60, height: 32, borderRadius: 16, padding: 3,
            background: driverOnline ? 'var(--rm-cyan)' : 'rgba(255,255,255,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: driverOnline ? 'flex-end' : 'flex-start',
          }}>
            <span style={{ width: 26, height: 26, borderRadius: '50%', background: '#fff' }}/>
          </button>
        </div>
      </div>
      <div style={{ flex: 1, padding: '16px', overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }} className="rm-scroll">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <RMCard padding={14}>
            <div style={{ fontSize: 11, color: 'var(--rm-text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t.todayEarnings}</div>
            <div style={{ fontWeight: 800, fontSize: 24, letterSpacing: '-0.02em' }}>${e.today}</div>
            <div style={{ fontSize: 11, color: 'var(--rm-green)', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}><RMIcon.trend style={{ width: 14, height: 14 }}/> +12% vs ayer</div>
          </RMCard>
          <RMCard padding={14}>
            <div style={{ fontSize: 11, color: 'var(--rm-text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t.tripsCompleted}</div>
            <div style={{ fontWeight: 800, fontSize: 24, letterSpacing: '-0.02em' }}>{e.trips}</div>
            <div style={{ fontSize: 11, color: 'var(--rm-text-2)', marginTop: 2 }}>{e.hours}h conectado</div>
          </RMCard>
          <RMCard padding={14}>
            <div style={{ fontSize: 11, color: 'var(--rm-text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t.rating}</div>
            <div style={{ fontWeight: 800, fontSize: 24, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: 6 }}>
              <RMIcon.star style={{ color: '#F59E0B', width: 22, height: 22 }}/> {e.rating}
            </div>
          </RMCard>
          <RMCard padding={14}>
            <div style={{ fontSize: 11, color: 'var(--rm-text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t.subscription}</div>
            <div style={{ fontWeight: 800, fontSize: 16, marginTop: 2 }}>RideMe Pro</div>
            <div style={{ fontSize: 11, color: 'var(--rm-text-2)' }}>Vence 12 may</div>
          </RMCard>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
            <div style={{ fontWeight: 800, fontSize: 16 }}>{t.nearbyRequests}</div>
            <RMBadge tone="green"><span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }}/> Live</RMBadge>
          </div>
          {!driverOnline ? (
            <RMCard padding={20}>
              <RMEmpty icon={<RMIcon.car/>} title={t.unavailable} sub="Conéctate para empezar a recibir solicitudes."
                action={<RMButton variant="primary" onClick={() => setDriverOnline(true)}>{t.goOnline}</RMButton>}/>
            </RMCard>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {RM_MOCK.driverRequests.map(r => (
                <RMCard key={r.id} padding={14}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <RMAvatar name={r.rider} color="#FFB37C" size={36}/>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14 }}>{r.rider}</div>
                        <div style={{ fontSize: 11, color: 'var(--rm-text-3)' }}>{r.distance} km · {t.expiresIn} {r.expiresIn}s</div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 11, color: 'var(--rm-text-3)' }}>{t.proposedFare}</div>
                      <div style={{ fontWeight: 800, fontSize: 18, color: 'var(--rm-blue)' }}>${r.riderPrice}</div>
                    </div>
                  </div>
                  <RMRouteRow from={r.from} to={r.to}/>
                  <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                    <RMButton variant="secondary" full size="sm">{t.reject}</RMButton>
                    <RMButton variant="primary" full size="sm" onClick={() => { setTrip({ request: r }); goto('driverOffer'); }}>{t.submitOffer}</RMButton>
                  </div>
                </RMCard>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function RMDriverOffer() {
  const t = useT(); const { goto, trip, setTrip } = useStore();
  const r = trip?.request || RM_MOCK.driverRequests[0];
  const [price, setPrice] = React.useState(r.suggested);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff' }}>
      <RMTopBar onBack={() => goto('driverDashboard')} title={t.newTripRequest}/>
      <div style={{ flex: 1, padding: '8px 18px 18px', display: 'flex', flexDirection: 'column', gap: 14, overflow: 'auto' }} className="rm-scroll">
        <RMCard padding={14}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <RMAvatar name={r.rider} color="#FFB37C" size={48}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700 }}>{r.rider}</div>
              <div style={{ fontSize: 12, color: 'var(--rm-text-2)' }}><RMIcon.star style={{ width: 12, height: 12, color: '#F59E0B' }}/> 4.8 · 86 viajes</div>
            </div>
            <RMBadge tone="amber">{r.distance} km</RMBadge>
          </div>
          <RMRouteRow from={r.from} to={r.to}/>
        </RMCard>

        <RMCard padding={16}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 10 }}>
            <span style={{ color: 'var(--rm-text-3)' }}>{t.proposedFare} pasajero</span>
            <span style={{ fontWeight: 700 }}>${r.riderPrice}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 10 }}>
            <span style={{ color: 'var(--rm-text-3)' }}>{t.fareSuggestion}</span>
            <span style={{ fontWeight: 700 }}>${r.suggested}</span>
          </div>
          <div style={{ height: 1, background: 'var(--rm-border)', margin: '10px 0' }}/>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>{t.yourPrice}</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button onClick={() => setPrice(Math.max(40, price - 5))} style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--rm-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><RMIcon.minus/></button>
            <div style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 40, letterSpacing: '-0.04em' }}>${price}</div>
            <button onClick={() => setPrice(price + 5)} style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--rm-blue)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><RMIcon.plus/></button>
          </div>
        </RMCard>

        <RMButton variant="primary" full size="lg" onClick={() => { setTrip({ ...trip, fare: price, status: 'driver_in_progress' }); goto('driverInProgress'); }}>{t.submitOffer}</RMButton>
        <RMButton variant="secondary" full onClick={() => goto('driverDashboard')}>{t.reject}</RMButton>
      </div>
    </div>
  );
}

function RMDriverInProgress() {
  const t = useT(); const { goto, trip } = useStore();
  const r = trip?.request || RM_MOCK.driverRequests[0];
  const [stage, setStage] = React.useState(0); // 0 to_pickup, 1 arrived, 2 in_trip
  const stages = [
    { label: t.goToPickup, action: t.iArrived, sub: t.onTheWay },
    { label: t.driverArrived, action: t.startTrip, sub: 'Esperando pasajero' },
    { label: t.tripInProgress, action: t.completeTrip, sub: 'En curso' },
  ];
  const cur = stages[stage];
  const next = () => stage < 2 ? setStage(stage + 1) : goto('driverDashboard');
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, position: 'relative' }}>
        <RMMap showRoute showDriverDots={1}/>
        <div style={{ position: 'absolute', top: 12, left: 12, padding: '8px 14px', background: 'var(--rm-blue)',
          color: '#fff', borderRadius: 'var(--rm-r-full)', fontSize: 12, fontWeight: 700, boxShadow: 'var(--rm-shadow-blue)' }}>
          {cur.label}
        </div>
      </div>
      <div style={{ background: '#fff', borderRadius: '24px 24px 0 0', padding: 20, boxShadow: '0 -8px 30px rgba(13,27,61,0.12)' }}>
        <div style={{ width: 40, height: 4, background: 'var(--rm-border-strong)', borderRadius: 2, margin: '0 auto 14px' }}/>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
          <RMAvatar name={r.rider} color="#FFB37C" size={48}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700 }}>{r.rider}</div>
            <div style={{ fontSize: 12, color: 'var(--rm-text-2)' }}>{cur.sub}</div>
          </div>
          <button style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--rm-green)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><RMIcon.phone/></button>
          <button style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--rm-blue)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><RMIcon.chat/></button>
        </div>
        <div style={{ padding: 12, background: 'var(--rm-surface-alt)', borderRadius: 'var(--rm-r-md)', marginBottom: 12 }}>
          <RMRouteRow from={r.from} to={r.to}/>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 4px 12px' }}>
          <div style={{ fontSize: 12, color: 'var(--rm-text-3)' }}>{t.agreedFare}</div>
          <div style={{ fontWeight: 800, fontSize: 22 }}>${trip?.fare || r.suggested} MXN</div>
        </div>
        <RMButton variant={stage === 2 ? 'success' : 'primary'} full size="lg" onClick={next}>{cur.action}</RMButton>
      </div>
    </div>
  );
}

function RMDriverDocs() {
  const t = useT(); const { goto } = useStore();
  const docs = [
    { id: 'lic', name: 'Licencia de conducir', status: 'approved' },
    { id: 'ine', name: 'Identificación oficial', status: 'approved' },
    { id: 'tar', name: 'Tarjeta de circulación', status: 'pending' },
    { id: 'pol', name: 'Póliza de seguro', status: 'rejected' },
    { id: 'ant', name: 'Antecedentes no penales', status: 'approved' },
  ];
  const tones = { approved: 'green', pending: 'amber', rejected: 'red' };
  const labels = { approved: t.docApproved, pending: t.docPending, rejected: t.docRejected };
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--rm-bg)' }}>
      <RMTopBar onBack={() => goto('driverDashboard')} title={t.documents}/>
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }} className="rm-scroll">
        {docs.map(d => (
          <RMCard key={d.id} padding={14}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--rm-bg)', color: 'var(--rm-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <RMIcon.doc/>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{d.name}</div>
                <RMBadge tone={tones[d.status]} style={{ marginTop: 4 }}>{labels[d.status]}</RMBadge>
              </div>
              {d.status === 'rejected' && <RMButton variant="primary" size="sm" icon={<RMIcon.upload/>}>{t.docResubmit}</RMButton>}
              {d.status !== 'rejected' && <RMIcon.arrowR style={{ color: 'var(--rm-text-3)' }}/>}
            </div>
          </RMCard>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { RMDriverDashboard, RMDriverOffer, RMDriverInProgress, RMDriverDocs });


// RideMe — Admin (desktop)
function RMAdminLayout({ children }) {
  const t = useT(); const { adminSection, setAdminSection, goto, setRole } = useStore();
  const items = [
    { id: 'dashboard', label: t.adminDashboard, icon: <RMIcon.trend/> },
    { id: 'users', label: t.adminUsers, icon: <RMIcon.user/> },
    { id: 'drivers', label: t.adminDrivers, icon: <RMIcon.car/> },
    { id: 'trips', label: t.adminTrips, icon: <RMIcon.trip/> },
    { id: 'payments', label: t.adminPayments, icon: <RMIcon.cash/> },
    { id: 'reports', label: t.adminReports, icon: <RMIcon.doc/> },
    { id: 'alerts', label: t.adminAlerts, icon: <RMIcon.alert/> },
    { id: 'settings', label: t.adminSettings, icon: <RMIcon.cog/> },
  ];
  return (
    <div style={{ display: 'flex', height: '100%', background: 'var(--rm-bg)', color: 'var(--rm-text)' }}>
      <aside style={{ width: 240, background: 'var(--rm-navy)', color: '#fff', padding: '20px 14px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 6px 14px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <RMLogoMark size={32}/>
          <div style={{ fontWeight: 800, fontSize: 18, letterSpacing: '-0.02em' }}>Ride<span style={{ color: 'var(--rm-cyan)' }}>Me</span></div>
        </div>
        <div style={{ fontSize: 11, opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 8px' }}>Admin</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {items.map(it => {
            const on = adminSection === it.id;
            return (
              <button key={it.id} onClick={() => setAdminSection(it.id)} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
                borderRadius: 'var(--rm-r-md)', textAlign: 'left',
                background: on ? 'rgba(0,180,255,0.18)' : 'transparent',
                color: on ? 'var(--rm-cyan)' : 'rgba(255,255,255,0.85)', fontSize: 14, fontWeight: 600,
              }}>
                {it.icon}{it.label}
              </button>
            );
          })}
        </div>
        <div style={{ marginTop: 'auto', padding: 10, background: 'rgba(255,255,255,0.06)', borderRadius: 'var(--rm-r-md)' }}>
          <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 6 }}>Admin · Cambiar de rol</div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button onClick={() => { setRole('passenger'); goto('passengerHome'); }} style={{ flex: 1, padding: 8, borderRadius: 8, fontSize: 11, background: 'rgba(255,255,255,0.1)', color: '#fff' }}>Pasajero</button>
            <button onClick={() => { setRole('driver'); goto('driverDashboard'); }} style={{ flex: 1, padding: 8, borderRadius: 8, fontSize: 11, background: 'rgba(255,255,255,0.1)', color: '#fff' }}>Conductor</button>
          </div>
        </div>
      </aside>
      <main style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        <header style={{ height: 56, background: '#fff', borderBottom: '1px solid var(--rm-border)', display: 'flex', alignItems: 'center', padding: '0 20px', gap: 14 }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, padding: '0 12px', height: 36, background: 'var(--rm-bg)', borderRadius: 'var(--rm-r-md)', maxWidth: 360, color: 'var(--rm-text-3)' }}>
            <RMIcon.search/> <span style={{ fontSize: 13 }}>Buscar usuarios, viajes, conductores…</span>
          </div>
          <div style={{ flex: 1 }}/>
          <RMLocaleToggle/>
          <button style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--rm-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <RMIcon.bell/><span style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, borderRadius: '50%', background: 'var(--rm-red)' }}/>
          </button>
          <RMAvatar name="Admin Pro" color="var(--rm-cyan)" size={36}/>
        </header>
        <div style={{ flex: 1, padding: 24, overflow: 'auto' }} className="rm-scroll">
          {children}
        </div>
      </main>
    </div>
  );
}

function RMAdminDashboard() {
  const t = useT(); const s = RM_MOCK.adminStats;
  const Stat = ({ label, value, delta, tone='blue', icon }) => (
    <RMCard padding={18}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--rm-text-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
          <div style={{ fontWeight: 800, fontSize: 30, letterSpacing: '-0.03em', marginTop: 4 }}>{value}</div>
          {delta && <div style={{ fontSize: 12, color: 'var(--rm-green)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}><RMIcon.trend style={{ width: 14, height: 14 }}/> {delta}</div>}
        </div>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: tone === 'cyan' ? '#DEF4FF' : '#E2ECFD', color: tone === 'cyan' ? '#006A99' : 'var(--rm-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
      </div>
    </RMCard>
  );
  const max = Math.max(...s.chart);
  const statusTones = { in_progress: 'blue', completed: 'green', cancelled: 'red' };
  const statusLabel = { in_progress: 'En curso', completed: 'Completado', cancelled: 'Cancelado' };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <div style={{ fontWeight: 800, fontSize: 24, letterSpacing: '-0.02em' }}>{t.adminDashboard}</div>
        <div style={{ color: 'var(--rm-text-2)', fontSize: 13 }}>Resumen operativo · hoy</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        <Stat label={t.totalUsers} value={s.users.toLocaleString()} delta="+4.2% / 7d" icon={<RMIcon.user/>}/>
        <Stat label={t.activeDrivers} value={s.drivers.toLocaleString()} delta="+1.8% / 7d" icon={<RMIcon.car/>} tone="cyan"/>
        <Stat label={t.tripsToday} value={s.tripsToday} delta="+11% vs ayer" icon={<RMIcon.trip/>}/>
        <Stat label={t.revenue} value={'$' + s.revenue.toLocaleString()} delta="+8.3% / 7d" icon={<RMIcon.cash/>} tone="cyan"/>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
        <RMCard padding={20}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
            <div style={{ fontWeight: 700, fontSize: 16 }}>Viajes por hora</div>
            <RMBadge tone="blue">Hoy</RMBadge>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 180 }}>
            {s.chart.map((v, i) => (
              <div key={i} style={{
                flex: 1, height: `${(v/max)*100}%`, borderRadius: 6,
                background: 'linear-gradient(180deg, var(--rm-cyan) 0%, var(--rm-blue) 100%)',
              }}/>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--rm-text-3)', marginTop: 8 }}>
            <span>06:00</span><span>12:00</span><span>18:00</span><span>00:00</span>
          </div>
        </RMCard>
        <RMCard padding={20}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 12 }}>{t.pendingApprovals}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { name: 'Roberto S.', sub: 'Conductor · 3 docs', tone: 'amber' },
              { name: 'Marina C.', sub: 'Conductor · 1 doc', tone: 'amber' },
              { name: 'Iván P.', sub: 'Vehículo nuevo', tone: 'blue' },
            ].map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--rm-border)' }}>
                <RMAvatar name={p.name} color="#A8B8FF" size={36}/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--rm-text-3)' }}>{p.sub}</div>
                </div>
                <RMBadge tone={p.tone}>Revisar</RMBadge>
              </div>
            ))}
          </div>
        </RMCard>
      </div>
      <RMCard padding={20}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontWeight: 700, fontSize: 16 }}>Viajes recientes</div>
          <RMButton variant="ghost" size="sm">Ver todo</RMButton>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ color: 'var(--rm-text-3)', textTransform: 'uppercase', fontSize: 11, letterSpacing: '0.06em' }}>
              <th style={{ textAlign: 'left', padding: '10px 8px', borderBottom: '1px solid var(--rm-border)' }}>ID</th>
              <th style={{ textAlign: 'left', padding: '10px 8px', borderBottom: '1px solid var(--rm-border)' }}>Pasajero</th>
              <th style={{ textAlign: 'left', padding: '10px 8px', borderBottom: '1px solid var(--rm-border)' }}>Conductor</th>
              <th style={{ textAlign: 'left', padding: '10px 8px', borderBottom: '1px solid var(--rm-border)' }}>Origen → Destino</th>
              <th style={{ textAlign: 'right', padding: '10px 8px', borderBottom: '1px solid var(--rm-border)' }}>Tarifa</th>
              <th style={{ textAlign: 'left', padding: '10px 8px', borderBottom: '1px solid var(--rm-border)' }}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {RM_MOCK.adminRecentTrips.map(tr => (
              <tr key={tr.id}>
                <td style={{ padding: '12px 8px', borderBottom: '1px solid var(--rm-border)', fontFamily: 'monospace', color: 'var(--rm-text-2)' }}>#{tr.id}</td>
                <td style={{ padding: '12px 8px', borderBottom: '1px solid var(--rm-border)' }}>{tr.user}</td>
                <td style={{ padding: '12px 8px', borderBottom: '1px solid var(--rm-border)' }}>{tr.driver}</td>
                <td style={{ padding: '12px 8px', borderBottom: '1px solid var(--rm-border)', color: 'var(--rm-text-2)' }}>{tr.from} → {tr.to}</td>
                <td style={{ padding: '12px 8px', borderBottom: '1px solid var(--rm-border)', textAlign: 'right', fontWeight: 700 }}>${tr.fare}</td>
                <td style={{ padding: '12px 8px', borderBottom: '1px solid var(--rm-border)' }}><RMBadge tone={statusTones[tr.status]}>{statusLabel[tr.status]}</RMBadge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </RMCard>
    </div>
  );
}

function RMAdminTable({ title, columns, rows, status }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontWeight: 800, fontSize: 24, letterSpacing: '-0.02em' }}>{title}</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <RMButton variant="secondary" size="sm" icon={<RMIcon.filter/>}>Filtros</RMButton>
          <RMButton variant="primary" size="sm" icon={<RMIcon.plus/>}>Nuevo</RMButton>
        </div>
      </div>
      <RMCard padding={0}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ color: 'var(--rm-text-3)', textTransform: 'uppercase', fontSize: 11, letterSpacing: '0.06em', background: 'var(--rm-surface-alt)' }}>
              {columns.map(c => <th key={c} style={{ textAlign: 'left', padding: '12px 16px', borderBottom: '1px solid var(--rm-border)' }}>{c}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--rm-border)' }}>
                {r.map((cell, j) => <td key={j} style={{ padding: '14px 16px' }}>{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </RMCard>
    </div>
  );
}

function RMAdminUsers() {
  const rows = [
    ['#U1041', <span style={{ display:'flex', gap:10, alignItems:'center' }}><RMAvatar name="Lucía F." color="#5BD0FF" size={28}/> Lucía Fernández</span>, 'lucia@example.com', '142', '4.9', <RMBadge tone="green">Activo</RMBadge>],
    ['#U1040', <span style={{ display:'flex', gap:10, alignItems:'center' }}><RMAvatar name="Diego R." color="#FFB37C" size={28}/> Diego Rivas</span>, 'diego@example.com', '38', '4.7', <RMBadge tone="green">Activo</RMBadge>],
    ['#U1039', <span style={{ display:'flex', gap:10, alignItems:'center' }}><RMAvatar name="Pablo G." color="#A8B8FF" size={28}/> Pablo Guzmán</span>, 'pablo@example.com', '12', '4.6', <RMBadge tone="amber">Inactivo</RMBadge>],
    ['#U1038', <span style={{ display:'flex', gap:10, alignItems:'center' }}><RMAvatar name="Sofía A." color="#FF9DB3" size={28}/> Sofía Acuña</span>, 'sofia@example.com', '209', '5.0', <RMBadge tone="green">VIP</RMBadge>],
    ['#U1037', <span style={{ display:'flex', gap:10, alignItems:'center' }}><RMAvatar name="Mario T." color="#B7F0CC" size={28}/> Mario Trejo</span>, 'mario@example.com', '4', '—', <RMBadge tone="red">Bloqueado</RMBadge>],
  ];
  return <RMAdminTable title="Usuarios" columns={['ID','Nombre','Correo','Viajes','Rating','Estado']} rows={rows}/>;
}
function RMAdminDrivers() {
  const rows = [
    ['#D210', <span style={{ display:'flex', gap:10, alignItems:'center' }}><RMAvatar name="Carlos M." color="#5BD0FF" size={28}/> Carlos Méndez</span>, 'Nissan Versa · ABC-123', '1240', '4.92', <RMBadge tone="green">Aprobado</RMBadge>],
    ['#D209', <span style={{ display:'flex', gap:10, alignItems:'center' }}><RMAvatar name="María L." color="#FFB37C" size={28}/> María Luna</span>, 'Toyota Yaris · XYZ-987', '2100', '4.95', <RMBadge tone="green">Aprobado</RMBadge>],
    ['#D208', <span style={{ display:'flex', gap:10, alignItems:'center' }}><RMAvatar name="Roberto S." color="#A8B8FF" size={28}/> Roberto Suárez</span>, 'Chevy Aveo · LMN-009', '0', '—', <RMBadge tone="amber">En revisión</RMBadge>],
    ['#D207', <span style={{ display:'flex', gap:10, alignItems:'center' }}><RMAvatar name="Marina C." color="#FF9DB3" size={28}/> Marina Cano</span>, 'VW Vento · QRS-543', '0', '—', <RMBadge tone="amber">En revisión</RMBadge>],
    ['#D206', <span style={{ display:'flex', gap:10, alignItems:'center' }}><RMAvatar name="Iván P." color="#B7F0CC" size={28}/> Iván Pérez</span>, 'Kia Rio · TUV-110', '88', '4.4', <RMBadge tone="red">Suspendido</RMBadge>],
  ];
  return <RMAdminTable title="Conductores" columns={['ID','Nombre','Vehículo','Viajes','Rating','Estado']} rows={rows}/>;
}
function RMAdminTrips() {
  const tones = { in_progress: 'blue', completed: 'green', cancelled: 'red' };
  const labels = { in_progress: 'En curso', completed: 'Completado', cancelled: 'Cancelado' };
  const rows = RM_MOCK.adminRecentTrips.map(tr => [
    '#' + tr.id, tr.user, tr.driver, tr.from + ' → ' + tr.to, '$' + tr.fare, <RMBadge tone={tones[tr.status]}>{labels[tr.status]}</RMBadge>
  ]);
  return <RMAdminTable title="Viajes" columns={['ID','Pasajero','Conductor','Ruta','Tarifa','Estado']} rows={rows}/>;
}
function RMAdminPayments() {
  const rows = [
    ['#P5021', '28 abr 14:32', 'Lucía F.', 'Tarjeta •• 4242', '$142', <RMBadge tone="green">Pagado</RMBadge>],
    ['#P5020', '28 abr 14:18', 'Diego R.', 'Efectivo', '$95', <RMBadge tone="green">Pagado</RMBadge>],
    ['#P5019', '28 abr 14:05', 'Pablo G.', 'Tarjeta •• 1188', '$215', <RMBadge tone="amber">Pendiente</RMBadge>],
    ['#P5018', '28 abr 13:50', 'Sofía A.', 'Tarjeta •• 9020', '$92', <RMBadge tone="red">Reembolso</RMBadge>],
  ];
  return <RMAdminTable title="Pagos" columns={['ID','Fecha','Usuario','Método','Monto','Estado']} rows={rows}/>;
}

function RMAdminGeneric({ title, sub }) {
  return (
    <div>
      <div style={{ fontWeight: 800, fontSize: 24, letterSpacing: '-0.02em' }}>{title}</div>
      <div style={{ color: 'var(--rm-text-2)', marginBottom: 18 }}>{sub}</div>
      <RMCard padding={40}>
        <RMEmpty icon={<RMIcon.cog/>} title={title} sub="Próximamente · módulo en construcción"/>
      </RMCard>
    </div>
  );
}

function RMAdminRouter() {
  const { adminSection } = useStore();
  const map = {
    dashboard: <RMAdminDashboard/>,
    users: <RMAdminUsers/>,
    drivers: <RMAdminDrivers/>,
    trips: <RMAdminTrips/>,
    payments: <RMAdminPayments/>,
    reports: <RMAdminGeneric title="Reportes" sub="KPIs y análisis"/>,
    alerts: <RMAdminGeneric title="Alertas" sub="Eventos del sistema"/>,
    settings: <RMAdminGeneric title="Configuración" sub="Tarifas, comisiones, zonas"/>,
  };
  return <RMAdminLayout>{map[adminSection] || <RMAdminDashboard/>}</RMAdminLayout>;
}

Object.assign(window, { RMAdminRouter });


// RideMe — App shell, router, frames
function RMAppRouter() {
  const { route, role, tab, setTab, goto } = useStore();
  const t = useT();
  const r = route.name;

  // Admin lives in desktop layout always
  if (role === 'admin' && ['adminDashboard'].includes(r)) {
    return <RMAdminRouter/>;
  }

  // Tab-based passenger shell
  const passengerTabs = [
    { id: 'home', label: t.tabHome, icon: <RMIcon.home/> },
    { id: 'scheduled', label: t.tabScheduled, icon: <RMIcon.clock/> },
    { id: 'messages', label: t.tabMessages, icon: <RMIcon.chat/>, badge: true },
    { id: 'history', label: t.tabRides, icon: <RMIcon.trip/> },
    { id: 'profile', label: t.tabProfile, icon: <RMIcon.user/> },
  ];

  let screen = null;
  let showTabs = false;

  if (r === 'splash') return <RMSplash/>;
  if (r === 'welcome') return <RMWelcome/>;
  if (r === 'login') return <RMLogin/>;
  if (r === 'signup') return <RMSignup/>;
  if (r === 'roleSelect') return <RMRoleSelect/>;

  // Passenger
  if (role === 'passenger') {
    showTabs = ['passengerHome', 'passengerScheduled', 'passengerHistory', 'passengerMessages', 'passengerProfile'].includes(r);
    const tabFromRoute = {
      passengerHome: 'home', passengerScheduled: 'scheduled',
      passengerHistory: 'history', passengerMessages: 'messages',
      passengerProfile: 'profile',
    }[r];
    if (tabFromRoute && tab !== tabFromRoute) setTab(tabFromRoute);

    const map = {
      passengerHome: <RMPassengerHome/>,
      passengerPrice: <RMPassengerPrice/>,
      passengerSearching: <RMPassengerSearching/>,
      passengerOffers: <RMPassengerOffers/>,
      passengerConfirmed: <RMPassengerConfirmed/>,
      passengerInProgress: <RMPassengerInProgress/>,
      passengerRating: <RMPassengerRating/>,
      passengerScheduled: <RMPassengerScheduled/>,
      passengerHistory: <RMPassengerHistory/>,
      passengerMessages: <RMPassengerMessages/>,
      passengerChat: <RMPassengerChat/>,
      passengerProfile: <RMPassengerProfile/>,
    };
    screen = map[r] || <RMPassengerHome/>;
  }

  // Driver
  if (role === 'driver') {
    const map = {
      driverDashboard: <RMDriverDashboard/>,
      driverOffer: <RMDriverOffer/>,
      driverInProgress: <RMDriverInProgress/>,
      driverDocs: <RMDriverDocs/>,
    };
    screen = map[r] || <RMDriverDashboard/>;
    showTabs = r === 'driverDashboard' || r === 'driverDocs';
  }

  if (role === 'admin') return <RMAdminRouter/>;

  const handleTabChange = (id) => {
    setTab(id);
    if (role === 'passenger') {
      const m = { home: 'passengerHome', scheduled: 'passengerScheduled', history: 'passengerHistory', messages: 'passengerMessages', profile: 'passengerProfile' };
      goto(m[id]);
    } else if (role === 'driver') {
      const m = { home: 'driverDashboard', docs: 'driverDocs' };
      goto(m[id] || 'driverDashboard');
    }
  };

  const driverTabs = [
    { id: 'home', label: t.driverDashboard.split(' ')[0], icon: <RMIcon.home/> },
    { id: 'docs', label: t.documents, icon: <RMIcon.doc/> },
    { id: 'earnings', label: 'Ingresos', icon: <RMIcon.cash/> },
    { id: 'profile', label: t.tabProfile, icon: <RMIcon.user/> },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
        {screen}
      </div>
      {showTabs && (
        <RMTabBar tabs={role === 'driver' ? driverTabs : passengerTabs} active={tab} onChange={handleTabChange}/>
      )}
    </div>
  );
}

// PWA shell — full viewport, no device frame.
// On mobile/installed: uses 100dvh + safe-area insets so it feels native.
// On desktop browser: still fills viewport (admin uses sidebar layout natively).
function RMPWAShell({ children }) {
  return (
    <div style={{
      width: '100%',
      height: '100dvh',
      minHeight: '100dvh',
      background: '#fff',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      position: 'relative',
      paddingTop: 'env(safe-area-inset-top, 0)',
      paddingBottom: 'env(safe-area-inset-bottom, 0)',
      paddingLeft: 'env(safe-area-inset-left, 0)',
      paddingRight: 'env(safe-area-inset-right, 0)',
    }}>
      {children}
    </div>
  );
}

function RMRoot() {
  return (
    <RMPWAShell>
      <RMAppRouter/>
    </RMPWAShell>
  );
}

function RMApp() {
  return <RMStoreProvider><RMRoot/></RMStoreProvider>;
}

ReactDOM.createRoot(document.getElementById('root')).render(<RMApp/>);
