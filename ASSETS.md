# RideMe — Inventario de assets visuales

Este archivo lista todos los assets visuales del demo y dónde reemplazarlos cuando me mandes los archivos finales.

---

## 1. Logotipo de marca

**Ubicación actual:** `/RIDE-ME/scripts/logo.jsx` (SVG inline)

**Cómo reemplazarlo:**
- **Si me mandas un SVG:** lo redibujo inline en `logo.jsx` para que escale perfecto en todos los tamaños (32, 56, 88, 104 px).
- **Si me mandas un PNG/PDF:** lo guardamos en `/RIDE-ME/uploads/logo.png` y `logo.jsx` lo usa como `<img>`. Para versiones donde se necesita inline (Apple Touch Icon, manifest) generamos los tamaños requeridos.
- **Aparece en:** splash, welcome, login, signup, role-select, sidebar admin, manifest PWA.

**Variantes que voy a necesitar:**
- Logo completo (mark + texto "RideMe")
- Solo el mark (símbolo) para favicon, app icon
- Versión en blanco para fondos oscuros (si la versión normal no contrasta bien)

---

## 2. Iconos de roles (Passenger / Driver / Admin)

**Ubicación actual:** `/RIDE-ME/scripts/screens-auth.jsx` función `RMRoleSelect`, prop `icon`

**Cómo reemplazarlos:**
- Súbelos a `/RIDE-ME/uploads/role-passenger.png`, `role-driver.png`, `role-admin.png` (o SVG).
- En `screens-auth.jsx` reemplazo el `<RMIcon.user/>`, `<RMIcon.car/>`, `<RMIcon.cog/>` por `<img src="/uploads/role-passenger.png" .../>`.

**Tamaño recomendado:** 80×80 px PNG transparente, o SVG cuadrado.

---

## 3. Fotos del carrusel del Welcome (hero)

**Ubicación actual:** `/RIDE-ME/scripts/screens-auth.jsx` constante `RM_HERO_PHOTOS`

**Cómo reemplazarlas:**
- Súbelas a `/RIDE-ME/uploads/hero-1.jpg`, `hero-2.jpg`, etc.
- O dame URLs (Unsplash, Cloudinary, S3 firmado, lo que sea).
- En `screens-auth.jsx` actualizo el array.

**Tema buscado** (según tu feedback):
- ✅ Coche abriendo puerta a pasajero
- ✅ Interior cómodo de sedán
- ✅ Traslado seguro / profesional
- ✅ Conductor uniformado / chofer
- ❌ NO autos de superlujo
- ❌ NO paisajes / montañas / cámaras

**Especificación:**
- Mínimo 1200×900 px (mejor 1920×1080)
- Formato JPG o WebP
- Buen contraste para que el texto blanco encima sea legible (idealmente con zonas oscuras en la parte inferior)
- 4 fotos forman el carrusel; pueden ser 3-6 si prefieres

---

## 4. Iconos PWA (instalación en celular)

**Ubicación actual:** `/RIDE-ME/icons/`
- `favicon-32.png` (32×32)
- `icon-192.png` (192×192)
- `icon-512.png` (512×512)
- `icon-512-maskable.png` (512×512 con safe area circular)
- `apple-touch-icon.png` (180×180)

**Cómo reemplazarlos:**
- Reemplaza los archivos en `/RIDE-ME/icons/` con el mismo nombre.
- **Si solo me das el logo en alta resolución** (1024×1024 o vectorial), yo genero todos los tamaños.

---

## 5. Auto del mapa

**Ubicación actual:** `/RIDE-ME/scripts/map.jsx` líneas ~87-95 (SVG con dos rectángulos)

**Pendiente:** dijiste que me mandarías el diseño del coche.

**Cómo lo voy a integrar:**
- Si me mandas SVG, lo embebo directo en `map.jsx`.
- Si me mandas PNG/PDF, lo redibujo como SVG estilizado (mejor para el zoom y rendimiento).
- Vista preferible: top-down (vista superior) o 3/4 frontal, dependiendo del estilo.

---

## 6. Avatares

**Ubicación actual:** `/RIDE-ME/scripts/ui.jsx` componente `RMAvatar`

**Estado:**
- ✅ Ya soporta foto del usuario (sube su foto desde Editar Perfil)
- ⏳ Para conductores ficticios del mock, ahora son círculos con iniciales y color
- Si quieres avatares ilustrados estilizados (cartoon), me los pasas y los integro en `RM_MOCK.drivers` con campo `avatar`

---

## 7. Splash photos / videos

**Ubicación actual:** `/RIDE-ME/scripts/screens-auth.jsx` función `RMSplash`

**Estado:** actualmente es solo el logo con glow + dots. Si quieres incluir un video corto loopeable o un fondo más rico, me lo pasas y lo integro.

---

## 8. Iconos de UI generales (home, chat, car, pin, etc.)

**Ubicación actual:** `/RIDE-ME/scripts/icons.jsx`

**Estado:** son SVG inline minimalistas tipo Lucide/Phosphor. Si quieres un set diferente (estilo más bold, filled, neon, etc.), me das referencia y los redibujo.

---

## Cómo me los pasas (orden de preferencia)

1. **Pegándolos en este chat** — yo los "veo", los descargo, los pongo en `/RIDE-ME/uploads/` con nombres limpios. ✅ Recomendado para la mayoría de imágenes.
2. **Subiéndolos al repo** — los commiteas en `/RIDE-ME/uploads/` y me dices "ya están". Yo los referencio. ✅ Mejor para muchos archivos juntos.
3. **URLs externas** (Unsplash, Cloudinary, S3) — me das la lista y los pongo. ✅ Útil para fotos de stock.
4. **Descripción en texto** — "auto sedán negro vista superior, sombra suave, color #1A45BF" — yo lo dibujo como SVG. ✅ Útil para iconos custom.

---

## Lo que NO puedo hacer

- Generar imágenes raster fotorrealistas desde cero (necesitas Midjourney/DALL-E/Figma o un diseñador).
- Hacer photo retouching profesional.
- Escalar pixel art a mayor resolución sin pérdida.

Si me das fuente vectorial o foto en alta resolución, yo me encargo del resto (recorte, optimización, integración).
