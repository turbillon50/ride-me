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
