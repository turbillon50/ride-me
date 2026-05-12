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
  if (r === 'privacy') return <RMPrivacy/>;
  if (r === 'terms') return <RMTerms/>;

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
      passengerEditProfile: <RMPassengerEditProfile/>,
      passengerPaymentMethods: <RMPassengerPaymentMethods/>,
      passengerSecurity: <RMPassengerSecurity/>,
      passengerNotifications: <RMPassengerNotifications/>,
      passengerHelp: <RMPassengerHelp/>,
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

// Phone frame (custom, lightweight — avoids dependency on starter component nuances)
function RMPhone({ children }) {
  return (
    <div style={{
      width: 390, height: 844, background: '#000', borderRadius: 54, padding: 12,
      boxShadow: '0 30px 80px rgba(0,0,0,0.45), 0 0 0 2px #1a1a1a',
      flexShrink: 0, position: 'relative',
    }}>
      <div style={{
        width: '100%', height: '100%', borderRadius: 42, overflow: 'hidden',
        background: '#fff', position: 'relative', display: 'flex', flexDirection: 'column',
      }}>
        {/* Notch / Dynamic Island */}
        <div style={{
          position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
          width: 110, height: 32, background: '#000', borderRadius: 20, zIndex: 100,
        }}/>
        {/* Status bar */}
        <div style={{
          height: 52, padding: '14px 28px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          fontSize: 14, fontWeight: 700, color: 'var(--rm-navy)', flexShrink: 0, position: 'relative', zIndex: 50,
          background: 'transparent', pointerEvents: 'none',
        }}>
          <span>9:41</span>
          <span style={{ display: 'inline-flex', gap: 5, alignItems: 'center' }}>
            <svg width="16" height="11" viewBox="0 0 16 11"><rect x="0" y="7" width="3" height="4" rx="0.5" fill="currentColor"/><rect x="4.5" y="5" width="3" height="6" rx="0.5" fill="currentColor"/><rect x="9" y="2.5" width="3" height="8.5" rx="0.5" fill="currentColor"/><rect x="13.5" y="0" width="3" height="11" rx="0.5" fill="currentColor"/></svg>
            <svg width="22" height="11" viewBox="0 0 22 11"><rect x="0.5" y="0.5" width="18" height="10" rx="2.5" stroke="currentColor" fill="none" opacity="0.4"/><rect x="2" y="2" width="15" height="7" rx="1.2" fill="currentColor"/></svg>
          </span>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {children}
        </div>
        {/* Home indicator */}
        <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', width: 134, height: 5, borderRadius: 3, background: '#000', zIndex: 50 }}/>
      </div>
    </div>
  );
}

function RMDesktopFrame({ children }) {
  return (
    <div style={{
      width: 1280, height: 820, background: '#fff', borderRadius: 16, overflow: 'hidden',
      boxShadow: '0 30px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)',
      display: 'flex', flexDirection: 'column', flexShrink: 0,
    }}>
      <div style={{ height: 38, background: '#1a1a1a', display: 'flex', alignItems: 'center', padding: '0 14px', gap: 8 }}>
        <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }}/>
        <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }}/>
        <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }}/>
        <div style={{ flex: 1, textAlign: 'center', fontSize: 12, color: '#9aa0a6', fontWeight: 500 }}>admin.rideme.app</div>
      </div>
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>{children}</div>
    </div>
  );
}

function RMRoot() {
  const { role } = useStore();
  return (
    <div style={{
      minHeight: '100vh', width: '100%',
      background: 'radial-gradient(circle at 30% 20%, #0d1b3d 0%, #050810 60%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
    }}>
      {role === 'admin' ? (
        <RMDesktopFrame><RMAppRouter/></RMDesktopFrame>
      ) : (
        <RMPhone><RMAppRouter/></RMPhone>
      )}
    </div>
  );
}

function RMApp() {
  return <RMStoreProvider><RMRoot/></RMStoreProvider>;
}

ReactDOM.createRoot(document.getElementById('root')).render(<RMApp/>);
