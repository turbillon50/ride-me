// RideMe — Admin (desktop)

function rmTimeAgo(ts) {
  const d = Math.max(0, Date.now() - ts);
  const m = Math.floor(d / 60000);
  if (m < 1) return 'ahora';
  if (m < 60) return `hace ${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `hace ${h} h`;
  return `hace ${Math.floor(h / 24)} d`;
}
function rmCsvDownload(filename, header, rows) {
  const csv = [header.join(','), ...rows.map(r => r.map(x => `"${String(x ?? '').replace(/"/g, '""')}"`).join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
}

function RMAdminLayout({ children }) {
  const t = useT();
  const { adminSection, setAdminSection, goto, setRole, adminAlerts } = useStore();
  const items = [
    { id: 'dashboard', label: t.adminDashboard, icon: <RMIcon.trend/> },
    { id: 'users',     label: t.adminUsers,     icon: <RMIcon.user/> },
    { id: 'drivers',   label: t.adminDrivers,   icon: <RMIcon.car/> },
    { id: 'trips',     label: t.adminTrips,     icon: <RMIcon.trip/> },
    { id: 'payments',  label: t.adminPayments,  icon: <RMIcon.cash/> },
    { id: 'reports',   label: t.adminReports,   icon: <RMIcon.doc/> },
    { id: 'alerts',    label: t.adminAlerts,    icon: <RMIcon.alert/>, badge: adminAlerts.length },
    { id: 'settings',  label: t.adminSettings,  icon: <RMIcon.cog/> },
  ];
  const [search, setSearch] = React.useState('');
  return (
    <div style={{ display: 'flex', height: '100%', background: 'var(--rm-bg)', color: 'var(--rm-text)' }}>
      <aside style={{ width: 240, background: 'var(--rm-navy)', color: '#fff', padding: '20px 14px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 6px 14px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <RMLogoMark size={32}/>
          <div style={{ fontWeight: 800, fontSize: 18, letterSpacing: '-0.02em' }}>Ride<span style={{ color: 'var(--rm-cyan)' }}>Me</span></div>
        </div>
        <div style={{ fontSize: 11, opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 8px' }}>Admin</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {items.map(it => {
            const on = adminSection === it.id;
            return (
              <button key={it.id} onClick={() => setAdminSection(it.id)} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
                borderRadius: 'var(--rm-r-md)', textAlign: 'left',
                background: on ? 'rgba(0,180,255,0.18)' : 'transparent',
                color: on ? 'var(--rm-cyan)' : 'rgba(255,255,255,0.85)', fontSize: 14, fontWeight: 600,
              }}>
                {it.icon}<span style={{ flex: 1 }}>{it.label}</span>
                {it.badge ? <span style={{ background: 'var(--rm-red)', color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 8 }}>{it.badge}</span> : null}
              </button>
            );
          })}
        </div>
        <div style={{ marginTop: 'auto', padding: 10, background: 'rgba(255,255,255,0.06)', borderRadius: 'var(--rm-r-md)' }}>
          <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 6 }}>Admin · {t.switchRole}</div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button onClick={() => { setRole('passenger'); goto('passengerHome'); }} style={{ flex: 1, padding: 8, borderRadius: 8, fontSize: 11, background: 'rgba(255,255,255,0.1)', color: '#fff' }}>{t.rolePassenger}</button>
            <button onClick={() => { setRole('driver'); goto('driverDashboard'); }} style={{ flex: 1, padding: 8, borderRadius: 8, fontSize: 11, background: 'rgba(255,255,255,0.1)', color: '#fff' }}>{t.roleDriver}</button>
          </div>
        </div>
      </aside>
      <main style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        <header style={{ height: 56, background: '#fff', borderBottom: '1px solid var(--rm-border)', display: 'flex', alignItems: 'center', padding: '0 20px', gap: 14 }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, padding: '0 12px', height: 36, background: 'var(--rm-bg)', borderRadius: 'var(--rm-r-md)', maxWidth: 360, color: 'var(--rm-text-3)' }}>
            <RMIcon.search/>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t.searchPlaceholder}
              style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 13, color: 'var(--rm-text)' }}/>
          </div>
          <div style={{ flex: 1 }}/>
          <RMLocaleToggle/>
          <button onClick={() => setAdminSection('alerts')} style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--rm-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <RMIcon.bell/>{adminAlerts.length > 0 && <span style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, borderRadius: '50%', background: 'var(--rm-red)' }}/>}
          </button>
          <RMAvatar name="Admin Pro" color="var(--rm-cyan)" size={36}/>
        </header>
        <div style={{ flex: 1, padding: 24, overflow: 'auto', position: 'relative' }} className="rm-scroll">
          {React.cloneElement(children, { search })}
        </div>
      </main>
    </div>
  );
}

function RMAdminDashboard({ search='' }) {
  const t = useT();
  const { adminTrips, adminAlerts, driverEarnings, history, setAdminSection } = useStore();
  const s = RM_MOCK.adminStats;
  const Stat = ({ label, value, delta, tone='blue', icon }) => (
    <RMCard padding={18}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--rm-text-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
          <div style={{ fontWeight: 800, fontSize: 30, letterSpacing: '-0.03em', marginTop: 4 }}>{value}</div>
          {delta && <div style={{ fontSize: 12, color: 'var(--rm-green)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}><RMIcon.trend style={{ width: 14, height: 14 }}/> {delta}</div>}
        </div>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: tone === 'cyan' ? '#DEF4FF' : '#E2ECFD', color: tone === 'cyan' ? '#006A99' : 'var(--rm-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
      </div>
    </RMCard>
  );
  const max = Math.max(...s.chart);
  const statusTones = { in_progress: 'blue', completed: 'green', cancelled: 'red' };
  const statusLabel = { in_progress: 'En curso', completed: 'Completado', cancelled: 'Cancelado' };
  const recentTrips = adminTrips.slice(0, 5);
  const tripsTodayLive = history.filter(h => Date.now() - (h.ts || 0) < 86400e3).length + driverEarnings.trips;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <div style={{ fontWeight: 800, fontSize: 24, letterSpacing: '-0.02em' }}>{t.adminDashboard}</div>
        <div style={{ color: 'var(--rm-text-2)', fontSize: 13 }}>Resumen operativo · hoy</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        <Stat label={t.totalUsers} value={s.users.toLocaleString()} delta="+4.2% / 7d" icon={<RMIcon.user/>}/>
        <Stat label={t.activeDrivers} value={s.drivers.toLocaleString()} delta="+1.8% / 7d" icon={<RMIcon.car/>} tone="cyan"/>
        <Stat label={t.tripsToday} value={s.tripsToday + tripsTodayLive} delta={`+${tripsTodayLive} live`} icon={<RMIcon.trip/>}/>
        <Stat label={t.revenue} value={'$' + s.revenue.toLocaleString()} delta="+8.3% / 7d" icon={<RMIcon.cash/>} tone="cyan"/>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
        <RMCard padding={20}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
            <div style={{ fontWeight: 700, fontSize: 16 }}>Viajes por hora</div>
            <RMBadge tone="blue">Hoy</RMBadge>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 180 }}>
            {s.chart.map((v, i) => (
              <div key={i} style={{
                flex: 1, height: `${(v/max)*100}%`, borderRadius: 6,
                background: 'linear-gradient(180deg, var(--rm-cyan) 0%, var(--rm-blue) 100%)',
              }}/>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--rm-text-3)', marginTop: 8 }}>
            <span>06:00</span><span>12:00</span><span>18:00</span><span>00:00</span>
          </div>
        </RMCard>
        <RMCard padding={20}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ fontWeight: 700, fontSize: 16 }}>{t.alertsTitle}</div>
            <button onClick={() => setAdminSection('alerts')} style={{ fontSize: 12, color: 'var(--rm-blue)', fontWeight: 700 }}>{t.seeAll}</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {adminAlerts.slice(0, 4).map((a) => (
              <div key={a.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--rm-border)' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--rm-blue)', marginTop: 6 }}/>
                <div style={{ flex: 1, fontSize: 13 }}>
                  <div>{a.message}</div>
                  <div style={{ fontSize: 11, color: 'var(--rm-text-3)' }}>{rmTimeAgo(a.ts)}</div>
                </div>
              </div>
            ))}
            {adminAlerts.length === 0 && <div style={{ color: 'var(--rm-text-3)', fontSize: 13 }}>{t.alertsEmpty}</div>}
          </div>
        </RMCard>
      </div>
      <RMCard padding={20}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontWeight: 700, fontSize: 16 }}>Viajes recientes</div>
          <RMButton variant="ghost" size="sm" onClick={() => setAdminSection('trips')}>{t.seeAll}</RMButton>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ color: 'var(--rm-text-3)', textTransform: 'uppercase', fontSize: 11, letterSpacing: '0.06em' }}>
              <th style={{ textAlign: 'left', padding: '10px 8px', borderBottom: '1px solid var(--rm-border)' }}>ID</th>
              <th style={{ textAlign: 'left', padding: '10px 8px', borderBottom: '1px solid var(--rm-border)' }}>Pasajero</th>
              <th style={{ textAlign: 'left', padding: '10px 8px', borderBottom: '1px solid var(--rm-border)' }}>Conductor</th>
              <th style={{ textAlign: 'left', padding: '10px 8px', borderBottom: '1px solid var(--rm-border)' }}>Origen → Destino</th>
              <th style={{ textAlign: 'right', padding: '10px 8px', borderBottom: '1px solid var(--rm-border)' }}>Tarifa</th>
              <th style={{ textAlign: 'left', padding: '10px 8px', borderBottom: '1px solid var(--rm-border)' }}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {recentTrips.map(tr => (
              <tr key={tr.id}>
                <td style={{ padding: '12px 8px', borderBottom: '1px solid var(--rm-border)', fontFamily: 'monospace', color: 'var(--rm-text-2)' }}>#{tr.id}</td>
                <td style={{ padding: '12px 8px', borderBottom: '1px solid var(--rm-border)' }}>{tr.user}</td>
                <td style={{ padding: '12px 8px', borderBottom: '1px solid var(--rm-border)' }}>{tr.driver}</td>
                <td style={{ padding: '12px 8px', borderBottom: '1px solid var(--rm-border)', color: 'var(--rm-text-2)' }}>{tr.from} → {tr.to}</td>
                <td style={{ padding: '12px 8px', borderBottom: '1px solid var(--rm-border)', textAlign: 'right', fontWeight: 700 }}>${tr.fare}</td>
                <td style={{ padding: '12px 8px', borderBottom: '1px solid var(--rm-border)' }}><RMBadge tone={statusTones[tr.status]}>{statusLabel[tr.status]}</RMBadge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </RMCard>
    </div>
  );
}

// Tabla con filtros y export CSV
function RMAdminTable({ title, columns, rows, search='', statusOptions, onFilter, filterValue, setFilterValue, onNew, onExport, footer }) {
  const t = useT();
  const filtered = rows.filter(r => {
    const matchSearch = !search || r.some(c => String(c).toLowerCase().includes(search.toLowerCase()));
    const matchStatus = !onFilter || onFilter(r);
    return matchSearch && matchStatus;
  });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: 24, letterSpacing: '-0.02em' }}>{title}</div>
          <div style={{ fontSize: 12, color: 'var(--rm-text-3)' }}>{filtered.length} {t.rowsCount}</div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {statusOptions && (
            <select value={filterValue} onChange={(e) => setFilterValue(e.target.value)} style={{
              height: 36, padding: '0 28px 0 12px', fontSize: 13, borderRadius: 'var(--rm-r-md)',
              border: '1.5px solid var(--rm-border)', background: '#fff', appearance: 'none',
              backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 24 24%22 fill=%22none%22><path d=%22M6 9l6 6 6-6%22 stroke=%22%238693AB%22 stroke-width=%222%22/></svg>")',
              backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center',
            }}>
              {statusOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          )}
          {onExport && <RMButton variant="secondary" size="sm" icon={<RMIcon.upload style={{ transform: 'rotate(180deg)' }}/>} onClick={onExport}>{t.export}</RMButton>}
          {onNew && <RMButton variant="primary" size="sm" icon={<RMIcon.plus/>} onClick={onNew}>{t.newRecord}</RMButton>}
        </div>
      </div>
      <RMCard padding={0}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ color: 'var(--rm-text-3)', textTransform: 'uppercase', fontSize: 11, letterSpacing: '0.06em', background: 'var(--rm-surface-alt)' }}>
              {columns.map(c => <th key={c} style={{ textAlign: 'left', padding: '12px 16px', borderBottom: '1px solid var(--rm-border)' }}>{c}</th>)}
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--rm-border)' }}>
                {r.map((cell, j) => <td key={j} style={{ padding: '14px 16px' }}>{cell}</td>)}
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={columns.length} style={{ padding: 30, textAlign: 'center', color: 'var(--rm-text-3)' }}>{t.empty}</td></tr>
            )}
          </tbody>
        </table>
      </RMCard>
      {footer}
    </div>
  );
}

// ─── Tablas: Users / Drivers / Trips / Payments ──────────────────────────
const RM_ADMIN_USERS_SEED = [
  { id: '#U1041', name: 'Lucía Fernández', email: 'lucia@example.com', trips: 142, rating: 4.9, status: 'active' },
  { id: '#U1040', name: 'Diego Rivas',     email: 'diego@example.com', trips: 38,  rating: 4.7, status: 'active' },
  { id: '#U1039', name: 'Pablo Guzmán',    email: 'pablo@example.com', trips: 12,  rating: 4.6, status: 'inactive' },
  { id: '#U1038', name: 'Sofía Acuña',     email: 'sofia@example.com', trips: 209, rating: 5.0, status: 'vip' },
  { id: '#U1037', name: 'Mario Trejo',     email: 'mario@example.com', trips: 4,   rating: 0,   status: 'blocked' },
];
const RM_USER_STATUS = { active: { tone: 'green', label: 'Activo' }, inactive: { tone: 'amber', label: 'Inactivo' }, vip: { tone: 'green', label: 'VIP' }, blocked: { tone: 'red', label: 'Bloqueado' } };

function RMAdminUsers({ search='' }) {
  const t = useT();
  const [users, setUsers] = React.useState(RM_ADMIN_USERS_SEED);
  const [filter, setFilter] = React.useState('all');
  const [adding, setAdding] = React.useState(false);
  const { pushAlert } = useStore();
  const [form, setForm] = React.useState({ name: '', email: '' });
  const rows = users.filter(u => filter === 'all' || u.status === filter).map(u => [
    u.id,
    <span style={{ display:'flex', gap:10, alignItems:'center' }}><RMAvatar name={u.name} color="#5BD0FF" size={28}/> {u.name}</span>,
    u.email, u.trips, u.rating || '—',
    <RMBadge tone={RM_USER_STATUS[u.status].tone}>{RM_USER_STATUS[u.status].label}</RMBadge>,
  ]);
  const exportCsv = () => rmCsvDownload('rideme-usuarios.csv', ['id','nombre','correo','viajes','rating','estado'],
    users.map(u => [u.id, u.name, u.email, u.trips, u.rating, RM_USER_STATUS[u.status].label]));
  return (
    <>
      <RMAdminTable title={t.adminUsers} columns={['ID','Nombre','Correo','Viajes','Rating','Estado']}
        rows={rows} search={search}
        statusOptions={[
          { value: 'all', label: 'Todos los estados' },
          { value: 'active', label: 'Activos' },
          { value: 'inactive', label: 'Inactivos' },
          { value: 'vip', label: 'VIP' },
          { value: 'blocked', label: 'Bloqueados' },
        ]} filterValue={filter} setFilterValue={setFilter}
        onNew={() => setAdding(true)} onExport={exportCsv}/>
      <RMModal open={adding} onClose={() => setAdding(false)} title={t.modalNewUserTitle}>
        <RMInput label={t.fullName} value={form.name} onChange={(v) => setForm(f => ({ ...f, name: v }))}/>
        <div style={{ height: 8 }}/>
        <RMInput label={t.email} value={form.email} onChange={(v) => setForm(f => ({ ...f, email: v }))}/>
        <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <RMButton variant="primary" full disabled={!form.name || !form.email} onClick={() => {
            const id = '#U' + (1041 + users.length);
            setUsers(arr => [{ id, name: form.name, email: form.email, trips: 0, rating: 0, status: 'active' }, ...arr]);
            pushAlert({ kind: 'create', message: `Usuario creado: ${form.name}` });
            setForm({ name: '', email: '' }); setAdding(false);
          }}>{t.save}</RMButton>
          <RMButton variant="secondary" full onClick={() => setAdding(false)}>{t.cancel}</RMButton>
        </div>
      </RMModal>
    </>
  );
}

const RM_ADMIN_DRIVERS_SEED = [
  { id: '#D210', name: 'Carlos Méndez',  vehicle: 'Nissan Versa · ABC-123', trips: 1240, rating: 4.92, status: 'approved' },
  { id: '#D209', name: 'María Luna',     vehicle: 'Toyota Yaris · XYZ-987', trips: 2100, rating: 4.95, status: 'approved' },
  { id: '#D208', name: 'Roberto Suárez', vehicle: 'Chevy Aveo · LMN-009',   trips: 0,    rating: 0,    status: 'review' },
  { id: '#D207', name: 'Marina Cano',    vehicle: 'VW Vento · QRS-543',     trips: 0,    rating: 0,    status: 'review' },
  { id: '#D206', name: 'Iván Pérez',     vehicle: 'Kia Rio · TUV-110',      trips: 88,   rating: 4.4,  status: 'suspended' },
];
const RM_DRIVER_STATUS = { approved: { tone: 'green', label: 'Aprobado' }, review: { tone: 'amber', label: 'En revisión' }, suspended: { tone: 'red', label: 'Suspendido' } };

function RMAdminDrivers({ search='' }) {
  const t = useT();
  const [drivers, setDrivers] = React.useState(RM_ADMIN_DRIVERS_SEED);
  const [filter, setFilter] = React.useState('all');
  const [adding, setAdding] = React.useState(false);
  const [form, setForm] = React.useState({ name: '', vehicle: '' });
  const { pushAlert } = useStore();
  const rows = drivers.filter(d => filter === 'all' || d.status === filter).map(d => [
    d.id,
    <span style={{ display:'flex', gap:10, alignItems:'center' }}><RMAvatar name={d.name} color="#5BD0FF" size={28}/> {d.name}</span>,
    d.vehicle, d.trips, d.rating || '—',
    <RMBadge tone={RM_DRIVER_STATUS[d.status].tone}>{RM_DRIVER_STATUS[d.status].label}</RMBadge>,
  ]);
  const exportCsv = () => rmCsvDownload('rideme-conductores.csv', ['id','nombre','vehiculo','viajes','rating','estado'],
    drivers.map(d => [d.id, d.name, d.vehicle, d.trips, d.rating, RM_DRIVER_STATUS[d.status].label]));
  return (
    <>
      <RMAdminTable title={t.adminDrivers} columns={['ID','Nombre','Vehículo','Viajes','Rating','Estado']}
        rows={rows} search={search}
        statusOptions={[
          { value: 'all', label: 'Todos los estados' },
          { value: 'approved', label: 'Aprobados' },
          { value: 'review',   label: 'En revisión' },
          { value: 'suspended', label: 'Suspendidos' },
        ]} filterValue={filter} setFilterValue={setFilter}
        onNew={() => setAdding(true)} onExport={exportCsv}/>
      <RMModal open={adding} onClose={() => setAdding(false)} title={t.modalNewDriverTitle}>
        <RMInput label={t.fullName} value={form.name} onChange={(v) => setForm(f => ({ ...f, name: v }))}/>
        <div style={{ height: 8 }}/>
        <RMInput label={t.vehicle} value={form.vehicle} onChange={(v) => setForm(f => ({ ...f, vehicle: v }))} placeholder="Ej. Nissan Versa · ABC-123"/>
        <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <RMButton variant="primary" full disabled={!form.name || !form.vehicle} onClick={() => {
            const id = '#D' + (211 + drivers.length);
            setDrivers(arr => [{ id, name: form.name, vehicle: form.vehicle, trips: 0, rating: 0, status: 'review' }, ...arr]);
            pushAlert({ kind: 'create', message: `Conductor creado: ${form.name}` });
            setForm({ name: '', vehicle: '' }); setAdding(false);
          }}>{t.save}</RMButton>
          <RMButton variant="secondary" full onClick={() => setAdding(false)}>{t.cancel}</RMButton>
        </div>
      </RMModal>
    </>
  );
}

function RMAdminTrips({ search='' }) {
  const t = useT();
  const { adminTrips, updateAdminTrip, pushAlert } = useStore();
  const [filter, setFilter] = React.useState('all');
  const [detail, setDetail] = React.useState(null);
  const tones = { in_progress: 'blue', completed: 'green', cancelled: 'red' };
  const labels = { in_progress: 'En curso', completed: 'Completado', cancelled: 'Cancelado' };
  const onFilter = filter === 'all' ? null : (r) => r._status === filter;
  const rows = adminTrips
    .filter(tr => filter === 'all' || tr.status === filter)
    .map(tr => {
      const arr = ['#' + tr.id, tr.user, tr.driver, tr.from + ' → ' + tr.to, '$' + tr.fare,
        <RMBadge tone={tones[tr.status]}>{labels[tr.status]}</RMBadge>,
        <button onClick={() => setDetail(tr)} style={{ color: 'var(--rm-blue)', fontWeight: 700, fontSize: 12 }}>{t.viewDetails}</button>,
      ];
      arr._status = tr.status;
      return arr;
    });
  const exportCsv = () => rmCsvDownload('rideme-viajes.csv', ['id','pasajero','conductor','origen','destino','tarifa','estado'],
    adminTrips.map(tr => [tr.id, tr.user, tr.driver, tr.from, tr.to, tr.fare, labels[tr.status]]));
  return (
    <>
      <RMAdminTable title={t.adminTrips} columns={['ID','Pasajero','Conductor','Ruta','Tarifa','Estado','']}
        rows={rows} search={search} onFilter={onFilter}
        statusOptions={[
          { value: 'all', label: 'Todos los estados' },
          { value: 'in_progress', label: 'En curso' },
          { value: 'completed',   label: 'Completados' },
          { value: 'cancelled',   label: 'Cancelados' },
        ]} filterValue={filter} setFilterValue={setFilter}
        onExport={exportCsv}/>
      <RMModal open={!!detail} onClose={() => setDetail(null)} title={`Viaje #${detail?.id || ''}`} maxWidth={520}>
        {detail && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <RMRouteRow from={detail.from} to={detail.to}/>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}><span style={{ color: 'var(--rm-text-3)' }}>Pasajero</span><b>{detail.user}</b></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}><span style={{ color: 'var(--rm-text-3)' }}>Conductor</span><b>{detail.driver}</b></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}><span style={{ color: 'var(--rm-text-3)' }}>Tarifa</span><b>${detail.fare}</b></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
              <span style={{ color: 'var(--rm-text-3)' }}>{t.filterStatus}</span>
              <select value={detail.status} onChange={(e) => {
                updateAdminTrip(detail.id, { status: e.target.value });
                pushAlert({ kind: 'admin', message: `Viaje #${detail.id} → ${e.target.value}` });
                setDetail({ ...detail, status: e.target.value });
              }} style={{ height: 32, padding: '0 8px', borderRadius: 8, border: '1px solid var(--rm-border)' }}>
                <option value="in_progress">En curso</option>
                <option value="completed">Completado</option>
                <option value="cancelled">Cancelado</option>
              </select>
            </div>
          </div>
        )}
      </RMModal>
    </>
  );
}

function RMAdminPayments({ search='' }) {
  const t = useT();
  const [filter, setFilter] = React.useState('all');
  const all = [
    { id: '#P5021', date: '28 abr 14:32', user: 'Lucía F.', method: 'Tarjeta •• 4242', amount: 142, status: 'paid' },
    { id: '#P5020', date: '28 abr 14:18', user: 'Diego R.', method: 'Efectivo',         amount: 95,  status: 'paid' },
    { id: '#P5019', date: '28 abr 14:05', user: 'Pablo G.', method: 'Tarjeta •• 1188',  amount: 215, status: 'pending' },
    { id: '#P5018', date: '28 abr 13:50', user: 'Sofía A.', method: 'Tarjeta •• 9020',  amount: 92,  status: 'refund' },
  ];
  const tones = { paid: 'green', pending: 'amber', refund: 'red' };
  const labels = { paid: 'Pagado', pending: 'Pendiente', refund: 'Reembolso' };
  const rows = all.filter(p => filter === 'all' || p.status === filter).map(p => [
    p.id, p.date, p.user, p.method, '$' + p.amount, <RMBadge tone={tones[p.status]}>{labels[p.status]}</RMBadge>,
  ]);
  const exportCsv = () => rmCsvDownload('rideme-pagos.csv', ['id','fecha','usuario','metodo','monto','estado'],
    all.map(p => [p.id, p.date, p.user, p.method, p.amount, labels[p.status]]));
  return (
    <RMAdminTable title={t.adminPayments} columns={['ID','Fecha','Usuario','Método','Monto','Estado']}
      rows={rows} search={search}
      statusOptions={[
        { value: 'all', label: 'Todos los estados' },
        { value: 'paid', label: 'Pagados' },
        { value: 'pending', label: 'Pendientes' },
        { value: 'refund', label: 'Reembolsos' },
      ]} filterValue={filter} setFilterValue={setFilter} onExport={exportCsv}/>
  );
}

// ─── Reportes (sustituye al stub "Próximamente") ────────────────────────
function RMAdminReports() {
  const t = useT();
  const { adminTrips, history, driverEarnings, adminConfig } = useStore();
  const totalsByStatus = ['in_progress', 'completed', 'cancelled'].map(s => ({
    s, label: s === 'in_progress' ? 'En curso' : s === 'completed' ? 'Completados' : 'Cancelados',
    n: adminTrips.filter(tr => tr.status === s).length,
  }));
  const revenue = adminTrips.filter(tr => tr.status === 'completed').reduce((acc, tr) => acc + tr.fare, 0);
  const commission = Math.round(revenue * (adminConfig.commissionPct / 100));
  const completedHistory = history.filter(h => h.status === 'completed');
  const downloadAll = () => rmCsvDownload('rideme-reporte.csv',
    ['id','origen','destino','tarifa','estado','fecha'],
    adminTrips.map(tr => [tr.id, tr.from, tr.to, tr.fare, tr.status, new Date(tr.ts).toLocaleString('es-MX')]));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div>
        <div style={{ fontWeight: 800, fontSize: 24, letterSpacing: '-0.02em' }}>{t.reportsTitle}</div>
        <div style={{ color: 'var(--rm-text-2)', fontSize: 13 }}>{t.reportsSub}</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
        <RMCard padding={18}>
          <div style={{ fontSize: 12, color: 'var(--rm-text-3)', textTransform: 'uppercase' }}>{t.revenue}</div>
          <div style={{ fontWeight: 800, fontSize: 28 }}>${revenue.toLocaleString()}</div>
        </RMCard>
        <RMCard padding={18}>
          <div style={{ fontSize: 12, color: 'var(--rm-text-3)', textTransform: 'uppercase' }}>{t.totalCommission}</div>
          <div style={{ fontWeight: 800, fontSize: 28 }}>${commission.toLocaleString()}</div>
          <div style={{ fontSize: 11, color: 'var(--rm-text-2)' }}>{adminConfig.commissionPct}%</div>
        </RMCard>
        <RMCard padding={18}>
          <div style={{ fontSize: 12, color: 'var(--rm-text-3)', textTransform: 'uppercase' }}>{t.weeklyTrips}</div>
          <div style={{ fontWeight: 800, fontSize: 28 }}>{completedHistory.length + driverEarnings.trips}</div>
        </RMCard>
        <RMCard padding={18}>
          <div style={{ fontSize: 12, color: 'var(--rm-text-3)', textTransform: 'uppercase' }}>Promedio</div>
          <div style={{ fontWeight: 800, fontSize: 28 }}>${completedHistory.length ? Math.round(completedHistory.reduce((a, h) => a + h.fare, 0) / completedHistory.length) : 0}</div>
        </RMCard>
      </div>
      <RMCard padding={20}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div style={{ fontWeight: 700, fontSize: 16 }}>{t.reportTrips}</div>
          <RMButton variant="secondary" size="sm" icon={<RMIcon.upload style={{ transform: 'rotate(180deg)' }}/>} onClick={downloadAll}>{t.downloadCsv}</RMButton>
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', height: 200 }}>
          {totalsByStatus.map(b => {
            const max = Math.max(1, ...totalsByStatus.map(x => x.n));
            return (
              <div key={b.s} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{ width: '100%', height: `${(b.n / max) * 100}%`, background: 'linear-gradient(180deg, var(--rm-cyan), var(--rm-blue))', borderRadius: 6 }}/>
                <div style={{ fontSize: 12, fontWeight: 700 }}>{b.n}</div>
                <div style={{ fontSize: 11, color: 'var(--rm-text-3)' }}>{b.label}</div>
              </div>
            );
          })}
        </div>
      </RMCard>
    </div>
  );
}

// ─── Alertas (sustituye stub) ────────────────────────────────────────────
function RMAdminAlerts() {
  const t = useT();
  const { adminAlerts, pushAlert } = useStore();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: 24, letterSpacing: '-0.02em' }}>{t.alertsTitle}</div>
          <div style={{ color: 'var(--rm-text-2)', fontSize: 13 }}>{t.alertsSub}</div>
        </div>
        <RMButton variant="secondary" size="sm" icon={<RMIcon.plus/>}
          onClick={() => pushAlert({ kind: 'manual', message: 'Alerta manual creada por admin' })}>
          Nueva
        </RMButton>
      </div>
      <RMCard padding={0}>
        {adminAlerts.length === 0 ? (
          <div style={{ padding: 30 }}><RMEmpty icon={<RMIcon.alert/>} title={t.alertsEmpty}/></div>
        ) : (
          <div>
            {adminAlerts.map(a => (
              <div key={a.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: 16, borderBottom: '1px solid var(--rm-border)' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--rm-bg)', color: 'var(--rm-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <RMIcon.alert/>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{a.message}</div>
                  <div style={{ fontSize: 11, color: 'var(--rm-text-3)', marginTop: 2 }}>{rmTimeAgo(a.ts)} · {a.kind}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </RMCard>
    </div>
  );
}

// ─── Configuración (sustituye stub) ──────────────────────────────────────
function RMAdminSettings() {
  const t = useT();
  const { adminConfig, updateAdminConfig, resetState, pushAlert } = useStore();
  const [draft, setDraft] = React.useState({ ...adminConfig });
  const [toast, setToast] = React.useState(null);
  const [confirmReset, setConfirmReset] = React.useState(false);
  const upd = (k, v) => setDraft(d => ({ ...d, [k]: v }));
  const num = (k, v) => upd(k, isNaN(+v) ? d => d[k] : +v);
  const save = () => {
    updateAdminConfig(draft);
    pushAlert({ kind: 'config', message: 'Configuración actualizada' });
    setToast(t.configSaved);
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, position: 'relative' }}>
      <div>
        <div style={{ fontWeight: 800, fontSize: 24, letterSpacing: '-0.02em' }}>{t.settingsTitle}</div>
        <div style={{ color: 'var(--rm-text-2)', fontSize: 13 }}>{t.settingsSub}</div>
      </div>
      <RMCard padding={20}>
        <div style={{ fontWeight: 700, marginBottom: 14 }}>{t.settingsRates}</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
          <RMInput label={t.baseFareLabel} type="number" value={draft.baseFare} onChange={(v) => num('baseFare', v)}/>
          <RMInput label={t.perKmLabel} type="number" value={draft.perKm} onChange={(v) => num('perKm', v)}/>
          <RMInput label={t.perMinLabel} type="number" value={draft.perMin} onChange={(v) => num('perMin', v)}/>
        </div>
        <div style={{ height: 12 }}/>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
          <RMInput label={t.surgeMinLabel} type="number" value={draft.surgeMin} onChange={(v) => num('surgeMin', v)}/>
          <RMInput label={t.surgeMaxLabel} type="number" value={draft.surgeMax} onChange={(v) => num('surgeMax', v)}/>
          <RMInput label={t.commissionLabel} type="number" value={draft.commissionPct} onChange={(v) => num('commissionPct', v)}/>
        </div>
        <div style={{ height: 12 }}/>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
          <RMInput label={t.minFareLabel} type="number" value={draft.minFare} onChange={(v) => num('minFare', v)}/>
          <RMInput label={t.maxFareLabel} type="number" value={draft.maxFare} onChange={(v) => num('maxFare', v)}/>
          <RMInput label={t.operatingCity} value={draft.operatingCity} onChange={(v) => upd('operatingCity', v)}/>
        </div>
        <div style={{ marginTop: 18, display: 'flex', gap: 10 }}>
          <RMButton variant="primary" onClick={save}>{t.saveConfig}</RMButton>
          <RMButton variant="secondary" onClick={() => setDraft({ ...adminConfig })}>{t.cancel}</RMButton>
        </div>
      </RMCard>
      <RMCard padding={20} style={{ borderLeft: '4px solid var(--rm-red)' }}>
        <div style={{ fontWeight: 700, color: 'var(--rm-red)', marginBottom: 6 }}>{t.dangerZone}</div>
        <div style={{ color: 'var(--rm-text-2)', fontSize: 13, marginBottom: 14 }}>{t.resetWarning}</div>
        <RMButton variant="danger" onClick={() => setConfirmReset(true)} icon={<RMIcon.x/>}>{t.resetAllData}</RMButton>
      </RMCard>
      <RMConfirm open={confirmReset} onClose={() => setConfirmReset(false)}
        title={t.resetAllData} message={t.resetWarning}
        confirmLabel={t.confirm} cancelLabel={t.cancel} danger
        onConfirm={resetState}/>
      <RMToast open={!!toast} onClose={() => setToast(null)} kind="success">{toast}</RMToast>
    </div>
  );
}

function RMAdminRouter() {
  const { adminSection } = useStore();
  const map = {
    dashboard: <RMAdminDashboard/>,
    users:     <RMAdminUsers/>,
    drivers:   <RMAdminDrivers/>,
    trips:     <RMAdminTrips/>,
    payments:  <RMAdminPayments/>,
    reports:   <RMAdminReports/>,
    alerts:    <RMAdminAlerts/>,
    settings:  <RMAdminSettings/>,
  };
  return <RMAdminLayout>{map[adminSection] || <RMAdminDashboard/>}</RMAdminLayout>;
}

Object.assign(window, { RMAdminRouter });
