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
