// RideMe — Passenger flow part 2: searching, offers, confirmed, in-progress, rating
// Genera ofertas escalonadas en vivo (varios conductores responden al precio del pasajero).

function rmGenerateOffers(trip) {
  // Crea 2-4 ofertas variadas alrededor del precio sugerido del pasajero.
  const base = trip?.price || trip?.suggested || 110;
  const seed = (trip?.from || '') + (trip?.to || '') + base;
  let h = 0; for (let i = 0; i < seed.length; i++) h = (h << 5) - h + seed.charCodeAt(i) | 0;
  const r = (n) => { h = (h * 9301 + 49297) % 233280; return Math.abs(h % n); };
  const candidates = RM_MOCK.drivers.slice();
  // shuffle determinista
  for (let i = candidates.length - 1; i > 0; i--) {
    const j = r(i + 1); const tmp = candidates[i]; candidates[i] = candidates[j]; candidates[j] = tmp;
  }
  const count = 2 + r(3); // 2..4
  return candidates.slice(0, count).map((d, i) => {
    // El conductor pide entre el precio del rider y +20%
    const delta = r(21); // 0..20%
    const price = Math.round((base * (1 + delta / 100)) / 5) * 5;
    return {
      ...d,
      price,
      eta: 1 + r(11),         // 1..11 min
      distance: +(0.4 + r(40) / 10).toFixed(1), // 0.4..4.4 km
      arriveDelayMs: 800 + i * (900 + r(900)),  // ofertas llegan escalonadas
    };
  });
}

function RMPassengerSearching() {
  const t = useT();
  const { goto, trip, cancelTrip, setOffers, offers } = useStore();
  const [secs, setSecs] = React.useState(45);
  const [confirmCancel, setConfirmCancel] = React.useState(false);

  // Genera ofertas y las publica escalonadamente
  React.useEffect(() => {
    setOffers([]);
    if (!trip) return;
    const planned = rmGenerateOffers(trip);
    const timers = [];
    planned.forEach(p => {
      const id = setTimeout(() => {
        setOffers(arr => [...arr, p]);
      }, p.arriveDelayMs);
      timers.push(id);
    });
    // navega a ofertas cuando llega la primera
    const goId = setTimeout(() => goto('passengerOffers'), planned[0]?.arriveDelayMs + 200);
    timers.push(goId);
    return () => timers.forEach(clearTimeout);
  }, [trip?.from, trip?.to, trip?.price]);

  React.useEffect(() => {
    const tick = setInterval(() => setSecs(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(tick);
  }, []);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0 }}><RMMap showRoute showDriverDots={5}/></div>
      <div style={{ position: 'relative', padding: 12 }}>
        <button onClick={() => setConfirmCancel(true)} style={{
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
          <span style={{ fontWeight: 700 }}>${trip?.price || 110} MXN · {trip?.pay === 'pm-cash' || trip?.pay === 'cash' ? t.cash : t.card}</span>
        </div>
        <div style={{ width: '100%', fontSize: 12, color: 'var(--rm-text-3)', textAlign: 'center' }}>
          {offers.length} {offers.length === 1 ? 'oferta' : 'ofertas'} recibidas
        </div>
        <RMButton variant="danger" full onClick={() => setConfirmCancel(true)}>{t.cancelRequest}</RMButton>
      </div>

      <RMConfirm open={confirmCancel} onClose={() => setConfirmCancel(false)}
        title={t.cancelTripConfirm} message={t.cancelTripSub}
        confirmLabel={t.confirm} cancelLabel={t.back} danger
        onConfirm={() => { cancelTrip('user-cancelled-search'); goto('passengerHome'); }}/>
    </div>
  );
}

function RMPassengerOffers() {
  const t = useT();
  const { goto, trip, setTrip, offers, setOffers, cancelTrip } = useStore();
  const [confirmCancel, setConfirmCancel] = React.useState(false);
  const list = offers.length ? offers : []; // sin fallback estático: si no hay ofertas, empty state

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
          {list.length} {t.driverOffers.toLowerCase()}
        </div>
      </div>
      <div style={{ flex: 1, padding: '14px 16px 16px', overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }} className="rm-scroll">
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <div style={{ fontWeight: 800, fontSize: 18, letterSpacing: '-0.01em' }}>{t.driverOffers}</div>
          <div style={{ fontSize: 12, color: 'var(--rm-text-3)' }}>{t.proposedFare}: ${trip?.price || 110}</div>
        </div>
        {list.length === 0 && (
          <RMEmpty icon={<RMIcon.car/>} title={t.noOffers} sub={t.noOffersSub}
            action={<RMButton variant="secondary" size="sm" onClick={() => goto('passengerSearching')}>{t.retry}</RMButton>}/>
        )}
        {list.map(d => (
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
                  setOffers([]); // limpia las ofertas restantes
                  goto('passengerConfirmed');
                }}>{t.accept}</RMButton>
              </div>
            </div>
          </RMCard>
        ))}
        <RMButton variant="ghost" full onClick={() => setConfirmCancel(true)}>{t.cancelRequest}</RMButton>
      </div>

      <RMConfirm open={confirmCancel} onClose={() => setConfirmCancel(false)}
        title={t.cancelTripConfirm} message={t.cancelTripSub}
        confirmLabel={t.confirm} cancelLabel={t.back} danger
        onConfirm={() => { cancelTrip('user-cancelled-offers'); goto('passengerHome'); }}/>
    </div>
  );
}

function RMPassengerConfirmed() {
  const t = useT();
  const { goto, trip, setTripStatus } = useStore();
  const d = trip?.driver || RM_MOCK.drivers[0];
  React.useEffect(() => {
    const x = setTimeout(() => {
      setTripStatus('arrived');
      const y = setTimeout(() => {
        setTripStatus('in_progress');
        goto('passengerInProgress');
      }, 1600);
      return () => clearTimeout(y);
    }, 1800);
    return () => clearTimeout(x);
  }, []);
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
  const t = useT();
  const { goto, trip, completeTrip } = useStore();
  const d = trip?.driver || RM_MOCK.drivers[0];
  const [confirmCall, setConfirmCall] = React.useState(false);
  const [confirmFinish, setConfirmFinish] = React.useState(false);
  const fare = trip?.fare || d.price;

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
          <button onClick={() => setConfirmCall(true)} style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--rm-green)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><RMIcon.phone/></button>
          <button onClick={() => goto('passengerChat')} style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--rm-blue)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><RMIcon.chat/></button>
        </div>
        <div style={{ marginTop: 14, padding: 12, background: 'var(--rm-surface-alt)', borderRadius: 'var(--rm-r-md)' }}>
          <RMRouteRow from={trip?.from || 'Roma Norte'} to={trip?.to || 'Polanco'}/>
        </div>
        <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 4px' }}>
          <div>
            <div style={{ fontSize: 12, color: 'var(--rm-text-3)' }}>{t.agreedFare}</div>
            <div style={{ fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em' }}>${fare} MXN</div>
          </div>
          <RMBadge tone="blue">{trip?.pay === 'pm-cash' || trip?.pay === 'cash' ? t.cash : t.card}</RMBadge>
        </div>
        <RMButton variant="primary" full onClick={() => setConfirmFinish(true)}>{t.finishTrip}</RMButton>
      </div>

      <RMConfirm open={confirmCall} onClose={() => setConfirmCall(false)}
        title={t.callConfirm} message={t.callConfirmSub}
        confirmLabel={t.callDriver} cancelLabel={t.cancel}
        onConfirm={() => { try { window.location.href = 'tel:+525500000000'; } catch {} }}/>
      <RMConfirm open={confirmFinish} onClose={() => setConfirmFinish(false)}
        title={t.finishConfirm} message={t.finishConfirmSub}
        confirmLabel={t.finishTrip} cancelLabel={t.cancel}
        onConfirm={() => { completeTrip(fare); goto('passengerRating'); }}/>
    </div>
  );
}

function RMPassengerRating() {
  const t = useT();
  const { goto, trip, history, submitRating, submitReport } = useStore();
  const d = trip?.driver || (history[0] && { name: history[0].driver, photo: '#5BD0FF' }) || RM_MOCK.drivers[0];
  const recordedFare = history[0]?.fare ?? trip?.fare ?? d.price ?? 0;
  const [stars, setStars] = React.useState(5);
  const [comment, setComment] = React.useState('');
  const [reportOpen, setReportOpen] = React.useState(false);
  const [reportReason, setReportReason] = React.useState(RM_MOCK.reportReasons[0].id);
  const [reportDetail, setReportDetail] = React.useState('');
  const [toast, setToast] = React.useState(null);
  const [submitting, setSubmitting] = React.useState(false);

  const onSubmit = () => {
    if (submitting) return;
    setSubmitting(true);
    submitRating(stars, comment);
    setToast(t.thanksRating);
    setTimeout(() => goto('passengerHome'), 800);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff', position: 'relative' }}>
      <RMTopBar title={t.rateDriver} onBack={() => goto('passengerHome')}/>
      <div style={{ flex: 1, padding: 24, display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'center' }}>
        <RMAvatar name={d.name} color={d.photo} size={88}/>
        <div style={{ fontWeight: 800, fontSize: 22 }}>{d.name}</div>
        <div style={{ fontSize: 13, color: 'var(--rm-text-2)' }}>{d.car || ''} {d.car ? '·' : ''} ${recordedFare} MXN</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {[1,2,3,4,5].map(n => (
            <button key={n} onClick={() => setStars(n)} style={{ width: 44, height: 44, color: n <= stars ? '#F59E0B' : '#D6E0EE' }}>
              <svg width="44" height="44" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.1 6.6 7.2.8-5.4 5 1.6 7.1L12 18l-6.5 3.5L7 14.4 1.7 9.4l7.2-.8L12 2z"/></svg>
            </button>
          ))}
        </div>
        <div style={{ width: '100%' }}>
          <RMTextarea value={comment} onChange={setComment} placeholder={t.leaveComment} rows={3}/>
        </div>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <RMButton variant="primary" full onClick={onSubmit} disabled={submitting}>{t.submitRating}</RMButton>
          <button onClick={() => setReportOpen(true)} style={{ fontSize: 13, color: 'var(--rm-red)', fontWeight: 600, padding: 8 }}>{t.report}</button>
        </div>
      </div>

      <RMModal open={reportOpen} onClose={() => setReportOpen(false)} title={t.reportTitle}
        footer={<>
          <RMButton variant="primary" full onClick={() => {
            submitReport({ reason: RM_MOCK.reportReasons.find(r => r.id === reportReason)?.es || reportReason,
              detail: reportDetail, driver: d.name, tripId: history[0]?.id });
            setReportOpen(false);
            setToast(t.reportSubmitted);
          }}>{t.send}</RMButton>
          <RMButton variant="secondary" full onClick={() => setReportOpen(false)}>{t.cancel}</RMButton>
        </>}>
        <RMSelect label={t.reportReason} value={reportReason} onChange={setReportReason}
          options={RM_MOCK.reportReasons.map(r => ({ value: r.id, label: r.es }))}/>
        <div style={{ height: 10 }}/>
        <RMTextarea label={t.reportDescription} value={reportDetail} onChange={setReportDetail}
          placeholder="Cuéntanos qué pasó…" rows={4}/>
      </RMModal>

      <RMToast open={!!toast} onClose={() => setToast(null)} kind="success">{toast}</RMToast>
    </div>
  );
}

Object.assign(window, { RMPassengerSearching, RMPassengerOffers, RMPassengerConfirmed, RMPassengerInProgress, RMPassengerRating });
