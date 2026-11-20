// Datos de ejemplo (ficticios) compartidos por las tres propuestas.
window.DEMO = {
  stats: { videos: 18, datos: 167, green: 31, lime: 42, orange: 61, red: 33 },
  updated: "20 nov 2026",
  videos: [
    {
      title: "La deuda externa se disparó en este gobierno y nadie lo dice",
      uploader: "cuenta_ejemplo_1", duration: 239, img: "assets/photo-desk.jpg", pos: "30% 40%",
      overall: { label: "Con matices", color: "orange" }, counts: { green: 3, lime: 4, orange: 5, red: 1 },
    },
    {
      title: "Subieron el salario mínimo pero la canasta subió el doble",
      uploader: "economia.en.1.minuto", duration: 74, img: "assets/photo-coffee.jpg", pos: "60% 50%",
      overall: { label: "Falso", color: "red" }, counts: { green: 0, lime: 1, orange: 2, red: 5 },
    },
    {
      title: "Respuesta a @usuario_demo sobre las cifras de seguridad",
      uploader: "voz_ciudadana_demo", duration: 182, img: null, quote: "«Los homicidios bajaron 40%»",
      overall: { label: "A medias", color: "lime" }, counts: { green: 2, lime: 6, orange: 2, red: 1 },
    },
    {
      title: "Lo que no te contaron del nuevo impuesto a las bebidas",
      uploader: "dato_rapido", duration: 58, img: "assets/photo-desk.jpg", pos: "80% 70%",
      overall: { label: "Mayormente verdadero", color: "green" }, counts: { green: 4, lime: 1, orange: 1, red: 0 },
    },
    {
      title: "El fondo de pensiones ya no tiene plata: explicación",
      uploader: "finanzas_para_todos", duration: 141, img: "assets/photo-coffee.jpg", pos: "20% 60%",
      overall: { label: "Con matices", color: "orange" }, counts: { green: 1, lime: 2, orange: 4, red: 1 },
    },
    {
      title: "Desempleo récord: el país está peor que en la pandemia",
      uploader: "el_cronista_demo", duration: 96, img: null, quote: "«Peor que en 2020»",
      overall: { label: "Falso", color: "red" }, counts: { green: 0, lime: 1, orange: 1, red: 3 },
    },
  ],
  detail: {
    headline: "Datos reales, lectura catastrofista",
    title: "La deuda externa se disparó en este gobierno y nadie lo dice",
    uploader: "cuenta_ejemplo_1", duration: 239, img: "assets/photo-desk.jpg",
    overall: { label: "Con matices", color: "orange" },
    counts: { green: 3, lime: 4, orange: 5, red: 1 },
    claims: [
      {
        id: 1, topic: "Economía", confidence: "media", verdict: "Exagerado", color: "orange",
        claim: "La deuda externa pasó de 180 mil millones a 250 mil millones de dólares en tres años.",
        quote: "la toma en 180 y la entrega en 250",
        summary: "La cifra de partida coincide con las fuentes (US$183.818 millones al cierre de 2023), pero la de llegada no: el dato documentado más alto es US$201.763 millones. Hay un aumento real, aunque mucho menor que el que presenta el video.",
        context: "Según el banco central, la deuda externa total cerró 2024 en US$201.763 millones, un aumento de US$17.945 millones (+9,8 %). Casi la mitad corresponde al sector privado, no al Estado.",
        analysis: "Medida como porcentaje del PIB, la deuda bajó de 54,8 % a 47,9 % en un año. El alza en dólares está inflada por la devaluación del peso.",
        omit: "No distingue deuda pública de privada ni menciona la relación deuda/PIB.",
        facts: [
          "Deuda externa total a dic. 2024: US$201.763 millones.",
          "Deuda privada: récord de US$88.568 millones.",
          "Relación deuda/PIB: de 54,8 % a 47,9 %.",
          "Máximo histórico de deuda/PIB: 57,7 % en mayo de 2021.",
        ],
        sources: [
          { host: "banrep.gov.co", title: "Boletín de deuda externa — diciembre 2024", note: "Serie oficial del stock de deuda externa pública y privada.", ref: "F1" },
          { host: "larepublica.co", title: "La deuda externa del país llegó a US$197.628 millones", note: "Cifra a octubre de 2024 y comparación interanual.", ref: "F2" },
          { host: "elcolombiano.com", title: "Deuda privada alcanza récord histórico", note: "Desglose público/privado al cierre de 2024.", ref: "F3" },
        ],
      },
      {
        id: 2, topic: "Seguridad", confidence: "alta", verdict: "Falso", color: "red",
        claim: "Los grupos armados se triplicaron desde 2022.",
        summary: "Los reportes oficiales muestran un aumento de unos 15.000 a 27.000 integrantes: casi el doble, no el triple.",
      },
      {
        id: 3, topic: "Empresas", confidence: "media", verdict: "A medias", color: "lime",
        claim: "Hubo un récord de quiebras empresariales en 2024.",
        summary: "Es cierto que las solicitudes de insolvencia marcaron récord, pero el video omite que la creación de empresas también creció.",
      },
      {
        id: 4, topic: "Salud", confidence: "alta", verdict: "Mayormente verdadero", color: "green",
        claim: "El gobierno intervino las dos EPS más grandes del país.",
        summary: "Las dos EPS con más afiliados fueron intervenidas por la Superintendencia de Salud en 2024.",
      },
    ],
    conclusion: [
      "El video construye una narrativa de colapso generalizado: un gobierno que se endeuda sin control, encarece su crédito y dispara la violencia. La acumulación de cifras produce la sensación de un deterioro sin precedentes con una sola causa.",
      "Muchos componentes tienen base real: la deuda externa aumentó, los grupos armados crecieron y hubo récord de insolvencias. Pero varias cifras están infladas y casi ninguna se presenta en proporción al tamaño de la economía.",
      "Puesto en su justa medida, el panorama es de problemas reales y medibles, no de un colapso. La conclusión del video no se sigue de sus propios datos.",
    ],
  },
};

window.fmtDur = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
window.CAT = [
  { key: "green", label: "Mayormente" },
  { key: "lime", label: "A medias" },
  { key: "orange", label: "Con matices" },
  { key: "red", label: "Falsos" },
];
window.total = (c) => c.green + c.lime + c.orange + c.red;

// Vista por hash: #portada (por defecto) o #video
window.setupViews = () => {
  const show = () => {
    const h = location.hash.slice(1);
    if (h && !document.querySelector(`[data-view="${h}"]`)) return; // ancla interna, no es una vista
    const v = h || "portada";
    document.querySelectorAll("[data-view]").forEach((el) => (el.hidden = el.dataset.view !== v));
    document.querySelectorAll("[data-tab]").forEach((el) =>
      el.setAttribute("aria-current", el.dataset.tab === v ? "page" : "false"));
    window.scrollTo(0, 0);
  };
  addEventListener("hashchange", show);
  show();
};
