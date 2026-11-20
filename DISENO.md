# Sistema de diseño — Desmentidor web ("Póster")

> **Fuente de verdad del diseño de la web.** Aprobado el 2026-11-20. Cualquier
> cambio visual (persona o agente) debe seguir este documento; si una decisión
> cambia, se actualiza aquí **en el mismo commit** que el código.
>
> - Implementación: `src/app/globals.css` (tokens, componentes, animaciones) y
>   `src/components/*`.
> - Maqueta aprobada (referencia visual estática): `docs/diseno-referencia/c-poster.html`
>   (ábrela en el navegador; tiene las vistas Portada, Página de video y Conclusiones).
> - Sustituye la dirección "Revista" (marfil + rojo ladrillo) de
>   `MEJORAS_DISENO_DESMENTIDOR.md`. De ese documento **siguen vigentes las reglas de
>   estructura y de conservación de contenido**; la paleta y la tipografía no.

## 0. Web y video comparten sistema

Los videos usan la plantilla **`vt-expediente-v2` "Póster"** de AI_VIDS
(`AI_VIDS/templates/vt-expediente-v2/README.md`), con los mismos tokens, tipografía,
escala de veredictos y lenguaje de movimiento que esta web. Si cambias un token aquí,
cámbialo también en `AI_VIDS/templates/remotion-base/src/expediente2/theme.ts`.

## 1. Identidad

Sale de la guía de marca de la plantilla de video (`AI_VIDS/templates/vt-desmentidor-v1`):
alto contraste, Bebas Neue para impacto, Inter para lectura, amarillo y azul solo
como acento. El lenguaje es el de las miniaturas "¿REAL O FALSO?": titulares
inclinados, sellos, bordes gruesos y sombras duras desplazadas.

**Lema:** "Desmintiendo lo viral" + "Que sea viral no significa que sea cierto."
No nombrar una sola plataforma en titulares: cubrimos TikTok, Instagram, Facebook,
YouTube y X.

### Color

| Token | Valor | Uso |
|---|---|---|
| `--ink` | `#0B0B0B` | Texto, bordes (3 px), sombras duras, cabecera |
| `--paper` | `#FFFFFF` | Fondo |
| `--wash` | `#F1F1EF` | Fondos suaves (hechos clave, imágenes vacías) |
| `--mute` | `#55554F` | Texto secundario |
| `--yellow` | `#FFC700` | **Acento de marca**: bloque del titular, subrayados, botón principal, sombras de foto |
| `--blue` | `#0077FF` | Acento secundario: barra junto al amarillo, marcas de sección, fuentes |

Reglas:
- El amarillo de marca **nunca** representa un veredicto.
- Sin degradados, sin `border-radius`, sin sombras difusas, sin emojis ni iconos
  genéricos, sin glassmorphism. Sombra = `Npx Npx 0` sólida.

### Veredictos

Escala de menos a más grave. Se aplica con el atributo `data-v="<clave>"`, que
define `--c` (color) y `--on-c` (texto encima) para ese bloque.

| Clave en datos | Etiqueta de conteo | Color | Texto encima |
|---|---|---|---|
| `green` | Mayormente (verdadero) | `#0E9F5A` verde | blanco |
| `lime` | A medias | `#F2A007` **ámbar** | tinta |
| `orange` | Con matices (engañoso / exagerado) | `#E8590C` naranja intenso | blanco |
| `red` | Falsos | `#D42A24` rojo | blanco |

- La clave `lime` es histórica (viene de `export_web.py`); su color es **ámbar**, nunca verde.
- Las 4 categorías se muestran **siempre**, en este orden, con número + etiqueta + franja.
- El color nunca va solo: siempre acompaña a una etiqueta de texto.

### Tipografía

| Rol | Fuente | Notas |
|---|---|---|
| Titulares, cifras, sellos | Bebas Neue 400 | Mayúsculas; titulares grandes con `skewX(-7deg)` (`.slant`) |
| Texto, títulos de tarjeta, etiquetas | Inter 400–800 | Etiquetas en mayúsculas, 700–800, tracking 0.05–0.08em |

Se cargan con `next/font/google` en `layout.tsx` (variables `--font-bebas`, `--font-inter`).

### Logo

`public/brand/mark-white.png` (isotipo del cerebro, fondo transparente) + la palabra
DESMENTIDOR en Bebas + barra amarilla inclinada. No usar los PNG con fondo de la guía.

### Imágenes

Miniaturas en blanco y negro con contraste alto y trama de puntos (`.thumb`, `.photo`).
En la portada, el collage usa las miniaturas de los 4 videos más recientes; no usar
fotos de stock sin licencia documentada.

## 2. Estructura (vigente desde MEJORAS_DISENO_DESMENTIDOR.md)

**Portada**
1. Cabecera: titular en dos líneas ("Desmintiendo" / "lo viral" en bloque amarillo),
   barras amarilla+azul, lema y texto. Collage + sello "VIDEOS REVISADOS".
2. Franja de 6 cifras: videos, datos, mayormente, a medias, con matices, falsos.
3. "Los videos": cuadrícula de 2 columnas (1 en móvil), **todas las tarjetas pesan
   igual**, los más recientes primero. Tarjeta: miniatura a la izquierda con sello de
   veredicto, título, cuenta · duración · nº de datos, matriz de 4 conteos.
   Sin miniatura: fondo tinta con la cita del primer dato.
4. **No** usar barra segmentada de colores para los conteos.

**Página de video**
1. Sello "VEREDICTO: …" + titular = encabezado de la conclusión; título original como
   subtítulo; meta; conteos; botones "Ver video original" e "Ir a la conclusión".
2. "Dato por dato": cada dato contraíble (cerrados al entrar). Cerrado: número,
   veredicto, tema, confianza, afirmación y avance de 2 líneas. Abierto, en orden:
   cita (resaltada en amarillo), desmentido, contexto y magnitud real, análisis,
   qué omite el video, hechos clave (2 columnas), fuentes (tarjetas).
3. Conclusión general al final, **completa y sin contraer**, coloreada con el
   veredicto general: franja superior, sello blanco "VEREDICTO: <palabra en color>",
   sombra y subrayado del titular en el color. Dos columnas en escritorio.

**Conservación de contenido:** no eliminar, resumir ni sustituir afirmaciones,
contexto, análisis, omisiones, hechos, fuentes ni conclusión.

## 3. Movimiento

Sutil, rápido (0.3–0.85 s, `cubic-bezier(.2,.8,.2,1)`), solo `transform`/`opacity`/
`clip-path`. Todo dentro de `@media (prefers-reduced-motion: no-preference)`; sin JS
o con movimiento reducido, la página se ve completa y quieta.

| Dónde | Qué |
|---|---|
| Titular portada | líneas suben desde una máscara; bloque amarillo se dibuja |
| Barras, lema, texto | se trazan / suben escalonados |
| Collage | entra desde la derecha, aparece la sombra azul, el sello cae (`a-slam`) |
| Cifras (`data-n`) | cuentan desde 0 (`components/Motion.tsx`) |
| `.rv` | aparece al entrar en pantalla (tarjetas en zigzag, sellos con rebote) |
| Abrir un dato | altura animada (grid 0fr→1fr), número se rellena con `--c`, sombra de color, `+`→`×`, cita se resalta, bloques escalonados |
| Conclusión | sello cae, subrayado del titular se dibuja |

## 4. Responsive

- ≤900 px: una columna; la miniatura del caso va arriba.
- ≤640 px: cabecera compacta (56 px), sin collage en la portada, cifras 3×2,
  conteos de tarjeta 2×2. Objetivo: **en un celular (390×660 útiles) se ve el primer
  video sin hacer scroll**.
- Ninguna sombra puede generar scroll horizontal (se compensa con `margin-right`).

## 5. Checklist antes de publicar un cambio visual

- [ ] `npm run build` sin errores y `npx eslint src` sin errores nuevos.
- [ ] Revisado en 1366×768 y 390×664: sin scroll horizontal, primer video visible en móvil.
- [ ] Veredictos con la escala de esta guía (ámbar = a medias).
- [ ] Todo el contenido de cada dato y la conclusión completa siguen visibles.
- [ ] Animaciones dentro de `prefers-reduced-motion: no-preference`.
- [ ] Si cambió una regla, actualizar este documento en el mismo commit.

## Pendiente de decisión

- Nombre único para la categoría naranja: "Con matices" (actual en conteos) o
  "Engañoso" (aparece cuando el veredicto general viene así en los datos).
