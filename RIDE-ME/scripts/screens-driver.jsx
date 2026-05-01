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
