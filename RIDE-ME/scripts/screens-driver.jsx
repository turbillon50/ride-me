// RideMe — Driver screens

// Helper: genera una solicitud aleatoria (mock realista) para un conductor en línea
function rmGenerateDriverRequest() {
  const riders = ['Lucía F.', 'Diego R.', 'Pablo G.', 'Sofía A.', 'Mario T.', 'Valeria K.', 'Ramón Q.', 'Inés B.'];
  const places = ['Roma Norte', 'Polanco', 'Condesa', 'Coyoacán', 'Centro', 'Santa Fe', 'Del Valle', 'Doctores', 'Juárez', 'Granada'];
  const r = (n) => Math.floor(Math.random() * n);
  const from = places[r(places.length)];
  let to = places[r(places.length)];
  if (to === from) to = places[(places.indexOf(from) + 1) % places.length];
  const distance = +(2 + Math.random() * 12).toFixed(1);
  const suggested = Math.max(40, Math.round((25 + 8 * distance + 1.5 * distance * 2.6) / 5) * 5);
  const riderPrice = Math.max(40, Math.round((suggested * (0.85 + Math.random() * 0.2)) / 5) * 5);
  return {
    rider: riders[r(riders.length)], from, to, distance,
    suggested, riderPrice, expiresAt: Date.now() + (15 + r(15)) * 1000,
  };
}

function RMDriverDashboard() {
  const t = useT();
  const {
    goto, driverOnline, setDriverOnline, setTrip,
    driverRequestQueue, pushDriverRequest, removeDriverRequest, expireDueRequests,
    driverEarnings, driverProfile,
  } = useStore();
  const [tick, setTick] = React.useState(0); // forzar re-render para countdowns

  // Tick visual + expiración + generación periódica
  React.useEffect(() => {
    const id = setInterval(() => {
      expireDueRequests();
      setTick(x => x + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);
  React.useEffect(() => {
    if (!driverOnline) return;
    const gen = setInterval(() => {
      // Generar 1 solicitud nueva si hay menos de 4 en cola
      if (driverRequestQueue.length < 4) pushDriverRequest(rmGenerateDriverRequest());
    }, 22000);
    return () => clearInterval(gen);
  }, [driverOnline, driverRequestQueue.length]);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--rm-bg)' }}>
      <div style={{ background: 'linear-gradient(160deg, var(--rm-navy) 0%, var(--rm-blue) 100%)', color: '#fff', padding: '16px 18px 22px', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <RMAvatar name={driverProfile.name} color={driverProfile.photoColor} size={40}/>
            <div>
              <div style={{ fontSize: 12, opacity: 0.8 }}>Hola,</div>
              <div style={{ fontWeight: 700 }}>{driverProfile.name}</div>
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
            <div style={{ fontWeight: 800, fontSize: 24, letterSpacing: '-0.02em' }}>${driverEarnings.today}</div>
            <div style={{ fontSize: 11, color: 'var(--rm-green)', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}><RMIcon.trend style={{ width: 14, height: 14 }}/> +12% vs ayer</div>
          </RMCard>
          <RMCard padding={14}>
            <div style={{ fontSize: 11, color: 'var(--rm-text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t.tripsCompleted}</div>
            <div style={{ fontWeight: 800, fontSize: 24, letterSpacing: '-0.02em' }}>{driverEarnings.trips}</div>
            <div style={{ fontSize: 11, color: 'var(--rm-text-2)', marginTop: 2 }}>{driverEarnings.hours}h conectado</div>
          </RMCard>
          <RMCard padding={14}>
            <div style={{ fontSize: 11, color: 'var(--rm-text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t.rating}</div>
            <div style={{ fontWeight: 800, fontSize: 24, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: 6 }}>
              <RMIcon.star style={{ color: '#F59E0B', width: 22, height: 22 }}/> {driverEarnings.rating}
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
            <RMBadge tone="green"><span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }}/> Live · {driverRequestQueue.length}</RMBadge>
          </div>
          {!driverOnline ? (
            <RMCard padding={20}>
              <RMEmpty icon={<RMIcon.car/>} title={t.unavailable} sub="Conéctate para empezar a recibir solicitudes."
                action={<RMButton variant="primary" onClick={() => setDriverOnline(true)}>{t.goOnline}</RMButton>}/>
            </RMCard>
          ) : driverRequestQueue.length === 0 ? (
            <RMCard padding={20}>
              <RMEmpty icon={<RMIcon.search/>} title={t.noLiveRequests} sub={t.noLiveRequestsSub}/>
            </RMCard>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {driverRequestQueue.map(r => {
                const remaining = Math.max(0, Math.floor(((r.expiresAt || 0) - Date.now()) / 1000));
                return (
                  <RMCard key={r.id} padding={14}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                        <RMAvatar name={r.rider} color="#FFB37C" size={36}/>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 14 }}>{r.rider}</div>
                          <div style={{ fontSize: 11, color: 'var(--rm-text-3)' }}>{r.distance} km · {t.expiresIn} {remaining}s</div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 11, color: 'var(--rm-text-3)' }}>{t.proposedFare}</div>
                        <div style={{ fontWeight: 800, fontSize: 18, color: 'var(--rm-blue)' }}>${r.riderPrice}</div>
                      </div>
                    </div>
                    <RMRouteRow from={r.from} to={r.to}/>
                    <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                      <RMButton variant="secondary" full size="sm" onClick={() => removeDriverRequest(r.id)}>{t.reject}</RMButton>
                      <RMButton variant="primary" full size="sm" onClick={() => { setTrip({ request: r, status: 'quoting' }); goto('driverOffer'); }}>{t.submitOffer}</RMButton>
                    </div>
                  </RMCard>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function RMDriverOffer() {
  const t = useT();
  const { goto, trip, setTrip, removeDriverRequest } = useStore();
  const r = trip?.request || { rider: '—', from: '—', to: '—', distance: 0, suggested: 100, riderPrice: 100 };
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

        <RMButton variant="primary" full size="lg" onClick={() => {
          if (r.id) removeDriverRequest(r.id);
          setTrip({ ...trip, fare: price, status: 'in_progress' });
          goto('driverInProgress');
        }}>{t.submitOffer}</RMButton>
        <RMButton variant="secondary" full onClick={() => { if (r.id) removeDriverRequest(r.id); goto('driverDashboard'); }}>{t.reject}</RMButton>
      </div>
    </div>
  );
}

function RMDriverInProgress() {
  const t = useT();
  const { goto, trip, setTrip, recordDriverEarning, pushAlert } = useStore();
  const r = trip?.request || { rider: '—', from: '—', to: '—', suggested: 100 };
  const [stage, setStage] = React.useState(0); // 0 to_pickup, 1 arrived, 2 in_trip
  const [confirmCall, setConfirmCall] = React.useState(false);
  const [confirmComplete, setConfirmComplete] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  const stages = [
    { label: t.goToPickup, action: t.iArrived,    sub: t.onTheWay,            variant: 'primary' },
    { label: t.driverArrived, action: t.startTrip, sub: 'Esperando pasajero',  variant: 'primary' },
    { label: t.tripInProgress, action: t.completeTrip, sub: 'En curso',         variant: 'success' },
  ];
  const cur = stages[stage];
  const fare = trip?.fare || r.suggested || 100;
  const next = () => {
    if (stage < 2) { setStage(stage + 1); return; }
    setConfirmComplete(true);
  };

  const finalize = () => {
    recordDriverEarning(fare);
    pushAlert({ kind: 'trip', message: `Viaje completado: ${r.from} → ${r.to} ($${fare})` });
    setTrip(null);
    setToast(t.tripCompleted);
    setTimeout(() => goto('driverDashboard'), 700);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
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
          <button onClick={() => setConfirmCall(true)} style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--rm-green)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><RMIcon.phone/></button>
          <button onClick={() => goto('passengerChat', { convId: 'c1' })} style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--rm-blue)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><RMIcon.chat/></button>
        </div>
        <div style={{ padding: 12, background: 'var(--rm-surface-alt)', borderRadius: 'var(--rm-r-md)', marginBottom: 12 }}>
          <RMRouteRow from={r.from} to={r.to}/>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 4px 12px' }}>
          <div style={{ fontSize: 12, color: 'var(--rm-text-3)' }}>{t.agreedFare}</div>
          <div style={{ fontWeight: 800, fontSize: 22 }}>${fare} MXN</div>
        </div>
        <RMButton variant={cur.variant} full size="lg" onClick={next}>{cur.action}</RMButton>
      </div>

      <RMConfirm open={confirmCall} onClose={() => setConfirmCall(false)}
        title={t.callConfirm} message={t.callConfirmSub}
        confirmLabel={t.callDriver} cancelLabel={t.cancel}
        onConfirm={() => { try { window.location.href = 'tel:+525500000000'; } catch {} }}/>
      <RMConfirm open={confirmComplete} onClose={() => setConfirmComplete(false)}
        title={t.finishConfirm} message={t.finishConfirmSub}
        confirmLabel={t.completeTrip} cancelLabel={t.cancel}
        onConfirm={finalize}/>
      <RMToast open={!!toast} onClose={() => setToast(null)} kind="success">{toast}</RMToast>
    </div>
  );
}

function RMDriverDocs() {
  const t = useT();
  const { goto, driverDocs, setDocStatus } = useStore();
  const [resubmit, setResubmit] = React.useState(null);
  const [fileName, setFileName] = React.useState('');
  const [toast, setToast] = React.useState(null);
  const tones = { approved: 'green', pending: 'amber', rejected: 'red' };
  const labels = { approved: t.docApproved, pending: t.docPending, rejected: t.docRejected };

  const submit = () => {
    if (!fileName) return;
    setDocStatus(resubmit.id, 'pending');
    setResubmit(null);
    setFileName('');
    setToast(t.docResubmitted);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--rm-bg)', position: 'relative' }}>
      <RMTopBar onBack={() => goto('driverDashboard')} title={t.documents}/>
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }} className="rm-scroll">
        {driverDocs.map(d => (
          <RMCard key={d.id} padding={14}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--rm-bg)', color: 'var(--rm-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <RMIcon.doc/>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{d.name}</div>
                <RMBadge tone={tones[d.status]} style={{ marginTop: 4 }}>{labels[d.status]}</RMBadge>
              </div>
              {d.status === 'rejected' && <RMButton variant="primary" size="sm" icon={<RMIcon.upload/>} onClick={() => setResubmit(d)}>{t.docResubmit}</RMButton>}
              {d.status !== 'rejected' && <RMIcon.arrowR style={{ color: 'var(--rm-text-3)' }}/>}
            </div>
          </RMCard>
        ))}
      </div>

      <RMModal open={!!resubmit} onClose={() => { setResubmit(null); setFileName(''); }}
        title={t.docResubmitTitle}>
        <div style={{ color: 'var(--rm-text-2)', fontSize: 13, marginBottom: 12 }}>{t.docResubmitSub}</div>
        <div style={{ fontWeight: 700, marginBottom: 10 }}>{resubmit?.name}</div>
        <label style={{
          display: 'block', padding: 24, border: '2px dashed var(--rm-border-strong)', borderRadius: 'var(--rm-r-md)',
          textAlign: 'center', cursor: 'pointer', color: 'var(--rm-text-2)',
        }}>
          <RMIcon.upload/>
          <div style={{ marginTop: 6, fontWeight: 600 }}>{t.docChooseFile}</div>
          {fileName && <div style={{ marginTop: 6, fontSize: 12, color: 'var(--rm-blue)' }}>{t.docFileSelected}: {fileName}</div>}
          <input type="file" accept="image/*,application/pdf" style={{ display: 'none' }}
            onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}/>
        </label>
        <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <RMButton variant="primary" full disabled={!fileName} onClick={submit}>{t.send}</RMButton>
          <RMButton variant="secondary" full onClick={() => { setResubmit(null); setFileName(''); }}>{t.cancel}</RMButton>
        </div>
      </RMModal>
      <RMToast open={!!toast} onClose={() => setToast(null)} kind="success">{toast}</RMToast>
    </div>
  );
}

Object.assign(window, { RMDriverDashboard, RMDriverOffer, RMDriverInProgress, RMDriverDocs });
