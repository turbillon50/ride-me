// RideMe — Passenger screens (parte 1: home + cotización)
function RMPassengerHome() {
  const t = useT();
  const { goto, setTrip, setTripStatus, scheduled } = useStore();
  const [dest, setDest] = React.useState('');
  const [showSheet, setShowSheet] = React.useState(false);

  // Próximo programado (si lo hay) para mostrar como atajo
  const nextScheduled = scheduled.length ? scheduled.slice().sort((a,b) => (a.whenTs||0) - (b.whenTs||0))[0] : null;

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
        <button onClick={() => goto('passengerMessages')} style={{
          width: 44, height: 44, borderRadius: '50%', background: '#fff', boxShadow: 'var(--rm-shadow-md)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--rm-blue)'
        }}><RMIcon.bell/></button>
      </div>
      <div style={{ flex: 1 }}/>

      {/* Atajo a próximo programado */}
      {nextScheduled && (
        <div style={{ position: 'relative', zIndex: 5, margin: '0 12px 8px', padding: '10px 14px',
          background: 'rgba(13,27,61,0.92)', color: '#fff', borderRadius: 'var(--rm-r-md)',
          display: 'flex', alignItems: 'center', gap: 10, boxShadow: 'var(--rm-shadow-md)' }}>
          <RMIcon.clock/>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11, opacity: 0.7 }}>{t.scheduledRides} · {nextScheduled.when}</div>
            <div style={{ fontWeight: 700, fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {nextScheduled.from} → {nextScheduled.to}
            </div>
          </div>
          <button onClick={() => goto('passengerScheduled')} style={{
            padding: '6px 10px', fontSize: 11, fontWeight: 700, borderRadius: 'var(--rm-r-full)',
            background: 'var(--rm-cyan)', color: 'var(--rm-navy)',
          }}>{t.viewDetails}</button>
        </div>
      )}

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
        setTrip({ from: o, to: d, status: 'quoting' });
        setShowSheet(false); goto('passengerPrice');
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
        <RMButton variant="primary" full onClick={() => onContinue(origin, dest || 'Plaza Antara')} disabled={!origin || (!dest && true && !origin.trim())}>
          {t.continue}
        </RMButton>
      </div>
    </div>
  );
}

function RMPassengerPrice() {
  const t = useT();
  const { goto, trip, setTrip, estimateFare, paymentMethods } = useStore();
  const from = trip?.from || 'Mi ubicación';
  const to = trip?.to || 'Plaza Antara';
  const est = React.useMemo(() => estimateFare(from, to), [from, to, estimateFare]);
  const [price, setPrice] = React.useState(est.suggested);
  const defaultPay = paymentMethods.find(p => p.isDefault) || paymentMethods[0];
  const [pay, setPay] = React.useState(defaultPay?.id || 'pm-cash');

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff' }}>
      <div style={{ height: 240, position: 'relative' }}>
        <RMMap showRoute showDriverDots={3} height="100%"/>
        <button onClick={() => goto('passengerHome')} style={{
          position: 'absolute', top: 12, left: 12,
          width: 40, height: 40, borderRadius: '50%', background: '#fff', boxShadow: 'var(--rm-shadow-md)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}><RMIcon.arrowL/></button>
        <div style={{ position: 'absolute', top: 12, right: 12, padding: '6px 12px', background: '#fff',
          borderRadius: 'var(--rm-r-full)', boxShadow: 'var(--rm-shadow-md)', fontSize: 12, fontWeight: 700, display: 'flex', gap: 10 }}>
          <span><RMIcon.trip style={{ width: 14, height: 14, verticalAlign: 'middle' }}/> {est.distance} {t.km}</span>
          <span style={{ color: 'var(--rm-text-3)' }}>·</span>
          <span><RMIcon.clock style={{ width: 14, height: 14, verticalAlign: 'middle' }}/> {est.duration} {t.etaMin}</span>
        </div>
      </div>
      <div style={{ flex: 1, padding: '16px 20px 20px', display: 'flex', flexDirection: 'column', gap: 14, overflow: 'auto' }} className="rm-scroll">
        <RMCard padding={14}>
          <RMRouteRow from={from} to={to}/>
        </RMCard>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>{t.proposedFare}</div>
            <div style={{ fontSize: 12, color: 'var(--rm-text-3)' }}>{t.fareSuggestion}: ${est.suggested}</div>
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
              <input type="range" min="40" max={Math.max(200, est.suggested * 2)} step="5" value={price}
                onChange={(e) => setPrice(+e.target.value)}
                style={{ width: '100%', accentColor: 'var(--rm-blue)' }}/>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--rm-text-3)' }}>
                <span>$40</span><span>${Math.max(200, est.suggested * 2)}</span>
              </div>
            </div>
            {est.surge >= 1.4 && (
              <div style={{ marginTop: 10, padding: '8px 10px', background: 'var(--rm-amber-bg)', borderRadius: 'var(--rm-r-md)', color: '#92580B', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                <RMIcon.alert style={{ width: 14, height: 14 }}/> {t.surgeNotice} (×{est.surge})
              </div>
            )}
          </RMCard>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>{t.paymentMethod}</div>
            <button onClick={() => goto('passengerPaymentMethods')} style={{ fontSize: 12, color: 'var(--rm-blue)', fontWeight: 700 }}>+ {t.addCard}</button>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {paymentMethods.map(p => (
              <button key={p.id} onClick={() => setPay(p.id)} style={{
                flex: '1 1 45%', padding: 12, borderRadius: 'var(--rm-r-md)',
                background: pay === p.id ? '#E2ECFD' : '#fff',
                border: `1.5px solid ${pay === p.id ? 'var(--rm-blue)' : 'var(--rm-border)'}`,
                display: 'flex', alignItems: 'center', gap: 10, color: pay === p.id ? 'var(--rm-blue)' : 'var(--rm-text)',
                fontWeight: 600, fontSize: 13, textAlign: 'left',
              }}>
                {p.kind === 'cash' ? <RMIcon.cash/> : <RMIcon.card/>}
                <span style={{ flex: 1 }}>{p.kind === 'cash' ? t.cash : `${p.label} •• ${p.last4}`}</span>
              </button>
            ))}
          </div>
        </div>

        <RMButton variant="primary" size="lg" full onClick={() => {
          setTrip({ ...trip, price, pay, distance: est.distance, duration: est.duration, suggested: est.suggested, status: 'searching' });
          goto('passengerSearching');
        }}>{t.searchDrivers}</RMButton>
      </div>
    </div>
  );
}

Object.assign(window, { RMPassengerHome, RMPassengerPrice });
