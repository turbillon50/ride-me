// RideMe — UI primitives

function RMButton({ variant='primary', size='md', full=false, icon, children, onClick, disabled, style={} }) {
  const sizes = { sm: { h: 36, px: 14, fs: 13 }, md: { h: 48, px: 18, fs: 15 }, lg: { h: 56, px: 22, fs: 16 } };
  const s = sizes[size];
  const variants = {
    primary: { bg: 'var(--rm-blue)', col: '#fff', border: 'transparent', shadow: 'var(--rm-shadow-blue)' },
    primaryDark: { bg: 'var(--rm-navy)', col: '#fff', border: 'transparent', shadow: 'var(--rm-shadow-md)' },
    cyan: { bg: 'var(--rm-cyan)', col: '#0D1B3D', border: 'transparent', shadow: '0 8px 22px rgba(0,180,255,0.32)' },
    secondary: { bg: '#fff', col: 'var(--rm-navy)', border: 'var(--rm-border-strong)', shadow: 'var(--rm-shadow-xs)' },
    ghost: { bg: 'transparent', col: 'var(--rm-blue)', border: 'transparent', shadow: 'none' },
    danger: { bg: '#fff', col: 'var(--rm-red)', border: 'var(--rm-red)', shadow: 'none' },
    success: { bg: 'var(--rm-green)', col: '#fff', border: 'transparent', shadow: '0 8px 22px rgba(16,185,129,0.32)' },
  };
  const v = variants[variant] || variants.primary;
  return (
    <button onClick={onClick} disabled={disabled}
      style={{
        height: s.h, padding: `0 ${s.px}px`, borderRadius: 'var(--rm-r-full)',
        background: v.bg, color: v.col, border: `1.5px solid ${v.border}`,
        boxShadow: disabled ? 'none' : v.shadow,
        fontWeight: 600, fontSize: s.fs, letterSpacing: '-0.01em',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        width: full ? '100%' : 'auto', opacity: disabled ? 0.5 : 1,
        transition: 'transform 0.12s ease, box-shadow 0.2s ease',
        ...style,
      }}>
      {icon}{children}
    </button>
  );
}

function RMInput({ label, icon, value, onChange, placeholder, type='text', hint, error, suffix, ...rest }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--rm-text-2)' }}>{label}</label>}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        height: 50, padding: '0 14px',
        background: '#fff', border: `1.5px solid ${error ? 'var(--rm-red)' : 'var(--rm-border)'}`,
        borderRadius: 'var(--rm-r-md)',
      }}>
        {icon && <span style={{ color: 'var(--rm-text-3)' }}>{icon}</span>}
        <input type={type} value={value || ''} placeholder={placeholder}
          onChange={(e) => onChange?.(e.target.value)}
          style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 15, color: 'var(--rm-text)' }}
          {...rest}/>
        {suffix}
      </div>
      {(hint || error) && <div style={{ fontSize: 12, color: error ? 'var(--rm-red)' : 'var(--rm-text-3)' }}>{error || hint}</div>}
    </div>
  );
}

function RMCard({ children, padding=16, style={} }) {
  return <div style={{ background: '#fff', borderRadius: 'var(--rm-r-lg)', padding, boxShadow: 'var(--rm-shadow-sm)', ...style }}>{children}</div>;
}

function RMBadge({ tone='neutral', children, style={} }) {
  const map = {
    neutral: { bg: '#EEF2F8', col: 'var(--rm-text-2)' },
    blue:    { bg: '#E2ECFD', col: 'var(--rm-blue-700)' },
    cyan:    { bg: '#DEF4FF', col: '#006A99' },
    green:   { bg: 'var(--rm-green-bg)', col: 'var(--rm-green)' },
    amber:   { bg: 'var(--rm-amber-bg)', col: '#92580B' },
    red:     { bg: 'var(--rm-red-bg)',   col: 'var(--rm-red)' },
  }[tone];
  return <span style={{
    background: map.bg, color: map.col, fontSize: 11, fontWeight: 600,
    padding: '4px 10px', borderRadius: 'var(--rm-r-full)', display: 'inline-flex',
    alignItems: 'center', gap: 4, ...style
  }}>{children}</span>;
}

function RMAvatar({ name='?', color='#5BD0FF', size=40 }) {
  const initials = name.split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase();
  return <div style={{
    width: size, height: size, borderRadius: '50%',
    background: color, color: '#0D1B3D', fontWeight: 700,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: size * 0.38, flexShrink: 0
  }}>{initials}</div>;
}

function RMTopBar({ title, onBack, right, dark=false }) {
  return (
    <div style={{
      height: 56, padding: '0 12px', display: 'flex', alignItems: 'center', gap: 8,
      background: dark ? 'transparent' : '#fff',
      color: dark ? '#fff' : 'var(--rm-text)',
      borderBottom: dark ? 'none' : '1px solid var(--rm-border)',
      position: 'sticky', top: 0, zIndex: 20,
    }}>
      {onBack && (
        <button onClick={onBack} style={{ width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: dark ? 'rgba(255,255,255,0.15)' : 'var(--rm-bg)' }}>
          <RMIcon.arrowL/>
        </button>
      )}
      <div style={{ flex: 1, fontWeight: 700, fontSize: 17, letterSpacing: '-0.01em' }}>{title}</div>
      {right}
    </div>
  );
}

function RMTabBar({ tabs, active, onChange }) {
  return (
    <div style={{
      height: 72, background: '#fff', borderTop: '1px solid var(--rm-border)',
      display: 'flex', alignItems: 'stretch',
      paddingBottom: 'env(safe-area-inset-bottom)', flexShrink: 0,
    }}>
      {tabs.map(t => {
        const on = active === t.id;
        return (
          <button key={t.id} onClick={() => onChange(t.id)}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: 4, color: on ? 'var(--rm-blue)' : 'var(--rm-text-3)', fontSize: 11, fontWeight: 600,
            }}>
            <span style={{ position: 'relative' }}>
              {t.icon}
              {t.badge ? <span style={{ position: 'absolute', top: -2, right: -6, width: 8, height: 8, borderRadius: '50%', background: 'var(--rm-red)' }}/> : null}
            </span>
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

function RMEmpty({ icon, title, sub, action }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '40px 24px', gap: 10 }}>
      <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--rm-bg)', color: 'var(--rm-text-3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {icon}
      </div>
      <div style={{ fontWeight: 700, fontSize: 17, marginTop: 6 }}>{title}</div>
      {sub && <div style={{ color: 'var(--rm-text-2)', fontSize: 14, maxWidth: 260 }}>{sub}</div>}
      {action}
    </div>
  );
}

function RMLocaleToggle() {
  const { locale, setLocale } = useStore();
  return (
    <div style={{ display: 'inline-flex', background: 'var(--rm-bg)', borderRadius: 'var(--rm-r-full)', padding: 3 }}>
      {['es','en'].map(l => (
        <button key={l} onClick={() => setLocale(l)}
          style={{
            padding: '6px 12px', borderRadius: 'var(--rm-r-full)',
            fontSize: 12, fontWeight: 700,
            background: locale === l ? '#fff' : 'transparent',
            color: locale === l ? 'var(--rm-blue)' : 'var(--rm-text-3)',
            boxShadow: locale === l ? 'var(--rm-shadow-xs)' : 'none',
          }}>{l.toUpperCase()}</button>
      ))}
    </div>
  );
}

function RMRouteRow({ from, to }) {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 6 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', border: '2.5px solid var(--rm-blue)', background: '#fff' }}/>
        <div style={{ width: 2, flex: 1, background: 'var(--rm-border-strong)', margin: '4px 0', minHeight: 22 }}/>
        <div style={{ width: 10, height: 10, borderRadius: 2, background: 'var(--rm-navy)' }}/>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--rm-text-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Origen</div>
          <div style={{ fontWeight: 600, fontSize: 14 }}>{from}</div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: 'var(--rm-text-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Destino</div>
          <div style={{ fontWeight: 600, fontSize: 14 }}>{to}</div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  RMButton, RMInput, RMCard, RMBadge, RMAvatar,
  RMTopBar, RMTabBar, RMEmpty, RMLocaleToggle, RMRouteRow,
});
