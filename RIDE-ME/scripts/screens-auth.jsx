// RideMe — Auth screens (Splash, Welcome, Login, Signup, Role)
function RMSplash() {
  const { goto } = useStore();
  React.useEffect(() => { const t = setTimeout(() => goto('welcome'), 1400); return () => clearTimeout(t); }, []);
  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18,
      background: 'linear-gradient(160deg, #0D1B3D 0%, #1A45BF 60%, #2563EB 100%)', color: '#fff',
    }}>
      <div style={{ animation: 'rm-fade-in 0.5s ease both' }}>
        <RMLogoMark size={88} cyan="#00B4FF" />
      </div>
      <div style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 36, letterSpacing: '-0.03em' }}>
        Ride<span style={{ color: 'var(--rm-cyan)' }}>Me</span>
      </div>
      <div style={{ opacity: 0.78, fontSize: 14 }}>Tu ride, tu destino.</div>
      <div style={{ marginTop: 20, display: 'flex', gap: 6 }}>
        {[0,1,2].map(i => (
          <span key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff',
            animation: `rm-dot-bounce 1.2s ${i * 0.15}s infinite ease-in-out` }}/>
        ))}
      </div>
    </div>
  );
}

function RMWelcome() {
  const t = useT();
  const { goto } = useStore();
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff' }}>
      <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 5 }}><RMLocaleToggle/></div>
      <div style={{
        flex: 1, position: 'relative',
        background: 'linear-gradient(180deg, #2563EB 0%, #1A45BF 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
      }}>
        {/* radar pulse */}
        {[0,1,2].map(i => (
          <div key={i} style={{
            position: 'absolute', width: 80, height: 80, borderRadius: '50%',
            border: '2px solid rgba(255,255,255,0.4)', animation: `rm-radar 2.6s ${i * 0.7}s infinite ease-out`,
          }}/>
        ))}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, color: '#fff' }}>
          <RMLogoMark size={84} />
          <div style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 38, letterSpacing: '-0.03em' }}>
            Ride<span style={{ color: 'var(--rm-cyan)' }}>Me</span>
          </div>
          <div style={{ fontSize: 14, opacity: 0.85 }}>{t.tagline}</div>
        </div>
      </div>
      <div style={{ padding: '24px 24px 28px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em', textAlign: 'center', marginBottom: 4 }}>
          {t.brand}
        </div>
        <div style={{ color: 'var(--rm-text-2)', fontSize: 14, textAlign: 'center', marginBottom: 10 }}>
          {t.tagline} {t.negotiateHint}
        </div>
        <RMButton variant="primary" full onClick={() => goto('login')}>{t.signIn}</RMButton>
        <RMButton variant="secondary" full onClick={() => goto('signup')}>{t.signUp}</RMButton>
        <div style={{ fontSize: 11, color: 'var(--rm-text-3)', textAlign: 'center', marginTop: 8, lineHeight: 1.5 }}>{t.terms}</div>
      </div>
    </div>
  );
}

function RMLogin() {
  const t = useT(); const { goto, setAuthed } = useStore();
  const [email, setEmail] = React.useState('lucia@example.com');
  const [pw, setPw] = React.useState('••••••••');
  const [loading, setLoading] = React.useState(false);

  const submit = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setAuthed(true); goto('roleSelect'); }, 800);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff' }}>
      <RMTopBar onBack={() => goto('welcome')} title={t.signIn} right={<RMLocaleToggle/>}/>
      <div style={{ flex: 1, padding: '8px 24px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <RMLogoMark size={56}/>
          <div style={{ fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em' }}>{t.signIn}</div>
        </div>
        <RMInput label={t.email} value={email} onChange={setEmail} placeholder="tucorreo@…"/>
        <RMInput label={t.password} type="password" value={pw} onChange={setPw}/>
        <div style={{ alignSelf: 'flex-end', fontSize: 13, color: 'var(--rm-blue)', fontWeight: 600 }}>{t.forgot}</div>
        <RMButton variant="primary" full onClick={submit} disabled={loading}>
          {loading ? <span className="rm-spinner" style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', animation: 'rm-spin 0.8s linear infinite' }}/> : t.signIn}
        </RMButton>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '8px 0' }}>
          <div style={{ flex: 1, height: 1, background: 'var(--rm-border)' }}/>
          <span style={{ fontSize: 12, color: 'var(--rm-text-3)' }}>{t.orContinue}</span>
          <div style={{ flex: 1, height: 1, background: 'var(--rm-border)' }}/>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <RMButton variant="secondary" full>Google</RMButton>
          <RMButton variant="secondary" full>Apple</RMButton>
        </div>
        <div style={{ textAlign: 'center', marginTop: 12, fontSize: 13, color: 'var(--rm-text-2)' }}>
          {t.noAccount} <span style={{ color: 'var(--rm-blue)', fontWeight: 700 }} onClick={() => goto('signup')}>{t.signUp}</span>
        </div>
      </div>
    </div>
  );
}

function RMSignup() {
  const t = useT(); const { goto, setAuthed } = useStore();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [pw, setPw] = React.useState('');
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff' }}>
      <RMTopBar onBack={() => goto('welcome')} title={t.signUp} right={<RMLocaleToggle/>}/>
      <div style={{ flex: 1, padding: '8px 24px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <RMInput label={t.fullName} value={name} onChange={setName} placeholder="Lucía Fernández"/>
        <RMInput label={t.email} value={email} onChange={setEmail} placeholder="lucia@example.com"/>
        <RMInput label={t.phone} value={phone} onChange={setPhone} placeholder="+52 55 …"/>
        <RMInput label={t.password} type="password" value={pw} onChange={setPw} placeholder="Mínimo 8 caracteres"/>
        <div style={{ fontSize: 11, color: 'var(--rm-text-3)', lineHeight: 1.5 }}>{t.terms}</div>
        <RMButton variant="primary" full onClick={() => { setAuthed(true); goto('roleSelect'); }}>{t.continue}</RMButton>
        <div style={{ textAlign: 'center', marginTop: 8, fontSize: 13, color: 'var(--rm-text-2)' }}>
          {t.haveAccount} <span style={{ color: 'var(--rm-blue)', fontWeight: 700 }} onClick={() => goto('login')}>{t.signIn}</span>
        </div>
      </div>
    </div>
  );
}

function RMRoleSelect() {
  const t = useT(); const { goto, setRole } = useStore();
  const pick = (r) => {
    setRole(r);
    if (r === 'passenger') goto('passengerHome');
    else if (r === 'driver') goto('driverDashboard');
    else goto('adminDashboard');
  };
  const Card = ({ id, title, sub, color, icon }) => (
    <button onClick={() => pick(id)} style={{
      width: '100%', textAlign: 'left', padding: 18, borderRadius: 'var(--rm-r-lg)',
      background: '#fff', border: '1.5px solid var(--rm-border)',
      display: 'flex', alignItems: 'center', gap: 14, boxShadow: 'var(--rm-shadow-sm)',
    }}>
      <div style={{ width: 56, height: 56, borderRadius: 'var(--rm-r-md)', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: 16 }}>{title}</div>
        <div style={{ fontSize: 13, color: 'var(--rm-text-2)' }}>{sub}</div>
      </div>
      <RMIcon.arrowR style={{ color: 'var(--rm-text-3)' }}/>
    </button>
  );
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--rm-bg)' }}>
      <RMTopBar onBack={() => goto('welcome')} title={t.chooseRole} right={<RMLocaleToggle/>}/>
      <div style={{ padding: '12px 20px', color: 'var(--rm-text-2)', fontSize: 13 }}>{t.chooseRoleSub}</div>
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Card id="passenger" title={t.rolePassenger} sub="Pide un viaje y elige el mejor precio" color="var(--rm-blue)" icon={<RMIcon.user/>}/>
        <Card id="driver" title={t.roleDriver} sub="Recibe solicitudes y envía ofertas" color="var(--rm-navy)" icon={<RMIcon.car/>}/>
        <Card id="admin" title={t.roleAdmin} sub="Gestiona la plataforma" color="var(--rm-cyan)" icon={<RMIcon.cog/>}/>
      </div>
    </div>
  );
}

Object.assign(window, { RMSplash, RMWelcome, RMLogin, RMSignup, RMRoleSelect });
