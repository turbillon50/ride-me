// RideMe — Passenger: scheduled, history, messages, chat, profile + subpáginas

// ─── Helper: form de programación (compartido para crear/editar) ─────────
function RMScheduleForm({ initial, onSave, onCancel }) {
  const t = useT();
  const { estimateFare, paymentMethods } = useStore();
  const dt = initial?.whenTs ? new Date(initial.whenTs) : new Date(Date.now() + 86400e3);
  const dateStr = dt.toISOString().slice(0, 10);
  const timeStr = `${String(dt.getHours()).padStart(2,'0')}:${String(dt.getMinutes()).padStart(2,'0')}`;
  const [from, setFrom] = React.useState(initial?.from || '');
  const [to, setTo]     = React.useState(initial?.to || '');
  const [date, setDate] = React.useState(dateStr);
  const [time, setTime] = React.useState(timeStr);
  const [pay, setPay]   = React.useState(initial?.pay || (paymentMethods.find(p => p.isDefault) || paymentMethods[0])?.id || 'pm-cash');
  const [notes, setNotes] = React.useState(initial?.notes || '');
  const [errors, setErrors] = React.useState({});
  const est = React.useMemo(() => from && to ? estimateFare(from, to) : null, [from, to, estimateFare]);

  const submit = () => {
    const e = {};
    if (!from.trim()) e.from = t.errRequired;
    if (!to.trim())   e.to   = t.errRequired;
    if (!date)        e.date = t.errRequired;
    if (!time)        e.time = t.errRequired;
    setErrors(e);
    if (Object.keys(e).length) return;
    const whenTs = new Date(`${date}T${time}:00`).getTime();
    const when = new Date(whenTs).toLocaleString('es-MX', { weekday: 'short', day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
    onSave({ from: from.trim(), to: to.trim(), when, whenTs, pay, notes: notes.trim(), fare: est?.suggested || initial?.fare || 100 });
  };

  return (
    <>
      <RMInput label={t.origin} value={from} onChange={setFrom} placeholder="Ej. Casa" error={errors.from}/>
      <div style={{ height: 8 }}/>
      <RMInput label={t.destination} value={to} onChange={setTo} placeholder="Ej. Aeropuerto T1" error={errors.to}/>
      <div style={{ height: 8 }}/>
      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{ flex: 1 }}>
          <RMInput label={t.scheduleDate} type="date" value={date} onChange={setDate} error={errors.date}/>
        </div>
        <div style={{ flex: 1 }}>
          <RMInput label={t.scheduleTime} type="time" value={time} onChange={setTime} error={errors.time}/>
        </div>
      </div>
      <div style={{ height: 8 }}/>
      <RMSelect label={t.paymentMethod} value={pay} onChange={setPay}
        options={paymentMethods.map(p => ({ value: p.id, label: p.kind === 'cash' ? t.cash : `${p.label} •• ${p.last4}` }))}/>
      <div style={{ height: 8 }}/>
      <RMTextarea label={t.scheduleNotes} value={notes} onChange={setNotes} placeholder={t.scheduleNotesPlaceholder} rows={2}/>
      {est && (
        <div style={{ marginTop: 12, padding: 10, background: 'var(--rm-bg)', borderRadius: 'var(--rm-r-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 12, color: 'var(--rm-text-3)' }}>{t.scheduleSuggested}</div>
          <div style={{ fontWeight: 800, fontSize: 18 }}>${est.suggested} <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--rm-text-3)' }}>· {est.distance} km · {est.duration} min</span></div>
        </div>
      )}
      <div style={{ marginTop: 8, fontSize: 11, color: 'var(--rm-text-3)' }}>{t.scheduleHint}</div>
      <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <RMButton variant="primary" full onClick={submit}>{t.save}</RMButton>
        <RMButton variant="secondary" full onClick={onCancel}>{t.cancel}</RMButton>
      </div>
    </>
  );
}

function RMPassengerScheduled() {
  const t = useT();
  const { goto, scheduled, addScheduled, updateScheduled, removeScheduled, setTrip } = useStore();
  const [editing, setEditing] = React.useState(null); // null | 'new' | id
  const [confirmDelete, setConfirmDelete] = React.useState(null);
  const [toast, setToast] = React.useState(null);
  const target = editing && editing !== 'new' ? scheduled.find(s => s.id === editing) : null;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--rm-bg)', position: 'relative' }}>
      <RMTopBar title={t.scheduledRides} right={
        <RMButton variant="ghost" size="sm" icon={<RMIcon.plus/>} onClick={() => setEditing('new')}>{t.newScheduled}</RMButton>
      }/>
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }} className="rm-scroll">
        {scheduled.map(s => (
          <RMCard key={s.id} padding={14}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <RMBadge tone="blue">{s.when}</RMBadge>
              <span style={{ fontWeight: 800 }}>${s.fare}</span>
            </div>
            <RMRouteRow from={s.from} to={s.to}/>
            {s.notes && <div style={{ marginTop: 8, fontSize: 12, color: 'var(--rm-text-2)', fontStyle: 'italic' }}>"{s.notes}"</div>}
            <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
              <RMButton variant="primary" size="sm" full icon={<RMIcon.car/>} onClick={() => {
                setTrip({ from: s.from, to: s.to, price: s.fare, pay: s.pay, status: 'searching', scheduledFromId: s.id });
                goto('passengerSearching');
              }}>{t.scheduleNow}</RMButton>
              <RMButton variant="secondary" size="sm" onClick={() => setEditing(s.id)}>{t.edit}</RMButton>
              <RMButton variant="danger" size="sm" onClick={() => setConfirmDelete(s.id)}>{t.cancel}</RMButton>
            </div>
          </RMCard>
        ))}
        {scheduled.length === 0 && <RMEmpty icon={<RMIcon.clock/>} title={t.noScheduled}
          action={<RMButton variant="primary" size="sm" onClick={() => setEditing('new')}>{t.newScheduled}</RMButton>}/>}
      </div>

      <RMModal open={editing === 'new'} onClose={() => setEditing(null)} title={t.newScheduled}>
        <RMScheduleForm
          onSave={(data) => { addScheduled(data); setEditing(null); setToast(t.scheduleSaved); }}
          onCancel={() => setEditing(null)}/>
      </RMModal>
      <RMModal open={!!target} onClose={() => setEditing(null)} title={t.editScheduled}>
        {target && <RMScheduleForm initial={target}
          onSave={(data) => { updateScheduled(target.id, data); setEditing(null); setToast(t.scheduleUpdated); }}
          onCancel={() => setEditing(null)}/>}
      </RMModal>
      <RMConfirm open={!!confirmDelete} onClose={() => setConfirmDelete(null)}
        title={t.scheduleCancelConfirm} message={t.actionUndoable}
        confirmLabel={t.delete} cancelLabel={t.back} danger
        onConfirm={() => { removeScheduled(confirmDelete); setToast(t.scheduleCancelled); }}/>
      <RMToast open={!!toast} onClose={() => setToast(null)} kind="success">{toast}</RMToast>
    </div>
  );
}

function RMPassengerHistory() {
  const t = useT();
  const { goto, history, setTrip } = useStore();
  const [filter, setFilter] = React.useState('all');
  const [detail, setDetail] = React.useState(null);
  const filtered = history.filter(h => filter === 'all' || h.status === filter);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--rm-bg)', position: 'relative' }}>
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
          <button key={h.id} onClick={() => setDetail(h)} style={{ textAlign: 'left' }}>
            <RMCard padding={14}>
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
          </button>
        ))}
        {filtered.length === 0 && <RMEmpty icon={<RMIcon.trip/>} title={t.empty}/>}
      </div>

      <RMModal open={!!detail} onClose={() => setDetail(null)} title={t.tripDetail}>
        {detail && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <RMRouteRow from={detail.from} to={detail.to}/>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}><span style={{ color: 'var(--rm-text-3)' }}>{t.fare}</span><b>${detail.fare}</b></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}><span style={{ color: 'var(--rm-text-3)' }}>Conductor</span><b>{detail.driver}</b></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}><span style={{ color: 'var(--rm-text-3)' }}>Estado</span>
              <RMBadge tone={detail.status === 'completed' ? 'green' : 'red'}>{detail.status === 'completed' ? t.completed : t.cancelled}</RMBadge>
            </div>
            {detail.rating && <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}><span style={{ color: 'var(--rm-text-3)' }}>Tu calificación</span><b>{'★'.repeat(detail.rating)}</b></div>}
            {detail.comment && <div style={{ padding: 10, background: 'var(--rm-bg)', borderRadius: 8, fontSize: 13, fontStyle: 'italic' }}>"{detail.comment}"</div>}
            <div style={{ marginTop: 8 }}>
              <RMButton variant="primary" full onClick={() => {
                setTrip({ from: detail.from, to: detail.to, status: 'quoting' });
                setDetail(null); goto('passengerPrice');
              }}>{t.rebookTrip}</RMButton>
            </div>
          </div>
        )}
      </RMModal>
    </div>
  );
}

function RMPassengerMessages() {
  const t = useT();
  const { goto, conversations, markConversationRead } = useStore();
  const list = Object.values(conversations).sort((a, b) => (b.lastTs || 0) - (a.lastTs || 0));
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff' }}>
      <RMTopBar title={t.messages}/>
      <div style={{ flex: 1, overflow: 'auto' }} className="rm-scroll">
        {list.length === 0 && <RMEmpty icon={<RMIcon.chat/>} title={t.noMessages}/>}
        {list.map(c => {
          const last = c.messages[c.messages.length - 1];
          return (
            <button key={c.id} onClick={() => { markConversationRead(c.id); goto('passengerChat', { convId: c.id }); }} style={{
              width: '100%', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
              borderBottom: '1px solid var(--rm-border)', textAlign: 'left',
            }}>
              <RMAvatar name={c.who} color={c.color} size={48}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{c.who}</div>
                  <div style={{ fontSize: 11, color: 'var(--rm-text-3)' }}>{last ? new Date(c.lastTs).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }) : ''}</div>
                </div>
                <div style={{ fontSize: 13, color: 'var(--rm-text-2)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{last?.text || '—'}</div>
              </div>
              {c.unread > 0 && <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--rm-blue)', color: '#fff', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{c.unread}</div>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function RMPassengerChat() {
  const t = useT();
  const { goto, route, conversations, appendChatMessage, markConversationRead } = useStore();
  const convId = route.params?.convId || 'c1';
  const conv = conversations[convId] || { who: 'RideMe', color: '#2563EB', messages: [] };
  const [input, setInput] = React.useState('');
  React.useEffect(() => { markConversationRead(convId); }, [convId]);

  const send = () => {
    if (!input.trim()) return;
    appendChatMessage(convId, { from: 'me', text: input.trim() });
    setInput('');
    // simula respuesta automática del soporte/conductor
    setTimeout(() => {
      appendChatMessage(convId, { from: 'them', text: convId === 'c2' ? '¡Gracias! Te leemos.' : 'Perfecto, te aviso al llegar.' });
    }, 1100 + Math.random() * 800);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#F6F9FD' }}>
      <RMTopBar onBack={() => goto('passengerMessages')} title={conv.who}
        right={<button onClick={() => alert(t.callConfirm)} style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--rm-green)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><RMIcon.phone/></button>}/>
      <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 8, overflow: 'auto' }} className="rm-scroll">
        {conv.messages.map(m => (
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
  const t = useT();
  const { goto, profile, paymentMethods, setRole, setAuthed } = useStore();
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--rm-bg)' }}>
      <div style={{ background: 'linear-gradient(160deg, var(--rm-navy) 0%, var(--rm-blue) 100%)', color: '#fff', padding: '20px 20px 30px', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <div style={{ fontWeight: 800, fontSize: 18 }}>{t.profile}</div>
          <RMLocaleToggle/>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <RMAvatar name={profile.name} color={profile.photoColor} size={64}/>
          <div>
            <div style={{ fontWeight: 800, fontSize: 18 }}>{profile.name}</div>
            <div style={{ fontSize: 13, opacity: 0.85 }}>{profile.email}</div>
            <div style={{ marginTop: 6, display: 'flex', gap: 8 }}>
              <RMBadge tone="cyan"><RMIcon.star style={{ width: 12, height: 12 }}/> {profile.rating}</RMBadge>
              <RMBadge tone="blue">{profile.trips} viajes</RMBadge>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: -16, padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <RMCard padding={0} style={{ overflow: 'hidden' }}>
          <RMListRow icon={<RMIcon.user/>} label={t.personalInfo} onClick={() => goto('passengerEditProfile')}/>
          <RMListRow icon={<RMIcon.card/>} label={t.paymentMethods} right={<RMBadge tone="neutral">{paymentMethods.length}</RMBadge>} onClick={() => goto('passengerPaymentMethods')}/>
          <RMListRow icon={<RMIcon.shield/>} label={t.security} onClick={() => goto('passengerSecurity')}/>
          <RMListRow icon={<RMIcon.bell/>} label={t.notifications} onClick={() => goto('passengerNotifications')}/>
        </RMCard>
        <RMCard padding={0} style={{ overflow: 'hidden' }}>
          <RMListRow icon={<RMIcon.car/>} label={t.becomeDriver} onClick={() => { setRole('driver'); goto('driverDashboard'); }}/>
          <RMListRow icon={<RMIcon.cog/>} label={t.adminDashboard} onClick={() => { setRole('admin'); goto('adminDashboard'); }}/>
          <RMListRow icon={<RMIcon.doc/>} label={t.help} onClick={() => goto('passengerHelp')}/>
        </RMCard>
        <RMCard padding={0} style={{ overflow: 'hidden' }}>
          <RMListRow icon={<RMIcon.x/>} label={t.logout} danger onClick={() => { setAuthed(false); goto('welcome'); }}/>
        </RMCard>
      </div>
    </div>
  );
}

// ─── Subpáginas de perfil ────────────────────────────────────────────────
function RMPassengerEditProfile() {
  const t = useT();
  const { goto, profile, setProfile } = useStore();
  const [name, setName]   = React.useState(profile.name);
  const [email, setEmail] = React.useState(profile.email);
  const [phone, setPhone] = React.useState(profile.phone);
  const [errors, setErrors] = React.useState({});
  const [toast, setToast] = React.useState(null);

  const save = () => {
    const e = {};
    if (!name.trim()) e.name = t.errRequired;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = t.errEmail;
    if (!/^\+52\s?\d{2}\s?\d{4}\s?\d{4}$/.test(phone)) e.phone = t.errPhone;
    setErrors(e);
    if (Object.keys(e).length) return;
    setProfile({ name: name.trim(), email: email.trim(), phone: phone.trim() });
    setToast(t.profileUpdated);
    setTimeout(() => goto('passengerProfile'), 700);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff', position: 'relative' }}>
      <RMTopBar onBack={() => goto('passengerProfile')} title={t.editProfile}/>
      <div style={{ flex: 1, padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <RMInput label={t.fullName} value={name} onChange={setName} error={errors.name}/>
        <RMInput label={t.email} value={email} onChange={setEmail} error={errors.email}/>
        <RMInput label={t.phone} value={phone} onChange={setPhone} placeholder="+52 55 0000 0000" error={errors.phone}/>
        <div style={{ height: 8 }}/>
        <RMButton variant="primary" full onClick={save}>{t.save}</RMButton>
      </div>
      <RMToast open={!!toast} onClose={() => setToast(null)} kind="success">{toast}</RMToast>
    </div>
  );
}

function RMPassengerPaymentMethods() {
  const t = useT();
  const { goto, profile, paymentMethods, addPaymentMethod, removePaymentMethod, setDefaultPayment } = useStore();
  const [adding, setAdding] = React.useState(false);
  const [confirmRemove, setConfirmRemove] = React.useState(null);
  const [toast, setToast] = React.useState(null);

  // Form de tarjeta
  const [num, setNum] = React.useState('');
  const [exp, setExp] = React.useState('');
  const [cvv, setCvv] = React.useState('');
  const [holder, setHolder] = React.useState('');
  const [errors, setErrors] = React.useState({});

  const submitCard = () => {
    const digits = num.replace(/\s/g, '');
    const e = {};
    if (!/^\d{16}$/.test(digits))    e.num = t.errCardNumber;
    if (!/^\d{2}\/\d{2}$/.test(exp)) e.exp = t.errCardExp;
    if (!/^\d{3}$/.test(cvv))        e.cvv = t.errCardCvv;
    if (!holder.trim())              e.holder = t.errRequired;
    setErrors(e);
    if (Object.keys(e).length) return;
    const brand = digits.startsWith('4') ? 'Visa' : digits.startsWith('5') ? 'Mastercard' : digits.startsWith('3') ? 'Amex' : 'Tarjeta';
    addPaymentMethod({ kind: 'card', label: brand, last4: digits.slice(-4), holder: holder.trim(), exp });
    setNum(''); setExp(''); setCvv(''); setHolder('');
    setAdding(false);
    setToast(t.cardAdded);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--rm-bg)', position: 'relative' }}>
      <RMTopBar onBack={() => goto('passengerProfile')} title={t.paymentMethods}
        right={<RMButton variant="ghost" size="sm" icon={<RMIcon.plus/>} onClick={() => setAdding(true)}>{t.addCard}</RMButton>}/>
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }} className="rm-scroll">
        {paymentMethods.length === 0 && <RMEmpty icon={<RMIcon.card/>} title={t.noPaymentMethods}/>}
        {paymentMethods.map(p => (
          <RMCard key={p.id} padding={14}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--rm-bg)', color: 'var(--rm-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {p.kind === 'cash' ? <RMIcon.cash/> : <RMIcon.card/>}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{p.kind === 'cash' ? t.cash : `${p.label} •• ${p.last4}`}</div>
                {p.holder && <div style={{ fontSize: 12, color: 'var(--rm-text-3)' }}>{p.holder} · {p.exp}</div>}
              </div>
              {p.isDefault ? <RMBadge tone="green">{t.defaultLabel}</RMBadge>
                : <RMButton variant="secondary" size="sm" onClick={() => { setDefaultPayment(p.id); setToast(t.changes_saved); }}>{t.setDefault}</RMButton>}
              {p.kind !== 'cash' && (
                <button onClick={() => setConfirmRemove(p.id)} style={{ marginLeft: 8, color: 'var(--rm-red)', padding: 8 }}><RMIcon.x/></button>
              )}
            </div>
          </RMCard>
        ))}
      </div>

      <RMModal open={adding} onClose={() => setAdding(false)} title={t.addCard}>
        <RMInput label={t.cardNumber} value={num} onChange={(v) => setNum(v.replace(/[^\d]/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 '))}
          placeholder="4242 4242 4242 4242" error={errors.num}/>
        <div style={{ height: 8 }}/>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ flex: 1 }}>
            <RMInput label={t.cardExp} value={exp}
              onChange={(v) => {
                const cleaned = v.replace(/[^\d]/g, '').slice(0, 4);
                setExp(cleaned.length > 2 ? cleaned.slice(0, 2) + '/' + cleaned.slice(2) : cleaned);
              }}
              placeholder="MM/AA" error={errors.exp}/>
          </div>
          <div style={{ flex: 1 }}>
            <RMInput label={t.cardCvv} value={cvv} onChange={(v) => setCvv(v.replace(/[^\d]/g, '').slice(0, 3))} placeholder="123" error={errors.cvv}/>
          </div>
        </div>
        <div style={{ height: 8 }}/>
        <RMInput label={t.cardHolder} value={holder} onChange={setHolder} placeholder={profile.name || 'Titular'} error={errors.holder}/>
        <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <RMButton variant="primary" full onClick={submitCard}>{t.save}</RMButton>
          <RMButton variant="secondary" full onClick={() => setAdding(false)}>{t.cancel}</RMButton>
        </div>
      </RMModal>
      <RMConfirm open={!!confirmRemove} onClose={() => setConfirmRemove(null)}
        title={t.removeCardConfirm} message={t.actionUndoable}
        confirmLabel={t.delete} cancelLabel={t.back} danger
        onConfirm={() => { removePaymentMethod(confirmRemove); setToast(t.cardRemoved); }}/>
      <RMToast open={!!toast} onClose={() => setToast(null)} kind="success">{toast}</RMToast>
    </div>
  );
}

function RMPassengerSecurity() {
  const t = useT();
  const { goto, profile, setProfile } = useStore();
  const [cur, setCur] = React.useState('');
  const [pw,  setPw]  = React.useState('');
  const [pw2, setPw2] = React.useState('');
  const [errors, setErrors] = React.useState({});
  const [toast, setToast] = React.useState(null);

  const change = () => {
    const e = {};
    if (!cur)             e.cur = t.errRequired;
    if ((pw || '').length < 8) e.pw  = t.errPwShort;
    if (pw !== pw2)       e.pw2 = t.errPwMatch;
    setErrors(e);
    if (Object.keys(e).length) return;
    setCur(''); setPw(''); setPw2('');
    setToast(t.passwordChanged);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff', position: 'relative' }}>
      <RMTopBar onBack={() => goto('passengerProfile')} title={t.security}/>
      <div style={{ flex: 1, padding: 20, display: 'flex', flexDirection: 'column', gap: 14, overflow: 'auto' }} className="rm-scroll">
        <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--rm-text-2)' }}>{t.changePassword}</div>
        <RMInput label={t.currentPassword} type="password" value={cur} onChange={setCur} error={errors.cur}/>
        <RMInput label={t.newPassword} type="password" value={pw} onChange={setPw} error={errors.pw} hint="Mínimo 8 caracteres"/>
        <RMInput label={t.confirmPassword} type="password" value={pw2} onChange={setPw2} error={errors.pw2}/>
        <RMButton variant="primary" full onClick={change}>{t.save}</RMButton>
        <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--rm-border)' }}>
          <RMSwitch checked={!!profile.twoFactor} onChange={(v) => { setProfile({ twoFactor: v }); setToast(t.notifSaved); }}
            label={t.twoFactor} sub={t.twoFactorSub}/>
        </div>
      </div>
      <RMToast open={!!toast} onClose={() => setToast(null)} kind="success">{toast}</RMToast>
    </div>
  );
}

function RMPassengerNotifications() {
  const t = useT();
  const { goto, profile, setProfile } = useStore();
  const [toast, setToast] = React.useState(null);
  const flag = (k, v) => { setProfile({ [k]: v }); setToast(t.notifSaved); };
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff', position: 'relative' }}>
      <RMTopBar onBack={() => goto('passengerProfile')} title={t.notifications}/>
      <div style={{ flex: 1, padding: '0 20px', overflow: 'auto' }} className="rm-scroll">
        <RMSwitch checked={!!profile.notifyPush}   onChange={(v) => flag('notifyPush', v)}   label={t.pushNotif}/>
        <RMSwitch checked={!!profile.notifyEmail}  onChange={(v) => flag('notifyEmail', v)}  label={t.emailNotif}/>
        <RMSwitch checked={!!profile.notifyTrips}  onChange={(v) => flag('notifyTrips', v)}  label={t.tripsNotif}/>
        <RMSwitch checked={!!profile.notifyPromos} onChange={(v) => flag('notifyPromos', v)} label={t.promosNotif}/>
      </div>
      <RMToast open={!!toast} onClose={() => setToast(null)} kind="success">{toast}</RMToast>
    </div>
  );
}

function RMPassengerHelp() {
  const t = useT();
  const { goto, appendChatMessage } = useStore();
  const faqs = [
    { q: '¿Cómo se calcula la tarifa?', a: 'RideMe sugiere un precio base por distancia y tiempo. Tú lo puedes negociar con el conductor antes de aceptar.' },
    { q: '¿Cómo cambio mi método de pago?', a: 'Ve a Perfil → Métodos de pago. Puedes agregar tarjeta y elegir cuál es tu predeterminada.' },
    { q: '¿Qué pasa si cancelo un viaje?', a: 'Si el conductor ya está en camino, podría aplicar una pequeña tarifa de cancelación.' },
    { q: '¿Cómo reporto un problema?', a: 'Después de finalizar el viaje puedes calificar y abrir un reporte directamente desde la pantalla de calificación.' },
    { q: '¿Puedo programar viajes?', a: 'Sí. Desde la pestaña Programados puedes crear un viaje con fecha, hora, origen, destino y notas.' },
  ];
  const [open, setOpen] = React.useState(null);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--rm-bg)' }}>
      <RMTopBar onBack={() => goto('passengerProfile')} title={t.helpCenter}/>
      <div style={{ flex: 1, padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }} className="rm-scroll">
        <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--rm-text-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t.faqTitle}</div>
        {faqs.map((f, i) => (
          <RMCard key={i} padding={0}>
            <button onClick={() => setOpen(open === i ? null : i)} style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: 14, textAlign: 'left', fontWeight: 600, fontSize: 14,
            }}>
              <span style={{ flex: 1 }}>{f.q}</span>
              <span style={{ color: 'var(--rm-text-3)', transform: open === i ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}><RMIcon.arrowR/></span>
            </button>
            {open === i && <div style={{ padding: '0 14px 14px', fontSize: 13, color: 'var(--rm-text-2)', lineHeight: 1.5 }}>{f.a}</div>}
          </RMCard>
        ))}
        <div style={{ marginTop: 16 }}>
          <RMButton variant="primary" full icon={<RMIcon.chat/>}
            onClick={() => { appendChatMessage('c2', { from: 'me', text: 'Hola, necesito ayuda' }); goto('passengerChat', { convId: 'c2' }); }}>
            {t.contactSupport}
          </RMButton>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  RMPassengerScheduled, RMPassengerHistory, RMPassengerMessages, RMPassengerChat, RMPassengerProfile,
  RMPassengerEditProfile, RMPassengerPaymentMethods, RMPassengerSecurity, RMPassengerNotifications, RMPassengerHelp,
  RMScheduleForm,
});
