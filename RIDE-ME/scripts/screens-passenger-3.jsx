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
