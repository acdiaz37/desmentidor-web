# Especificación de mejoras de diseño — Desmentidor

Este documento reúne las decisiones, preferencias y requisitos visuales acordados durante la revisión de Desmentidor. Sirve como referencia para seguir iterando y, más adelante, aplicar el diseño definitivo al sitio.

## Objetivo

Mejorar cómo se organiza y se lee la información que ya existe en la portada y en cada página de video. El trabajo acordado es de diseño: mantener el contenido editorial, las afirmaciones, las fuentes, las cifras y el contexto existentes. Se puede reorganizar la presentación visual para facilitar la lectura y la comparación.

La dirección visual que más gustó es la propuesta **Revista**: paleta cálida, tipografía editorial y una presentación sobria. La composición debe ayudar a entender los datos de cada video, sin hacer que un video parezca más importante que los demás.

## Dirección visual

### Paleta

- Fondo principal cálido, cercano a marfil, en lugar del gris neutro de la versión inicial.
- Superficies de tarjetas en blanco cálido para separarlas del fondo sin sombras pesadas.
- Texto principal en tinta oscura; texto auxiliar en gris cálido con contraste suficiente.
- Rojo ladrillo para la marca y los acentos editoriales, no como color decorativo general.
- Mantener los cuatro colores semánticos para los resultados: verde, lima, ámbar y rojo.
- Los colores de resultado deben ser consistentes entre cifras, etiquetas y marcadores de categoría.

### Tipografía

- Usar una serif editorial para titulares principales y cifras destacadas.
- Usar una sans serif sencilla para títulos de videos, etiquetas, metadatos y texto largo.
- Mantener una jerarquía legible: titular de página, título de video, pregunta o afirmación, etiquetas, cuerpo de análisis y notas de fuente.
- Evitar que los títulos de las tarjetas queden reducidos a tamaños minúsculos para acomodar indicadores.

### Tratamiento general

- Mantener separaciones y bordes finos para estructurar los bloques.
- Evitar sombras, adornos o coloraciones que compitan con los veredictos.
- Aplicar el mismo lenguaje visual en portada y detalle, ajustando la densidad según el tipo de información.
- Diseñar primero para lectura y comparación; la decoración acompaña a la información.

## Portada

### Encabezado y métricas

- Mantener el nombre de la marca, el título y el texto introductorio actuales.
- Usar la estética Revista en el título y en el encabezado.
- Presentar las seis métricas existentes en una franja compacta y ordenada: videos, datos, mayormente, a medias, con matices y falsos.
- Mantener los valores actuales y su significado; no convertir las métricas en nuevos indicadores.
- Evitar que las métricas ocupen más espacio o atención que la lista de videos.

### Orden de videos

- Mostrar primero los videos más nuevos y dejar los más antiguos al final.
- En el prototipo se invirtió el orden actual de la lista porque el JSON no incluye fechas de publicación.
- Para garantizar que el orden sea cronológico en producción, cada video necesita una fecha de publicación o una fecha de incorporación fiable. Hasta tener ese dato, invertir el orden existente es solo una aproximación, no una verificación cronológica.

### Tarjetas de video

- Los ocho videos deben tener el mismo peso visual. Ninguno debe aparecer como tarjeta principal, destacado editorial o pieza de mayor importancia.
- Mantener una cuadrícula uniforme en escritorio; en pantallas pequeñas, pasar a una columna.
- Usar tarjetas compactas en formato horizontal: miniatura visible a la izquierda y la información a la derecha.
- La miniatura debe ser más grande que la miniatura diminuta probada inicialmente, pero no debe aumentar tanto la altura de la tarjeta que convierta cada módulo en un bloque excesivo.
- Conservar dentro de cada tarjeta el título del video, la cuenta, la duración, el total de datos y el desglose de categorías.
- Evitar que el título se pierda frente a la miniatura o los indicadores.

### Desglose numérico por tarjeta

- No usar la barra horizontal segmentada de colores: se probó y no gustó.
- Priorizar los números para que se puedan comparar directamente entre videos.
- Mostrar las cuatro categorías de forma constante y con cifras claras: mayormente, a medias, con matices y falsos.
- Organizar los conteos en una matriz compacta de dos filas, con números y etiquetas legibles.
- Marcar cada grupo con una franja o acento del color correspondiente al resultado; el color sirve para identificar la categoría y el número comunica la cantidad.
- Evitar recurrir a muchos puntos pequeños como mecanismo principal para explicar la distribución.
- Mantener el total de datos por video visible, sin que se confunda con los conteos parciales.

### Veredicto general de tarjeta

- Cada tarjeta debe tener una etiqueta visible para su veredicto general.
- Para los videos con veredicto explícito, usar ese resultado explícito.
- En los demás casos, el prototipo muestra la categoría que más se repite entre los datos del video. Esa regla es una inferencia visual basada en los conteos, no un veredicto editorial explícito en los datos.
- Si se conserva esta inferencia, evitar presentarla como una conclusión más precisa de lo que permiten los datos. Como alternativa futura, añadir un campo explícito de veredicto por video cuando el criterio editorial esté definido.
- El color de la etiqueta debe corresponder con el resultado que comunica.

### Elementos que no deben volver

- No destacar un solo video con una tarjeta más grande: el usuario indicó que todos son importantes.
- No usar la barra de colores para resumir los conteos.
- No reducir la miniatura a un icono o cuadro pequeño.
- No aumentar tanto la altura de las tarjetas que cada video ocupe un módulo visual desproporcionado.

## Página de cada video

### Cuadro principal

- El cuadro superior debe usar como titular el resultado o encabezado de la conclusión general.
- El título original del video debe conservarse debajo como subtítulo, para que siga siendo identificable.
- La miniatura, la cuenta, la duración y el enlace al video original también deben permanecer disponibles.
- Los conteos de las cuatro categorías se presentan en una fila o cuadrícula compacta dentro del cuadro principal.
- Usar el mismo lenguaje visual de Revista, con el resultado general y la información de origen claramente diferenciados.

### Conclusión general

- La conclusión completa se mantiene al final de la página; no trasladarla permanentemente al encabezado ni sustituirla por un resumen.
- El titular de la conclusión puede reutilizarse en el encabezado principal, pero el cuerpo completo debe seguir apareciendo una sola vez en su sección final.
- La conclusión no debe ser contraíble. Todo su texto debe quedar visible sin una interacción adicional.
- Mejorar la presentación sin recortar ni resumir el texto: título editorial claro, ancho de lectura cómodo, espaciado entre párrafos y panel diferenciado del resto de la página.
- En pantallas grandes puede organizarse en dos columnas si los párrafos se mantienen completos y el flujo de lectura es natural; en móvil debe volver a una sola columna.
- Evitar el gran bloque oscuro que hacía que la conclusión pareciera pesada. Se prefiere un fondo cálido y claro, borde sutil y acento rojo discreto.
- No insertar el texto completo de la conclusión en el cuadro superior. El encabezado contiene el título; el cuerpo queda al final.

### Lista de afirmaciones y análisis

- Mantener todas las afirmaciones detectadas y todo el contenido asociado a cada una.
- Cada afirmación debe ser contraíble para que la página no presente de golpe todo el texto extenso.
- En estado cerrado, mostrar suficiente información para decidir si abrirla:
  - Número de la afirmación.
  - Etiqueta de veredicto y color asociado.
  - Tema y confianza, cuando existan.
  - Texto completo de la afirmación.
  - Vista previa breve del desmentido, sin reemplazar el texto completo.
- En estado abierto, conservar y mostrar todos los campos existentes, con esta jerarquía visual:
  1. Cita textual del video, si existe.
  2. Desmentido o resumen.
  3. Contexto y magnitud real.
  4. Análisis o perspectiva, si existe.
  5. Qué omite el video, si existe.
  6. Hechos clave.
  7. Fuentes.
- Separar las secciones con títulos visibles, espacio suficiente y fondos suaves. El texto largo debe conservar una línea de lectura cómoda.
- El veredicto debe destacar sin convertir toda la tarjeta en un bloque saturado del color correspondiente.
- No mostrar todas las tarjetas expandidas por defecto: al entrar, la lista debe poder recorrerse y leerse rápidamente.
- La interacción de abrir y cerrar debe ser clara y el indicador visual debe cambiar de orientación o estado al abrir.

### Hechos clave

- Conservar todos los hechos existentes.
- Usar una lista con buena separación; en escritorio se puede distribuir en dos columnas si mejora el escaneo.
- Mantener un marcador discreto asociado al color del veredicto de esa afirmación.
- En móvil, apilar los hechos en una columna.

### Fuentes

- Conservar todas las fuentes y enlaces.
- Presentarlas como tarjetas legibles, no solo como miniaturas.
- Mantener disponibles el medio o dominio, título, nota descriptiva y referencia cuando exista.
- Mostrar miniaturas cuando haya imagen, pero limitar su tamaño para que el nombre y la nota de la fuente sigan teniendo prioridad.
- Si no hay imagen, mostrar un reemplazo sobrio con el nombre del medio o dominio.
- Mantener el enlace a la fuente como acción reconocible y abrirlo de forma segura en una pestaña nueva.
- No ocultar las notas de las fuentes cuando también exista un título.

## Conservación de contenido

- No eliminar, resumir ni sustituir afirmaciones, contexto, perspectivas, omisiones, hechos clave, notas de fuente ni conclusión.
- Se permite cambiar el orden visual para mejorar la lectura, siempre que el contenido siga accesible y completo.
- Contraer significa ocultar temporalmente el contenido bajo una interacción reversible; no significa eliminarlo.
- No añadir nuevas afirmaciones o conclusiones editoriales como parte del rediseño.
- Los totales, etiquetas y conteos deben seguir representando los mismos datos existentes.
- Cualquier etiqueta general derivada de una distribución debe entenderse como una regla de presentación; no presentarla como dato explícito sin respaldo editorial.

## Adaptación a pantallas

- En escritorio, usar la cuadrícula de tarjetas de portada y matrices de conteos con espacio suficiente.
- En tablet, reducir columnas y espacios de forma gradual sin recortar etiquetas ni números.
- En móvil, usar una columna, conservar las miniaturas reconocibles y evitar que las cuatro categorías queden demasiado estrechas.
- Los textos largos, fuentes y hechos clave deben reacomodarse sin desbordamiento horizontal.
- Mantener legibles los controles de expansión, etiquetas, enlaces y estados de foco.

## Referencias de prototipos

- Portada con cifras numéricas y tarjetas compactas: `public/propuestas/09-datos-numericos.html`.
- Página de detalle iterada con el primer video real: `/propuesta-detalle`, implementada en `src/app/propuesta-detalle/page.tsx`.
- La ruta de detalle es una muestra de diseño para revisión; antes de adoptarla como página definitiva, comprobar su integración con la navegación y el resto del sitio.

## Criterios de aceptación para la siguiente iteración

- La portada conserva el diseño Revista y presenta todos los videos con igual jerarquía.
- Los conteos numéricos son el recurso principal para comparar categorías; no aparece una barra segmentada.
- Cada categoría tiene una marca de color consistente y su número permanece legible.
- Cada tarjeta muestra un veredicto general claramente diferenciado de los conteos individuales.
- La imagen es visible y reconocible, y el módulo de video mantiene una altura compacta.
- En el detalle, el titular superior corresponde al resultado de la conclusión y el título del video sigue visible como subtítulo.
- La conclusión completa aparece al final, siempre visible y mejor organizada.
- Las afirmaciones permanecen contraíbles; al abrir una, se puede consultar todo el contenido asociado.
- Las fuentes mantienen título, medio, nota, referencia e imagen cuando esos datos existen.
- No se pierde contenido en ninguna anchura de pantalla.
