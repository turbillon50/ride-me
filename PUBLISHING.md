# RideMe — Guía para publicar en iOS y Android

Este documento describe **todo lo que se necesita** para llevar RideMe de su forma actual (web + PWA) a las tiendas oficiales de iOS y Android. Está pensado para que tú o tu equipo lo usen como checklist real, no como documento aspiracional.

> **Estado actual:** RideMe es una **PWA** (Progressive Web App). Funciona en cualquier navegador moderno y se puede "instalar" desde Safari/Chrome al home screen. Para **App Store y Google Play** se requiere empaquetarla como app nativa.

---

## 1. Estrategias de publicación (elige una)

| Estrategia | iOS | Android | Esfuerzo | Costo de mantener |
|---|---|---|---|---|
| **A. PWA pura** (lo que tienes hoy) | ❌ no aparece en App Store | ✅ se puede listar como TWA | Bajo | Bajo |
| **B. Capacitor** (recomendado) | ✅ App Store | ✅ Play Store | Medio | Medio |
| **C. React Native rewrite** | ✅ | ✅ | Alto | Alto |
| **D. WebView nativa custom** | ✅ | ✅ | Alto | Alto |

**Recomendación: Estrategia B (Capacitor).** Mantienes el código web actual, lo envuelves en un shell nativo para iOS y Android, accedes a APIs nativas (geolocalización, notificaciones, cámara) cuando las necesites, y publicas en ambas tiendas. Es lo que usan apps como WordPress, Khan Academy o Sworkit.

---

## 2. Requisitos legales y administrativos

### 2.1 Persona moral
- Constituir una sociedad mercantil en México (S.A. de C.V. o S.A.S.) — consulta con notario y contador
- Registro Federal de Contribuyentes (RFC) activo
- Constancia de situación fiscal del SAT
- Domicilio fiscal y comprobante reciente
- Cuenta bancaria empresarial (para recibir pagos de las tiendas)

### 2.2 Seguros y cumplimiento
- **Póliza de seguro de pasajero** por viaje (mínimo MX$1,000,000 por usuario en muchos estados de MX). Aseguradoras que cubren plataformas: Qualitas, GNP, AXA, Mapfre.
- **Verificación de conductores (KYC):** licencia, ID oficial, tarjeta de circulación, póliza vehicular, antecedentes no penales. Servicios: Truora, Validar.io, MetaMap.
- **Regulación local:** cada estado de México regula transporte privado de pasajeros distinto. Algunos estados que regulan plataformas tipo Uber/DiDi:
  - Jalisco (Guadalajara): Ley de Movilidad y Transporte del Estado, requiere registro estatal y placas RTA
  - CDMX: Reglamento de la Ley de Movilidad y registro en SEMOVI
  - Nuevo León (Monterrey): Ley de Movilidad Sostenible y Accesibilidad
  - Verifica el estado donde quieras operar; algunos prohíben tarifa negociable (cobran por taxímetro registrado)
- **Aviso de privacidad** registrado con INAI (cumplimiento LFPDPPP). Ya está en la app, falta el alta formal.
- **Términos y condiciones** publicados (ya están en la app).

### 2.3 Pagos y fiscal
- Alta como **agregador de pagos** o uso de PSP (Stripe, Mercado Pago, Conekta) — ellos te emiten el contrato y manejan PCI compliance
- **CFDI 4.0** automático por cada viaje al pasajero (facturación electrónica). Servicios: SW Sapien, Facturama, Konfio
- Retención de IVA e ISR a los conductores (Ley del IVA Art. 113-A para plataformas digitales). Las plataformas son obligadas a retener:
  - IVA: 8% del total cobrado
  - ISR: 2.1% (sobre ingresos < MX$5,500/mes), escalado por monto
- Reportar mensualmente al SAT vía DIOT y declaración de pagos a terceros

---

## 3. Apple App Store (iOS)

### 3.1 Cuenta y costos
- **Apple Developer Program:** US$99/año (individual) o US$299/año (Apple Developer Enterprise — solo si distribuyes internamente)
- Cuenta organizacional (necesita D-U-N-S Number gratuito de Dun & Bradstreet)
- App Store Connect: dashboard donde subes la app

### 3.2 Requisitos técnicos (Capacitor)
- **macOS + Xcode 15+** para compilar (puedes usar GitHub Actions con macOS runners en su lugar)
- iOS deployment target 13.0 mínimo recomendado
- Bundle ID único (ej. `mx.rideme.app`)
- Certificados de firma (Apple Distribution)
- Provisioning Profiles
- TestFlight para beta testers

### 3.3 Activos requeridos (App Store)
| Activo | Tamaño | Cantidad |
|---|---|---|
| App icon | 1024×1024 PNG sin alpha | 1 |
| Screenshots iPhone 6.7" | 1290×2796 | mínimo 3, máximo 10 |
| Screenshots iPhone 6.5" | 1284×2778 | (opcional) |
| Screenshots iPad 12.9" | 2048×2732 | si soportas iPad |
| App Preview video | 30s, vertical | opcional pero recomendado |
| Descripción | 4000 chars max | en español MX y opcionalmente inglés |
| Subtitle | 30 chars | |
| Keywords | 100 chars | |
| Promotional text | 170 chars | |
| Soporte URL | https | |
| Marketing URL | https | (opcional) |
| Privacy Policy URL | https | obligatorio |
| Categoría primaria | Travel o Lifestyle | |

### 3.4 App Store Review Guidelines críticas para apps de transporte
- **Sección 5.1 Privacy:** declarar todos los datos recopilados en App Privacy "Nutrition Label". RideMe captura: ubicación, contacto, identificadores de uso, contenido de usuario.
- **Sección 4.2 Minimum Functionality:** la app debe ser más que un wrapper de web. Capacitor cumple porque integra geolocalización, push notifications y cámara nativas.
- **Sección 1.4.1 Physical Harm:** apps de transporte requieren mecanismos de seguridad (ver perfil del conductor, compartir viaje, botón de pánico recomendado).
- **Sección 3.1.5(a) Goods and Services:** el cobro al pasajero por el viaje es servicio "real-world" → puedes usar Stripe/Mercado Pago/Conekta sin pagar la comisión 30% de Apple. Solo pagos digitales virtuales (suscripciones, créditos in-app) están sujetos a IAP.
- Tiempo de revisión: 24h-72h en promedio. Primera publicación puede tardar más.

### 3.5 Capabilities (Info.plist) que vas a necesitar
- `NSLocationWhenInUseUsageDescription` — texto explicando por qué
- `NSLocationAlwaysAndWhenInUseUsageDescription` — para conductores en background
- `NSCameraUsageDescription` — si activas foto de perfil/documentos
- `NSPhotoLibraryUsageDescription` — selección de foto
- `NSContactsUsageDescription` — solo si compartes viaje con contactos
- Background Modes: `location` (para conductores) y `remote-notification`
- Push Notifications capability

---

## 4. Google Play Store (Android)

### 4.1 Cuenta y costos
- **Google Play Console:** US$25 pago único (vitalicio)
- Cuenta de desarrollador a nombre de la persona moral
- Domicilio físico verificado (Google envía postal con código a México)

### 4.2 Requisitos técnicos
- **Android Studio + JDK 17**
- minSdkVersion 24 (Android 7.0) recomendado
- targetSdkVersion 34+ obligatorio para nuevas apps en 2026
- App Signing: Google Play App Signing habilitado (recomendado)
- AAB (Android App Bundle) en lugar de APK desde 2021

### 4.3 Activos requeridos (Play Console)
| Activo | Especificación | Cantidad |
|---|---|---|
| App icon | 512×512 PNG con alpha | 1 |
| Feature graphic | 1024×500 JPG/PNG | 1 |
| Screenshots phone | 16:9 o 9:16, 320-3840 px | mínimo 2, máximo 8 |
| Screenshots tablet 7" | si soportas tablet | |
| Screenshots tablet 10" | si soportas tablet | |
| Promo video YouTube | URL | opcional |
| Título | 30 chars | |
| Descripción corta | 80 chars | |
| Descripción completa | 4000 chars | |
| Privacy Policy URL | https | obligatorio |
| Email de contacto | | obligatorio |
| Categoría | Maps & Navigation o Travel & Local | |

### 4.4 Política de Google Play críticas
- **Data Safety form:** declarar todos los datos recopilados, parecido al de Apple
- **Background Location:** justificación detallada y video explicativo si pides ubicación en background (clave para conductores)
- **Permission Declaration form:** para `ACCESS_BACKGROUND_LOCATION` y `READ_PHONE_STATE`
- **Real Money Trading / Transportation policy:** cumplir con ley local de transporte; Google puede pedir comprobante de licencia/registro estatal
- **Sensitive Permissions:** la app debe usar permisos solo cuando son indispensables y explicarlo en la UI

### 4.5 Permisos AndroidManifest.xml
- `ACCESS_FINE_LOCATION`, `ACCESS_COARSE_LOCATION`
- `ACCESS_BACKGROUND_LOCATION` (solo para conductores)
- `INTERNET`, `ACCESS_NETWORK_STATE`
- `POST_NOTIFICATIONS` (Android 13+)
- `CAMERA`, `READ_MEDIA_IMAGES` (foto de perfil)
- `FOREGROUND_SERVICE` con tipo `location` (conductor en línea)

---

## 5. Pasos concretos del repo actual al primer build

### 5.1 Migrar a build con Capacitor

```bash
# Desde la raíz del repo
npm init -y
npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android
npm install @capacitor/geolocation @capacitor/push-notifications @capacitor/camera
npm install @capacitor/preferences @capacitor/splash-screen @capacitor/status-bar

npx cap init "RideMe" "mx.rideme.app" --web-dir RIDE-ME

# Generar plataformas
npx cap add ios
npx cap add android

# Compilar después de cada cambio
npx cap sync
```

### 5.2 Reemplazar `localStorage` por Capacitor Preferences
Hoy en `store.jsx` usamos `localStorage`. En iOS instalado, esto sigue funcionando dentro del WebView, pero para datos sensibles conviene usar `@capacitor/preferences` que guarda en Keychain (iOS) y SharedPreferences (Android).

### 5.3 Reemplazar mapa SVG por Mapbox o Google Maps
- Mapbox iOS/Android SDK con WebView → `npm install @rnmapbox/maps`
- O usar un Capacitor plugin (community plugins de Mapbox/Google)
- Costo: Mapbox 50,000 monthly active users gratis después cobra por MAU. Google Maps: $7/1,000 sesiones después de la cuota gratuita.

### 5.4 Notificaciones push reales
- Firebase Cloud Messaging (gratis) para Android e iOS
- Configurar en Capacitor con `@capacitor/push-notifications`
- Necesita backend que mande las notificaciones (cuando el conductor esté cerca, etc.)

### 5.5 CI/CD para builds nativos
Recomendado: **EAS Build** de Expo (también funciona para Capacitor) o **Codemagic** para builds reproducibles desde GitHub Actions sin necesidad de Mac local.

---

## 6. Costos estimados anuales

| Concepto | Costo MXN/año |
|---|---|
| Apple Developer Program | ~$2,000 |
| Google Play (one-time) | ~$500 (primer año) |
| Capacitor (open source) | $0 |
| Mapbox (estimado 5,000 MAU) | $0 (dentro de free tier) |
| Stripe (2.9% + $3 MXN por transacción) | variable |
| Mercado Pago (3.49% + IVA) | variable |
| Twilio SMS (OTP) | $0.50 MXN/SMS aprox |
| Firebase (FCM, Analytics, Crashlytics) | $0 base, $25/mes Spark |
| Hosting backend (Supabase Pro) | $25/mes (~$6,000/año) |
| Dominio (.mx) | ~$500/año |
| Seguro de pasajero por viaje | variable según volumen |
| **Mínimo viable de software** | **~$15,000/año** |

No incluye: equipo, oficina, marketing, comisiones de procesador de pago, abogado.

---

## 7. Checklist mínima antes de subir a Apple/Google

- [ ] Persona moral constituida con RFC y cuenta bancaria
- [ ] Aviso de privacidad registrado en INAI
- [ ] Términos y condiciones publicados (URL pública)
- [ ] Seguro de pasajero contratado
- [ ] KYC de conductores integrado
- [ ] Mapas reales (Mapbox o Google) reemplazando el SVG
- [ ] Auth real con OTP por SMS
- [ ] Pagos sandbox funcionando (Stripe + Mercado Pago)
- [ ] Backend con base de datos (Supabase, AWS, GCP)
- [ ] Push notifications funcionando
- [ ] Sentry o Crashlytics configurado
- [ ] Política de cancelación clara
- [ ] Botón de soporte 24/7 (puede ser WhatsApp Business al inicio)
- [ ] Iconos en todos los tamaños requeridos (8 para iOS, 5 para Android)
- [ ] Screenshots producidos y traducidos
- [ ] App Privacy Nutrition Label / Data Safety form llenados con verdad
- [ ] TestFlight beta con al menos 20 conductores y 50 pasajeros piloto
- [ ] Plan de soporte y lista de bugs conocidos antes del primer envío

---

## 8. Próximos pasos sugeridos en orden

1. **Validar UX con el demo actual** (lo que estás haciendo ahora) → 1 semana
2. **Constituir persona moral + abogado** → 4-6 semanas en paralelo
3. **Migrar a build real (Vite + TypeScript + Capacitor)** → 2-3 semanas
4. **Backend mínimo (Supabase + Postgres + RLS)** → 2 semanas
5. **Pagos + KYC + mapas reales** → 3-4 semanas
6. **Beta cerrada con conductores piloto en una sola ciudad** (sugerencia: Guadalajara) → 4 semanas
7. **Iteración + cumplimiento estatal** → 2-4 semanas
8. **Submission a App Store y Play Store** → 1 semana
9. **Lanzamiento público en 1 ciudad** → ⏳

Tiempo total realista hasta tener app pública con usuarios pagando: **4-6 meses** con un equipo de 2-3 personas técnicas + 1 operacional + abogado externo.

---

*Este documento es una guía de referencia, no asesoría legal. Consulta con un abogado mexicano especializado en regulación de plataformas digitales antes de operar comercialmente.*
