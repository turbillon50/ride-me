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
