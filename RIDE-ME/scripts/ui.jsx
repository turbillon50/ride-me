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

function RMTextarea({ label, value, onChange, placeholder, rows=3, error, hint }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--rm-text-2)' }}>{label}</label>}
      <textarea value={value || ''} onChange={(e) => onChange?.(e.target.value)} placeholder={placeholder} rows={rows}
        style={{
          padding: 12, borderRadius: 'var(--rm-r-md)', resize: 'none', fontSize: 14, fontFamily: 'inherit',
          border: `1.5px solid ${error ? 'var(--rm-red)' : 'var(--rm-border)'}`, outline: 'none',
        }}/>
      {(hint || error) && <div style={{ fontSize: 12, color: error ? 'var(--rm-red)' : 'var(--rm-text-3)' }}>{error || hint}</div>}
    </div>
  );
}

function RMSelect({ label, value, onChange, options, hint, error }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--rm-text-2)' }}>{label}</label>}
      <select value={value} onChange={(e) => onChange?.(e.target.value)}
        style={{
          height: 50, padding: '0 14px', fontSize: 15, color: 'var(--rm-text)',
          border: `1.5px solid ${error ? 'var(--rm-red)' : 'var(--rm-border)'}`,
          borderRadius: 'var(--rm-r-md)', background: '#fff', appearance: 'none',
          backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 24 24%22 fill=%22none%22><path d=%22M6 9l6 6 6-6%22 stroke=%22%238693AB%22 stroke-width=%222%22/></svg>")',
          backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center',
        }}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {(hint || error) && <div style={{ fontSize: 12, color: error ? 'var(--rm-red)' : 'var(--rm-text-3)' }}>{error || hint}</div>}
    </div>
  );
}

function RMSwitch({ checked, onChange, label, sub }) {
  return (
    <button onClick={() => onChange?.(!checked)} style={{
      width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '14px 0',
      borderBottom: '1px solid var(--rm-border)', textAlign: 'left',
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, fontSize: 14 }}>{label}</div>
        {sub && <div style={{ fontSize: 12, color: 'var(--rm-text-3)', marginTop: 2 }}>{sub}</div>}
      </div>
      <span style={{
        width: 44, height: 26, borderRadius: 13, padding: 3,
        background: checked ? 'var(--rm-blue)' : 'var(--rm-border-strong)',
        display: 'flex', alignItems: 'center', justifyContent: checked ? 'flex-end' : 'flex-start',
        transition: 'background 0.2s, justify-content 0.2s',
      }}>
        <span style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', boxShadow: 'var(--rm-shadow-xs)' }}/>
      </span>
    </button>
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

// ─── Modal / Bottom sheet / Confirm ──────────────────────────────────────
function RMModal({ open, onClose, title, children, footer, maxWidth=420 }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position: 'absolute', inset: 0, zIndex: 60, background: 'rgba(13,27,61,0.45)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: '#fff', borderRadius: '20px 20px 0 0',
        padding: '14px 18px 18px', width: '100%', maxWidth,
        maxHeight: '85%', overflow: 'auto',
        animation: 'rm-slide-up 0.22s ease both',
        boxShadow: '0 -8px 30px rgba(13,27,61,0.18)',
      }} className="rm-scroll">
        <div style={{ width: 40, height: 4, background: 'var(--rm-border-strong)', borderRadius: 2, margin: '0 auto 12px' }}/>
        {title && <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 10 }}>{title}</div>}
        {children}
        {footer && <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>{footer}</div>}
      </div>
    </div>
  );
}

function RMConfirm({ open, onClose, onConfirm, title, message, confirmLabel, cancelLabel, danger }) {
  return (
    <RMModal open={open} onClose={onClose} title={title}
      footer={<>
        <RMButton variant={danger ? 'danger' : 'primary'} full onClick={() => { onConfirm?.(); onClose?.(); }}>{confirmLabel || 'Confirmar'}</RMButton>
        <RMButton variant="secondary" full onClick={onClose}>{cancelLabel || 'Cancelar'}</RMButton>
      </>}>
      {message && <div style={{ color: 'var(--rm-text-2)', fontSize: 14, lineHeight: 1.5 }}>{message}</div>}
    </RMModal>
  );
}

function RMToast({ open, kind='info', children, onClose }) {
  React.useEffect(() => {
    if (!open) return;
    const id = setTimeout(() => onClose?.(), 2400);
    return () => clearTimeout(id);
  }, [open]);
  if (!open) return null;
  const colors = {
    info:    { bg: 'var(--rm-navy)', col: '#fff' },
    success: { bg: 'var(--rm-green)', col: '#fff' },
    error:   { bg: 'var(--rm-red)', col: '#fff' },
  }[kind];
  return (
    <div style={{
      position: 'absolute', top: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 80,
      background: colors.bg, color: colors.col, padding: '10px 16px',
      borderRadius: 'var(--rm-r-full)', boxShadow: 'var(--rm-shadow-md)',
      fontSize: 13, fontWeight: 600, animation: 'rm-fade-in 0.2s ease both',
      maxWidth: '90%', textAlign: 'center',
    }}>{children}</div>
  );
}

function RMListRow({ icon, label, right, onClick, danger, sub }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
      background: '#fff', borderBottom: '1px solid var(--rm-border)', textAlign: 'left',
      color: danger ? 'var(--rm-red)' : 'var(--rm-text)',
    }}>
      <span style={{ width: 36, height: 36, borderRadius: 10, background: danger ? 'var(--rm-red-bg)' : 'var(--rm-bg)', color: danger ? 'var(--rm-red)' : 'var(--rm-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</span>
      <span style={{ flex: 1 }}>
        <span style={{ display: 'block', fontWeight: 600, fontSize: 15 }}>{label}</span>
        {sub && <span style={{ display: 'block', fontSize: 12, color: 'var(--rm-text-3)', marginTop: 2 }}>{sub}</span>}
      </span>
      {right || <RMIcon.arrowR style={{ color: 'var(--rm-text-3)' }}/>}
    </button>
  );
}

Object.assign(window, {
  RMButton, RMInput, RMTextarea, RMSelect, RMSwitch,
  RMCard, RMBadge, RMAvatar,
  RMTopBar, RMTabBar, RMEmpty, RMLocaleToggle, RMRouteRow,
  RMModal, RMConfirm, RMToast, RMListRow,
});
