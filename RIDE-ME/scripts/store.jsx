// RideMe — App store (auth, role, locale, navigation, persistence, fare engine, dispatch)
// Nivel 1: Estado vivo persistido en localStorage + acciones tipadas + máquina de estados de viaje.

const RM_LOCALES = { es: window.RM_I18N_ES, en: window.RM_I18N_EN };

function useT() {
  const { locale } = React.useContext(RMStoreCtx);
  return RM_LOCALES[locale] || RM_LOCALES.es;
}

const RMStoreCtx = React.createContext(null);

// ─── Persistencia ─────────────────────────────────────────────────────────
const RM_STORAGE_KEY = 'rm:state:v1';

function rmReadStorage() {
  try {
    const raw = localStorage.getItem(RM_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}
function rmWriteStorage(state) {
  try { localStorage.setItem(RM_STORAGE_KEY, JSON.stringify(state)); } catch {}
}

// ─── Motor de tarifa (heurístico, determinista) ──────────────────────────
function rmHashStr(s) {
  let h = 0; for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i) | 0;
  return Math.abs(h);
}
function rmEstimateFare(from, to, cfg) {
  const c = cfg || { baseFare: 25, perKm: 8, perMin: 1.5, surgeMin: 1.0, surgeMax: 1.6 };
  const hash = rmHashStr(`${from || ''}|${to || ''}`);
  const distance = +(2 + (hash % 230) / 10).toFixed(1); // 2.0 — 25.0 km
  const duration = Math.round(distance * 2.6 + (hash % 7));
  const hour = new Date().getHours();
  const peak = (hour >= 7 && hour <= 10) || (hour >= 17 && hour <= 21);
  const surge = peak ? c.surgeMax : c.surgeMin + ((hash % 7) / 30);
  const raw = (c.baseFare + c.perKm * distance + c.perMin * duration) * surge;
  const suggested = Math.max(40, Math.round(raw / 5) * 5);
  return { distance, duration, suggested, surge: +surge.toFixed(2) };
}

// ─── Máquina de estados de viaje ─────────────────────────────────────────
const RM_TRIP_TRANSITIONS = {
  idle:        ['quoting'],
  quoting:     ['searching', 'idle'],
  searching:   ['matching', 'idle'],
  matching:    ['confirmed', 'searching', 'idle'],
  confirmed:   ['arrived', 'in_progress', 'idle'],
  arrived:     ['in_progress', 'idle'],
  in_progress: ['completed', 'idle'],
  completed:   ['rated', 'idle'],
  rated:       ['idle'],
};
function rmCanTransition(from, to) {
  if (from === to) return true;
  return (RM_TRIP_TRANSITIONS[from] || []).includes(to);
}

// ─── Datos iniciales (seed) ──────────────────────────────────────────────
const RM_SEED = {
  profile: {
    name: 'Lucía Fernández', email: 'lucia@example.com', phone: '+52 55 1234 5678',
    rating: 4.9, trips: 142, photoColor: '#5BD0FF',
    notifyPush: true, notifyEmail: true, notifyTrips: true, notifyPromos: false, twoFactor: false,
  },
  driverProfile: {
    name: 'Carlos M.', email: 'carlos@example.com', phone: '+52 55 8765 4321',
    rating: 4.92, trips: 1240, photoColor: '#5BD0FF',
    car: 'Nissan Versa', plate: 'ABC-123', color: 'Blanco',
    payoutAccount: 'BBVA •• 7821',
  },
  paymentMethods: [
    { id: 'pm-cash', kind: 'cash', label: 'Efectivo', isDefault: true },
    { id: 'pm-card-4242', kind: 'card', label: 'Visa', last4: '4242', isDefault: false },
  ],
  history: [
    { id: 'h1', date: '28 abr', from: 'Roma Norte', to: 'Polanco', fare: 142, status: 'completed', driver: 'Carlos M.', ts: Date.now() - 86400e3 * 3 },
    { id: 'h2', date: '26 abr', from: 'Casa', to: 'Aeropuerto CDMX', fare: 285, status: 'completed', driver: 'Lucía F.', ts: Date.now() - 86400e3 * 5 },
    { id: 'h3', date: '24 abr', from: 'Centro', to: 'Coyoacán', fare: 98, status: 'cancelled', driver: '—', ts: Date.now() - 86400e3 * 7 },
    { id: 'h4', date: '20 abr', from: 'Condesa', to: 'Santa Fe', fare: 215, status: 'completed', driver: 'Mario T.', ts: Date.now() - 86400e3 * 11 },
  ],
  scheduled: [
    { id: 's1', when: 'Mañana 7:30', whenTs: Date.now() + 86400e3, from: 'Casa', to: 'Aeropuerto T1', fare: 290, pay: 'pm-card-4242', notes: '' },
    { id: 's2', when: 'Sáb 10:00', whenTs: Date.now() + 86400e3 * 4, from: 'Roma Norte', to: 'Tepoztlán', fare: 1450, pay: 'pm-cash', notes: 'Llevar 2 maletas' },
  ],
  conversations: {
    c1: { id: 'c1', who: 'Carlos M.', color: '#5BD0FF', unread: 1, lastTs: Date.now() - 120e3, messages: [
      { id: 1, from: 'them', text: 'Hola, ya estoy en camino.', time: '12:42' },
      { id: 2, from: 'me',   text: '¡Perfecto! Estoy en la entrada.', time: '12:43' },
      { id: 3, from: 'them', text: 'Ya estoy en la esquina', time: '12:45' },
    ]},
    c2: { id: 'c2', who: 'Soporte RideMe', color: '#2563EB', unread: 0, lastTs: Date.now() - 3600e3, messages: [
      { id: 1, from: 'them', text: '¿Cómo te fue con tu viaje?', time: '11:20' },
    ]},
  },
  driverRequestQueue: [
    { id: 'q1', rider: 'Lucía F.', from: 'Roma Norte', to: 'Polanco',  distance: 5.4, suggested: 110, riderPrice: 95,  expiresAt: Date.now() + 18e3 },
    { id: 'q2', rider: 'Diego R.', from: 'Condesa',    to: 'Coyoacán', distance: 8.2, suggested: 165, riderPrice: 150, expiresAt: Date.now() + 22e3 },
  ],
  driverEarnings: { today: 845, trips: 9, rating: 4.92, hours: 6.4, weekly: 5340 },
  driverDocs: [
    { id: 'lic', name: 'Licencia de conducir',     status: 'approved' },
    { id: 'ine', name: 'Identificación oficial',   status: 'approved' },
    { id: 'tar', name: 'Tarjeta de circulación',   status: 'pending' },
    { id: 'pol', name: 'Póliza de seguro',         status: 'rejected' },
    { id: 'ant', name: 'Antecedentes no penales',  status: 'approved' },
  ],
  adminConfig: {
    baseFare: 25, perKm: 8, perMin: 1.5,
    commissionPct: 18, surgeMin: 1.0, surgeMax: 1.6,
    minFare: 40, maxFare: 2000,
    operatingCity: 'Guadalajara',
  },
  adminAlerts: [
    { id: 'a1', ts: Date.now() - 600e3,  kind: 'doc',     message: 'Marina C. envió documentos para revisión' },
    { id: 'a2', ts: Date.now() - 1800e3, kind: 'payout',  message: 'Pago a conductores semanal procesado' },
    { id: 'a3', ts: Date.now() - 7200e3, kind: 'fraud',   message: 'Posible cuenta duplicada: Iván P.' },
  ],
  adminTrips: [
    { id: 't1', user: 'Lucía F.', driver: 'Carlos M.', from: 'Roma',     to: 'Polanco',   fare: 142, status: 'in_progress', ts: Date.now() - 600e3 },
    { id: 't2', user: 'Diego R.', driver: 'María L.',  from: 'Condesa',  to: 'Coyoacán',  fare: 165, status: 'completed',   ts: Date.now() - 3600e3 },
    { id: 't3', user: 'Pablo G.', driver: 'Jorge R.',  from: 'Centro',   to: 'Santa Fe',  fare: 215, status: 'completed',   ts: Date.now() - 7200e3 },
    { id: 't4', user: 'Sofía A.', driver: 'Ana P.',    from: 'Doctores', to: 'Del Valle', fare: 92,  status: 'cancelled',   ts: Date.now() - 10800e3 },
  ],
};

// Static catalog (no necesita persistirse, son referencias)
const RM_MOCK = {
  recentPlaces: [
    { id: 'r1', name: 'Plaza Antara',     addr: 'Av. Ejército Nal. 843, Granada', icon: 'pin' },
    { id: 'r2', name: 'Casa',             addr: 'Calle Tonalá 156, Roma Norte',   icon: 'home' },
    { id: 'r3', name: 'Trabajo',          addr: 'Reforma 222, Juárez',            icon: 'work' },
    { id: 'r4', name: 'Aeropuerto CDMX',  addr: 'Terminal 1, Benito Juárez',      icon: 'pin' },
  ],
  drivers: [
    { id: 'd1', name: 'Carlos M.', rating: 4.9,  trips: 1240, eta: 3, distance: 0.8, price: 95,  car: 'Nissan Versa', plate: 'ABC-123', color: 'Blanco', photo: '#5BD0FF' },
    { id: 'd2', name: 'María L.',  rating: 4.95, trips: 2100, eta: 5, distance: 1.4, price: 88,  car: 'Toyota Yaris', plate: 'XYZ-987', color: 'Gris',   photo: '#FFB37C' },
    { id: 'd3', name: 'Jorge R.',  rating: 4.8,  trips: 540,  eta: 7, distance: 1.9, price: 105, car: 'Chevy Aveo',   plate: 'JKL-456', color: 'Negro',  photo: '#A8B8FF' },
    { id: 'd4', name: 'Ana P.',    rating: 4.7,  trips: 320,  eta: 9, distance: 2.6, price: 92,  car: 'VW Vento',     plate: 'MNO-321', color: 'Rojo',   photo: '#FF9DB3' },
  ],
  adminStats: {
    users: 12480, drivers: 1832, tripsToday: 642, revenue: 84230,
    pendingDrivers: 14, alerts: 3,
    chart: [22,28,24,32,40,38,46,52,48,55,62,58,64,70,66,72,80,78],
  },
  reportReasons: [
    { id: 'unsafe', es: 'Conducción imprudente', en: 'Unsafe driving' },
    { id: 'rude',   es: 'Trato grosero',         en: 'Rude behavior' },
    { id: 'charge', es: 'Cobro incorrecto',      en: 'Wrong charge' },
    { id: 'route',  es: 'Ruta más larga',        en: 'Longer route' },
    { id: 'other',  es: 'Otro',                  en: 'Other' },
  ],
};

// ─── Provider ────────────────────────────────────────────────────────────
function RMStoreProvider({ children }) {
  const persisted = React.useMemo(() => rmReadStorage() || {}, []);
  const seed = (k) => persisted[k] !== undefined ? persisted[k] : RM_SEED[k];

  const [locale, setLocale]               = React.useState(persisted.locale || 'es');
  const [role, setRole]                   = React.useState(persisted.role || 'passenger');
  const [route, setRoute]                 = React.useState(persisted.route || { name: 'splash', params: {} });
  const [authed, setAuthed]               = React.useState(!!persisted.authed);
  const [tab, setTab]                     = React.useState(persisted.tab || 'home');
  const [trip, setTrip]                   = React.useState(persisted.trip || null);
  const [driverOnline, setDriverOnline]   = React.useState(!!persisted.driverOnline);
  const [adminSection, setAdminSection]   = React.useState(persisted.adminSection || 'dashboard');

  const [profile, setProfileState]        = React.useState(seed('profile'));
  const [driverProfile, setDriverProfileState] = React.useState(seed('driverProfile'));
  const [paymentMethods, setPaymentMethods]    = React.useState(seed('paymentMethods'));
  const [history, setHistory]             = React.useState(seed('history'));
  const [scheduled, setScheduled]         = React.useState(seed('scheduled'));
  const [conversations, setConversations] = React.useState(seed('conversations'));
  const [driverRequestQueue, setDriverRequestQueue] = React.useState(seed('driverRequestQueue'));
  const [driverEarnings, setDriverEarnings]    = React.useState(seed('driverEarnings'));
  const [driverDocs, setDriverDocs]       = React.useState(seed('driverDocs'));
  const [adminConfig, setAdminConfig]     = React.useState(seed('adminConfig'));
  const [adminAlerts, setAdminAlerts]     = React.useState(seed('adminAlerts'));
  const [adminTrips, setAdminTrips]       = React.useState(seed('adminTrips'));
  const [offers, setOffers]               = React.useState([]); // ofertas en vivo recibidas en quoting/searching
  const [reports, setReports]             = React.useState(persisted.reports || []);

  // Refs para acceso síncrono actualizado en callbacks (evita closures rancios)
  const tripRef = React.useRef(trip);     tripRef.current = trip;
  const historyRef = React.useRef(history); historyRef.current = history;

  // Persistir snapshot completo (debounced via microtask)
  const stateRef = React.useRef();
  stateRef.current = {
    locale, role, route, authed, tab, trip, driverOnline, adminSection,
    profile, driverProfile, paymentMethods, history, scheduled, conversations,
    driverRequestQueue, driverEarnings, driverDocs, adminConfig, adminAlerts, adminTrips, reports,
  };
  React.useEffect(() => {
    const id = setTimeout(() => rmWriteStorage(stateRef.current), 80);
    return () => clearTimeout(id);
  });

  const goto = React.useCallback((name, params={}) => {
    setRoute({ name, params });
    window.scrollTo?.(0, 0);
  }, []);

  // ── Acciones de viaje ──────────────────────────────────────────────────
  const setTripStatus = React.useCallback((next, patch={}) => {
    setTrip(t => {
      const cur = t?.status || 'idle';
      if (!rmCanTransition(cur, next)) {
        console.warn('[trip] transición inválida', cur, '→', next);
        return t;
      }
      return { ...(t || {}), ...patch, status: next };
    });
  }, []);

  const cancelTrip = React.useCallback((reason='user') => {
    const t = tripRef.current;
    if (!t) { setOffers([]); return; }
    if (['searching','matching','confirmed','arrived','in_progress'].includes(t.status)) {
      const date = new Date().toLocaleDateString('es-MX', { day: '2-digit', month: 'short' });
      setHistory(h => [{
        id: 'h-' + Date.now(), date, from: t.from || '—', to: t.to || '—',
        fare: 0, status: 'cancelled', driver: t.driver?.name || '—', ts: Date.now(), reason,
      }, ...h]);
    }
    setTrip(null);
    setOffers([]);
  }, []);

  const completeTrip = React.useCallback((finalFare) => {
    const t = tripRef.current;
    if (!t) return;
    const date = new Date().toLocaleDateString('es-MX', { day: '2-digit', month: 'short' });
    const fare = finalFare ?? t.fare ?? t.price ?? 0;
    const entry = {
      id: 'h-' + Date.now(), date, from: t.from || '—', to: t.to || '—',
      fare, status: 'completed', driver: t.driver?.name || '—',
      ts: Date.now(), pay: t.pay,
    };
    setHistory(h => [entry, ...h]);
    setProfileState(p => ({ ...p, trips: (p.trips || 0) + 1 }));
    setTrip({ ...t, fare, status: 'completed' });
  }, []);

  const submitRating = React.useCallback((stars, comment) => {
    setHistory(h => h.length ? [{ ...h[0], rating: stars, comment }, ...h.slice(1)] : h);
    setTrip(null);
    setOffers([]);
  }, []);

  // ── Acciones de perfil / pagos ────────────────────────────────────────
  const setProfile = React.useCallback((patch) =>
    setProfileState(p => ({ ...p, ...patch })), []);
  const setDriverProfile = React.useCallback((patch) =>
    setDriverProfileState(p => ({ ...p, ...patch })), []);

  const addPaymentMethod = React.useCallback((pm) => {
    const id = pm.id || ('pm-' + Date.now());
    setPaymentMethods(arr => [...arr, { ...pm, id, isDefault: arr.length === 0 }]);
  }, []);
  const removePaymentMethod = React.useCallback((id) =>
    setPaymentMethods(arr => arr.filter(p => p.id !== id)), []);
  const setDefaultPayment = React.useCallback((id) =>
    setPaymentMethods(arr => arr.map(p => ({ ...p, isDefault: p.id === id }))), []);

  // ── Programados ───────────────────────────────────────────────────────
  const addScheduled = React.useCallback((s) => {
    const id = 's-' + Date.now();
    setScheduled(arr => [{ id, ...s }, ...arr]);
    pushAlert({ kind: 'schedule', message: `Viaje programado: ${s.from} → ${s.to}` });
  }, []);
  const updateScheduled = React.useCallback((id, patch) =>
    setScheduled(arr => arr.map(s => s.id === id ? { ...s, ...patch } : s)), []);
  const removeScheduled = React.useCallback((id) =>
    setScheduled(arr => arr.filter(s => s.id !== id)), []);

  // ── Mensajes ──────────────────────────────────────────────────────────
  const appendChatMessage = React.useCallback((convId, msg) => {
    setConversations(c => {
      const conv = c[convId] || { id: convId, who: 'RideMe', color: '#5BD0FF', unread: 0, messages: [] };
      const newMsg = { id: Date.now(), time: new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }), ...msg };
      return { ...c, [convId]: { ...conv, messages: [...conv.messages, newMsg], lastTs: Date.now(), unread: msg.from === 'me' ? conv.unread : (conv.unread || 0) + 1 } };
    });
  }, []);
  const markConversationRead = React.useCallback((convId) =>
    setConversations(c => c[convId] ? { ...c, [convId]: { ...c[convId], unread: 0 } } : c), []);

  // ── Reportes ──────────────────────────────────────────────────────────
  const submitReport = React.useCallback((report) => {
    setReports(arr => [{ id: 'r-' + Date.now(), ts: Date.now(), ...report }, ...arr]);
    pushAlert({ kind: 'report', message: `Reporte recibido: ${report.reason}` });
  }, []);

  // ── Driver: requests, earnings, docs ─────────────────────────────────
  const pushDriverRequest = React.useCallback((req) => {
    const id = 'q-' + Date.now() + '-' + Math.floor(Math.random() * 1e4);
    setDriverRequestQueue(arr => [{ id, ...req }, ...arr]);
  }, []);
  const removeDriverRequest = React.useCallback((id) =>
    setDriverRequestQueue(arr => arr.filter(r => r.id !== id)), []);
  const expireDueRequests = React.useCallback(() => {
    const now = Date.now();
    setDriverRequestQueue(arr => arr.filter(r => (r.expiresAt || 0) > now));
  }, []);
  const recordDriverEarning = React.useCallback((fare) => {
    setDriverEarnings(e => ({ ...e, today: (e.today || 0) + fare, trips: (e.trips || 0) + 1, weekly: (e.weekly || 0) + fare }));
  }, []);
  const setDocStatus = React.useCallback((id, status) =>
    setDriverDocs(arr => arr.map(d => d.id === id ? { ...d, status } : d)), []);

  // ── Admin ─────────────────────────────────────────────────────────────
  const updateAdminConfig = React.useCallback((patch) =>
    setAdminConfig(c => ({ ...c, ...patch })), []);
  const pushAlertRef = React.useRef();
  const pushAlert = React.useCallback((a) => {
    setAdminAlerts(arr => [{ id: 'al-' + Date.now(), ts: Date.now(), ...a }, ...arr].slice(0, 200));
  }, []);
  pushAlertRef.current = pushAlert;
  const updateAdminTrip = React.useCallback((id, patch) =>
    setAdminTrips(arr => arr.map(t => t.id === id ? { ...t, ...patch } : t)), []);

  // Tarifa
  const estimateFare = React.useCallback((from, to) =>
    rmEstimateFare(from, to, adminConfig), [adminConfig]);

  // Reset (botón de "olvidar todo" en settings)
  const resetState = React.useCallback(() => {
    try { localStorage.removeItem(RM_STORAGE_KEY); } catch {}
    location.reload();
  }, []);

  const value = {
    // primitivas existentes
    locale, setLocale,
    role, setRole,
    route, goto,
    authed, setAuthed,
    tab, setTab,
    trip, setTrip,
    driverOnline, setDriverOnline,
    adminSection, setAdminSection,
    // datos vivos
    profile, setProfile,
    driverProfile, setDriverProfile,
    paymentMethods, addPaymentMethod, removePaymentMethod, setDefaultPayment,
    history, setHistory,
    scheduled, addScheduled, updateScheduled, removeScheduled,
    conversations, appendChatMessage, markConversationRead,
    driverRequestQueue, pushDriverRequest, removeDriverRequest, expireDueRequests,
    driverEarnings, recordDriverEarning,
    driverDocs, setDocStatus,
    adminConfig, updateAdminConfig,
    adminAlerts, pushAlert,
    adminTrips, updateAdminTrip,
    offers, setOffers,
    reports, submitReport,
    // viaje
    setTripStatus, cancelTrip, completeTrip, submitRating,
    estimateFare,
    // utilitarios
    resetState,
  };
  return <RMStoreCtx.Provider value={value}>{children}</RMStoreCtx.Provider>;
}

function useStore() { return React.useContext(RMStoreCtx); }

window.RMStoreCtx = RMStoreCtx;
window.RMStoreProvider = RMStoreProvider;
window.useStore = useStore;
window.useT = useT;
window.RM_MOCK = RM_MOCK;
window.RM_TRIP_TRANSITIONS = RM_TRIP_TRANSITIONS;
window.rmEstimateFare = rmEstimateFare;
window.rmCanTransition = rmCanTransition;
