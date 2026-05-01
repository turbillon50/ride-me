// RideMe — Admin (desktop)
function RMAdminLayout({ children }) {
  const t = useT(); const { adminSection, setAdminSection, goto, setRole } = useStore();
  const items = [
    { id: 'dashboard', label: t.adminDashboard, icon: <RMIcon.trend/> },
    { id: 'users', label: t.adminUsers, icon: <RMIcon.user/> },
    { id: 'drivers', label: t.adminDrivers, icon: <RMIcon.car/> },
    { id: 'trips', label: t.adminTrips, icon: <RMIcon.trip/> },
    { id: 'payments', label: t.adminPayments, icon: <RMIcon.cash/> },
    { id: 'reports', label: t.adminReports, icon: <RMIcon.doc/> },
    { id: 'alerts', label: t.adminAlerts, icon: <RMIcon.alert/> },
    { id: 'settings', label: t.adminSettings, icon: <RMIcon.cog/> },
  ];
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
                {it.icon}{it.label}
              </button>
            );
          })}
        </div>
        <div style={{ marginTop: 'auto', padding: 10, background: 'rgba(255,255,255,0.06)', borderRadius: 'var(--rm-r-md)' }}>
          <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 6 }}>Admin · Cambiar de rol</div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button onClick={() => { setRole('passenger'); goto('passengerHome'); }} style={{ flex: 1, padding: 8, borderRadius: 8, fontSize: 11, background: 'rgba(255,255,255,0.1)', color: '#fff' }}>Pasajero</button>
            <button onClick={() => { setRole('driver'); goto('driverDashboard'); }} style={{ flex: 1, padding: 8, borderRadius: 8, fontSize: 11, background: 'rgba(255,255,255,0.1)', color: '#fff' }}>Conductor</button>
          </div>
        </div>
      </aside>
      <main style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        <header style={{ height: 56, background: '#fff', borderBottom: '1px solid var(--rm-border)', display: 'flex', alignItems: 'center', padding: '0 20px', gap: 14 }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, padding: '0 12px', height: 36, background: 'var(--rm-bg)', borderRadius: 'var(--rm-r-md)', maxWidth: 360, color: 'var(--rm-text-3)' }}>
            <RMIcon.search/> <span style={{ fontSize: 13 }}>Buscar usuarios, viajes, conductores…</span>
          </div>
          <div style={{ flex: 1 }}/>
          <RMLocaleToggle/>
          <button style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--rm-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <RMIcon.bell/><span style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, borderRadius: '50%', background: 'var(--rm-red)' }}/>
          </button>
          <RMAvatar name="Admin Pro" color="var(--rm-cyan)" size={36}/>
        </header>
        <div style={{ flex: 1, padding: 24, overflow: 'auto' }} className="rm-scroll">
          {children}
        </div>
      </main>
    </div>
  );
}

function RMAdminDashboard() {
  const t = useT(); const s = RM_MOCK.adminStats;
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
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <div style={{ fontWeight: 800, fontSize: 24, letterSpacing: '-0.02em' }}>{t.adminDashboard}</div>
        <div style={{ color: 'var(--rm-text-2)', fontSize: 13 }}>Resumen operativo · hoy</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        <Stat label={t.totalUsers} value={s.users.toLocaleString()} delta="+4.2% / 7d" icon={<RMIcon.user/>}/>
        <Stat label={t.activeDrivers} value={s.drivers.toLocaleString()} delta="+1.8% / 7d" icon={<RMIcon.car/>} tone="cyan"/>
        <Stat label={t.tripsToday} value={s.tripsToday} delta="+11% vs ayer" icon={<RMIcon.trip/>}/>
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
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 12 }}>{t.pendingApprovals}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { name: 'Roberto S.', sub: 'Conductor · 3 docs', tone: 'amber' },
              { name: 'Marina C.', sub: 'Conductor · 1 doc', tone: 'amber' },
              { name: 'Iván P.', sub: 'Vehículo nuevo', tone: 'blue' },
            ].map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--rm-border)' }}>
                <RMAvatar name={p.name} color="#A8B8FF" size={36}/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--rm-text-3)' }}>{p.sub}</div>
                </div>
                <RMBadge tone={p.tone}>Revisar</RMBadge>
              </div>
            ))}
          </div>
        </RMCard>
      </div>
      <RMCard padding={20}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontWeight: 700, fontSize: 16 }}>Viajes recientes</div>
          <RMButton variant="ghost" size="sm">Ver todo</RMButton>
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
            {RM_MOCK.adminRecentTrips.map(tr => (
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

function RMAdminTable({ title, columns, rows, status }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontWeight: 800, fontSize: 24, letterSpacing: '-0.02em' }}>{title}</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <RMButton variant="secondary" size="sm" icon={<RMIcon.filter/>}>Filtros</RMButton>
          <RMButton variant="primary" size="sm" icon={<RMIcon.plus/>}>Nuevo</RMButton>
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
            {rows.map((r, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--rm-border)' }}>
                {r.map((cell, j) => <td key={j} style={{ padding: '14px 16px' }}>{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </RMCard>
    </div>
  );
}

function RMAdminUsers() {
  const rows = [
    ['#U1041', <span style={{ display:'flex', gap:10, alignItems:'center' }}><RMAvatar name="Lucía F." color="#5BD0FF" size={28}/> Lucía Fernández</span>, 'lucia@example.com', '142', '4.9', <RMBadge tone="green">Activo</RMBadge>],
    ['#U1040', <span style={{ display:'flex', gap:10, alignItems:'center' }}><RMAvatar name="Diego R." color="#FFB37C" size={28}/> Diego Rivas</span>, 'diego@example.com', '38', '4.7', <RMBadge tone="green">Activo</RMBadge>],
    ['#U1039', <span style={{ display:'flex', gap:10, alignItems:'center' }}><RMAvatar name="Pablo G." color="#A8B8FF" size={28}/> Pablo Guzmán</span>, 'pablo@example.com', '12', '4.6', <RMBadge tone="amber">Inactivo</RMBadge>],
    ['#U1038', <span style={{ display:'flex', gap:10, alignItems:'center' }}><RMAvatar name="Sofía A." color="#FF9DB3" size={28}/> Sofía Acuña</span>, 'sofia@example.com', '209', '5.0', <RMBadge tone="green">VIP</RMBadge>],
    ['#U1037', <span style={{ display:'flex', gap:10, alignItems:'center' }}><RMAvatar name="Mario T." color="#B7F0CC" size={28}/> Mario Trejo</span>, 'mario@example.com', '4', '—', <RMBadge tone="red">Bloqueado</RMBadge>],
  ];
  return <RMAdminTable title="Usuarios" columns={['ID','Nombre','Correo','Viajes','Rating','Estado']} rows={rows}/>;
}
function RMAdminDrivers() {
  const rows = [
    ['#D210', <span style={{ display:'flex', gap:10, alignItems:'center' }}><RMAvatar name="Carlos M." color="#5BD0FF" size={28}/> Carlos Méndez</span>, 'Nissan Versa · ABC-123', '1240', '4.92', <RMBadge tone="green">Aprobado</RMBadge>],
    ['#D209', <span style={{ display:'flex', gap:10, alignItems:'center' }}><RMAvatar name="María L." color="#FFB37C" size={28}/> María Luna</span>, 'Toyota Yaris · XYZ-987', '2100', '4.95', <RMBadge tone="green">Aprobado</RMBadge>],
    ['#D208', <span style={{ display:'flex', gap:10, alignItems:'center' }}><RMAvatar name="Roberto S." color="#A8B8FF" size={28}/> Roberto Suárez</span>, 'Chevy Aveo · LMN-009', '0', '—', <RMBadge tone="amber">En revisión</RMBadge>],
    ['#D207', <span style={{ display:'flex', gap:10, alignItems:'center' }}><RMAvatar name="Marina C." color="#FF9DB3" size={28}/> Marina Cano</span>, 'VW Vento · QRS-543', '0', '—', <RMBadge tone="amber">En revisión</RMBadge>],
    ['#D206', <span style={{ display:'flex', gap:10, alignItems:'center' }}><RMAvatar name="Iván P." color="#B7F0CC" size={28}/> Iván Pérez</span>, 'Kia Rio · TUV-110', '88', '4.4', <RMBadge tone="red">Suspendido</RMBadge>],
  ];
  return <RMAdminTable title="Conductores" columns={['ID','Nombre','Vehículo','Viajes','Rating','Estado']} rows={rows}/>;
}
function RMAdminTrips() {
  const tones = { in_progress: 'blue', completed: 'green', cancelled: 'red' };
  const labels = { in_progress: 'En curso', completed: 'Completado', cancelled: 'Cancelado' };
  const rows = RM_MOCK.adminRecentTrips.map(tr => [
    '#' + tr.id, tr.user, tr.driver, tr.from + ' → ' + tr.to, '$' + tr.fare, <RMBadge tone={tones[tr.status]}>{labels[tr.status]}</RMBadge>
  ]);
  return <RMAdminTable title="Viajes" columns={['ID','Pasajero','Conductor','Ruta','Tarifa','Estado']} rows={rows}/>;
}
function RMAdminPayments() {
  const rows = [
    ['#P5021', '28 abr 14:32', 'Lucía F.', 'Tarjeta •• 4242', '$142', <RMBadge tone="green">Pagado</RMBadge>],
    ['#P5020', '28 abr 14:18', 'Diego R.', 'Efectivo', '$95', <RMBadge tone="green">Pagado</RMBadge>],
    ['#P5019', '28 abr 14:05', 'Pablo G.', 'Tarjeta •• 1188', '$215', <RMBadge tone="amber">Pendiente</RMBadge>],
    ['#P5018', '28 abr 13:50', 'Sofía A.', 'Tarjeta •• 9020', '$92', <RMBadge tone="red">Reembolso</RMBadge>],
  ];
  return <RMAdminTable title="Pagos" columns={['ID','Fecha','Usuario','Método','Monto','Estado']} rows={rows}/>;
}

function RMAdminGeneric({ title, sub }) {
  return (
    <div>
      <div style={{ fontWeight: 800, fontSize: 24, letterSpacing: '-0.02em' }}>{title}</div>
      <div style={{ color: 'var(--rm-text-2)', marginBottom: 18 }}>{sub}</div>
      <RMCard padding={40}>
        <RMEmpty icon={<RMIcon.cog/>} title={title} sub="Próximamente · módulo en construcción"/>
      </RMCard>
    </div>
  );
}

function RMAdminRouter() {
  const { adminSection } = useStore();
  const map = {
    dashboard: <RMAdminDashboard/>,
    users: <RMAdminUsers/>,
    drivers: <RMAdminDrivers/>,
    trips: <RMAdminTrips/>,
    payments: <RMAdminPayments/>,
    reports: <RMAdminGeneric title="Reportes" sub="KPIs y análisis"/>,
    alerts: <RMAdminGeneric title="Alertas" sub="Eventos del sistema"/>,
    settings: <RMAdminGeneric title="Configuración" sub="Tarifas, comisiones, zonas"/>,
  };
  return <RMAdminLayout>{map[adminSection] || <RMAdminDashboard/>}</RMAdminLayout>;
}

Object.assign(window, { RMAdminRouter });
