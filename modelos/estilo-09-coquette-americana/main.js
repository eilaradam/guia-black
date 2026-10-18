/* ░░░ Estilo 13, Coquette / americana minimalista ░░░ */
/* ──────────── DADOS (edite à vontade) ──────────── */

const TICKER = [
  "UGC de Conversão", "Criativos pra Ads", "Roteiros", "Fotos Lifestyle",
  "Conteúdo E-commerce", "Consultoria UGC", "Unboxing", "Review Honesto"
];

const BRANDS = [
  "Marca 01","Marca 02","Marca 03","Marca 04","Marca 05","Marca 06",
  "Marca 07","Marca 08","Marca 09","Marca 10","Marca 11","Marca 12"
];

const METRICS = [
  { num:500, suffix:"+", label:"vídeos entregues" },
  { num:200, suffix:"+", label:"marcas atendidas" },
  { num:100, suffix:"M+", label:"views gerados" },
  { num:2,   suffix:" anos", label:"de estrada" }
];

const TABS = [
  { id:"beleza",      label:"Beleza" },
  { id:"gastronomia", label:"Gastronomia" },
  { id:"fitness",     label:"Fitness" },
  { id:"moda",        label:"Moda" },
  { id:"tech",        label:"Tech" },
  { id:"casa",        label:"Casa & Deco" }
];

const PORTFOLIO = [
  { niche:"beleza",      ph:"a", badge:"Review",    name:"Skincare ✶",     stats:"👁 42k ♥ 3.1k" },
  { niche:"beleza",      ph:"b", badge:"GRWM",      name:"Make do dia",    stats:"👁 88k ♥ 6.4k" },
  { niche:"gastronomia", ph:"a", badge:"Receita",   name:"Café da manhã",  stats:"👁 120k ♥ 9k" },
  { niche:"gastronomia", ph:"b", badge:"Unboxing",  name:"Delivery ✶",     stats:"👁 31k ♥ 2.2k" },
  { niche:"fitness",     ph:"a", badge:"Rotina",    name:"Treino em casa", stats:"👁 56k ♥ 4.8k" },
  { niche:"fitness",     ph:"b", badge:"Ads",       name:"Suplemento",     stats:"👁 210k ♥ 12k" },
  { niche:"moda",        ph:"a", badge:"Try-on",    name:"Look do dia ✶",  stats:"👁 74k ♥ 5.9k" },
  { niche:"moda",        ph:"b", badge:"Haul",      name:"Achadinhos",     stats:"👁 99k ♥ 7.3k" },
  { niche:"tech",        ph:"a", badge:"Demo",      name:"Gadget novo",    stats:"👁 45k ♥ 3.4k" },
  { niche:"tech",        ph:"b", badge:"Review",    name:"App favorito",   stats:"👁 38k ♥ 2.9k" },
  { niche:"casa",        ph:"a", badge:"Organize",  name:"Cozinha clean",  stats:"👁 67k ♥ 5.1k" },
  { niche:"casa",        ph:"b", badge:"Deco",      name:"Cantinho aconchego", stats:"👁 52k ♥ 4.2k" }
];

const SERVICES = [
  { icon:"✦", title:"UGC de Conversão", desc:"Vídeos autênticos que parecem indicação de amiga e fazem o público clicar em comprar." },
  { icon:"✶", title:"Criativos pra Ads", desc:"Conteúdo pensado pra performar em tráfego pago, hooks fortes e CTA na medida." },
  { icon:"✷", title:"Roteiros", desc:"Estrutura de roteiro que prende nos 3 primeiros segundos e guia até a ação." },
  { icon:"✸", title:"Fotos Lifestyle", desc:"Imagens leves e reais do seu produto no dia a dia, prontas pro feed e e-commerce." },
  { icon:"✹", title:"Conteúdo E-commerce", desc:"Pacotes de vídeo e foto pensados pra página de produto e marketplaces." },
  { icon:"✺", title:"Consultoria UGC", desc:"Te ensino a montar e escalar sua operação de conteúdo com creators de verdade." }
];

const RESULTS = [
  { big:"+100M", desc:"de views somados nas campanhas que produzi." },
  { big:"5,9x",  desc:"de ROAS médio nos criativos pra ads." },
  { big:"+38%",  desc:"de conversão numa página de e-commerce." },
  { big:"+200",  desc:"marcas que voltaram pra um segundo projeto." }
];

const TESTIMONIALS = [
  { text:"O conteúdo dela vendeu mais que qualquer ad nosso. Virou parceira fixa.", who:"Cliente 01", niche:"Beleza" },
  { text:"Roteiro afiado e entrega rápida. Os criativos bombaram no tráfego.", who:"Cliente 02", niche:"Fitness" },
  { text:"Parece que ela conhece nossa marca há anos. Autenticidade pura.", who:"Cliente 03", niche:"Gastronomia" },
  { text:"Profissionalismo do briefing à entrega. Recomendo de olhos fechados.", who:"Cliente 04", niche:"Tech" }
];

/* ──────────── HELPERS ──────────── */
const $ = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => [...p.querySelectorAll(s)];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ──────────── ANO FOOTER ──────────── */
$("#year").textContent = new Date().getFullYear();

/* ──────────── TICKER ──────────── */
(function renderTicker(){
  const track = $("#tickerTrack");
  const items = [...TICKER, ...TICKER]; // duplica pra loop contínuo
  track.innerHTML = items.map(t => `<span>${t} ✶</span>`).join("");
})();

/* ──────────── MARCAS ──────────── */
(function renderBrands(){
  const track = $("#brandsTrack");
  const items = [...BRANDS, ...BRANDS];
  track.innerHTML = items.map(b => `<span class="brand-chip">${b}</span>`).join("");
})();

/* ──────────── MÉTRICAS ──────────── */
(function renderMetrics(){
  const grid = $("#metricsGrid");
  grid.innerHTML = METRICS.map((m,i) => `
    <div class="metric">
      <div class="metric__num" data-target="${m.num}" data-suffix="${m.suffix}">0${m.suffix}</div>
      <div class="metric__label">${m.label}</div>
    </div>`).join("");
})();

function animateCount(el){
  const target = +el.dataset.target;
  const suffix = el.dataset.suffix || "";
  if (reducedMotion){ el.textContent = target + suffix; return; }
  const dur = 1400, start = performance.now();
  function tick(now){
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ──────────── PORTFÓLIO (abas + filtro) ──────────── */
(function renderTabs(){
  const tabsEl = $("#portfolioTabs");
  tabsEl.innerHTML = TABS.map((t,i) =>
    `<button class="tab ${i===0?"is-active":""}" role="tab" data-tab="${t.id}">${t.label}</button>`
  ).join("");
  tabsEl.addEventListener("click", e => {
    const btn = e.target.closest(".tab");
    if (!btn) return;
    $$(".tab", tabsEl).forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    renderGrid(btn.dataset.tab);
  });
})();

function renderGrid(niche){
  const grid = $("#portfolioGrid");
  const items = PORTFOLIO.filter(p => p.niche === niche);
  grid.innerHTML = items.map(p => `
    <article class="vid-card">
      <span class="vid-card__badge">${p.badge}</span>
      <div class="ph ph--${p.ph}" role="img" aria-label="${p.name}"></div>
      <span class="vid-card__pill">${p.stats}</span>
      <p class="vid-card__name">${p.name}</p>
    </article>`).join("");
}
renderGrid(TABS[0].id);

/* ──────────── SERVIÇOS ──────────── */
(function renderServices(){
  $("#servicesGrid").innerHTML = SERVICES.map(s => `
    <article class="service">
      <div class="service__icon">${s.icon}</div>
      <h3>${s.title}</h3>
      <p>${s.desc}</p>
    </article>`).join("");
})();

/* ──────────── RESULTADOS ──────────── */
(function renderResults(){
  $("#resultsGrid").innerHTML = RESULTS.map(r => `
    <article class="result">
      <div class="result__big">${r.big}</div>
      <p class="result__desc">${r.desc}</p>
    </article>`).join("");
})();

/* ──────────── DEPOIMENTOS ──────────── */
(function renderTestimonials(){
  $("#testimonialsGrid").innerHTML = TESTIMONIALS.map(t => `
    <article class="testimonial">
      <p class="testimonial__text">${t.text}</p>
      <p class="testimonial__who">${t.who}</p>
      <p class="testimonial__niche">✶ ${t.niche}</p>
    </article>`).join("");
})();

/* ──────────── NAVBAR scroll + hambúrguer ──────────── */
const nav = $("#nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("is-scrolled", window.scrollY > 30);
}, { passive:true });

const burger = $("#navBurger");
const navLinks = $("#navLinks");
function toggleMenu(open){
  const next = open ?? !navLinks.classList.contains("is-open");
  navLinks.classList.toggle("is-open", next);
  burger.classList.toggle("is-open", next);
  burger.setAttribute("aria-expanded", String(next));
}
burger.addEventListener("click", () => toggleMenu());
$$("#navLinks a").forEach(a => a.addEventListener("click", () => toggleMenu(false)));

/* ──────────── INTERSECTION OBSERVER (reveal + contador) ──────────── */
const io = new IntersectionObserver((entries) => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.classList.add("is-visible");
    $$(".metric__num", en.target).forEach(animateCount);
    io.unobserve(en.target);
  });
}, { threshold:0.18 });

$$(".reveal").forEach(el => io.observe(el));
// observa também a seção de métricas (não tem .reveal mas precisa contar)
const metricsSection = $(".metrics");
if (metricsSection && !metricsSection.classList.contains("reveal")) io.observe(metricsSection);

/* ──────────── FORMULÁRIOS (estado enviando→enviado) ──────────── */
function handleForm(form, btn, feedback, msgOk){
  form.addEventListener("submit", e => {
    e.preventDefault();
    if (!form.checkValidity()){ form.reportValidity(); return; }
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Enviando…";
    feedback.textContent = "";
    feedback.classList.remove("is-ok");
    setTimeout(() => {
      btn.textContent = "Enviado ✶";
      feedback.textContent = msgOk;
      feedback.classList.add("is-ok");
      form.reset();
      setTimeout(() => { btn.disabled = false; btn.textContent = original; }, 2200);
    }, 1100);
  });
}
handleForm($("#contactForm"), $("#contactBtn"), $("#contactFeedback"),
  "Recebido! Te respondo rapidinho ✶");
handleForm($("#leadForm"), $("#leadBtn"), $("#leadFeedback"),
  "Pronto! O mídia kit está a caminho ✶");

/* ──────────── MODAL DE LEAD ──────────── */
const modal = $("#leadModal");
const SEEN_KEY = "leadModalSeen";

function openModal(){
  if (sessionStorage.getItem(SEEN_KEY)) return;
  sessionStorage.setItem(SEEN_KEY, "1");
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
}
function closeModal(){
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
}

if (!sessionStorage.getItem(SEEN_KEY)){
  // timer 5s
  const timer = setTimeout(openModal, 5000);
  // saída do mouse
  const onLeave = (e) => {
    if (e.clientY <= 0){ openModal(); cleanup(); }
  };
  function cleanup(){
    clearTimeout(timer);
    document.removeEventListener("mouseout", onLeave);
  }
  document.addEventListener("mouseout", onLeave);
}

$("#modalClose").addEventListener("click", closeModal);
$("#modalOverlay").addEventListener("click", closeModal);
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
});


/* ===== conteudos de destaque: usa o mesmo card do portfolio ===== */
(function () {
  var D = [
    { num: "+2,4M", rot: "views no reels",  titulo: "Campanha Marca 01",       nicho: "beleza", texto: "Vídeo de 30s que virou o anúncio principal." },
    { num: "+890k", rot: "views no tiktok", titulo: "Receita com Marca 02",    nicho: "comida", texto: "Receita curta gravada em casa." },
    { num: "+1,1M", rot: "views somadas",   titulo: "Antes e depois Marca 03", nicho: "casa",   texto: "O vídeo que mais converteu no ano." }
  ];
  function pinta() {
    var g = document.getElementById("hlGrid");
    var o = document.getElementById("portfolioGrid");
    if (!g || !o || !o.children.length) return false;
    g.innerHTML = "";
    for (var i = 0; i < 3; i++) {
      var base = o.children[i] || o.children[0];
      var c = base.cloneNode(true);
      c.classList.remove("reveal");
      c.style.opacity = "1";
      c.style.transform = "none";
      c.style.width = "100%";
      var folhas = [].slice.call(c.querySelectorAll("*")).filter(function (e) {
        return e.children.length === 0 && e.textContent.trim().length > 1;
      });
      var letras = function (s) { return (s.match(/[A-Za-zÀ-ÿ]/g) || []).length; };
      var ehBadge = function (e) { return /badge|tag|cat/i.test(e.className || ""); };
      var ehNumero = function (e) { return /\d/.test(e.textContent) && letras(e.textContent) <= 3; };
      var badges = folhas.filter(ehBadge);
      var numeros = folhas.filter(function (e) { return !ehBadge(e) && ehNumero(e); });
      var textos = folhas.filter(function (e) { return !ehBadge(e) && !ehNumero(e); });
      textos.sort(function (a, b) { return letras(b.textContent) - letras(a.textContent); });
      var t = textos[0];
      if (t) t.textContent = D[i].titulo;
      badges.forEach(function (e) { if (e !== t) e.textContent = D[i].nicho; });
      numeros.forEach(function (e) { e.textContent = D[i].num.replace("+", ""); });
      textos.slice(1).forEach(function (e) {
        if (e.textContent.trim().length > 20) { e.textContent = D[i].texto; }
        else { e.style.display = "none"; }
      });
      var moldura = document.createElement("div");
      moldura.className = "hl-card";
      moldura.appendChild(c);
      var x = document.createElement("div");
      x.className = "hl-extra";
      x.innerHTML = '<b class="hl-num">' + D[i].num + '</b><span class="hl-rot">' + D[i].rot + '</span>' +
                    (t ? '' : '<p class="hl-tit">' + D[i].titulo + '</p>');
      moldura.appendChild(x);
      g.appendChild(moldura);
    }
    return true;
  }
  if (!pinta()) {
    var n = 0, t = setInterval(function () { if (pinta() || ++n > 25) clearInterval(t); }, 120);
  }
})();


/* ===== se a pagina abriu com #destaques (ou qualquer ancora), rola de novo
   depois que tudo terminou de desenhar, senao o navegador para no lugar errado ===== */
(function () {
  if (!location.hash) return;
  function irPraAncora() {
    var alvo = document.getElementById(location.hash.slice(1));
    if (alvo) alvo.scrollIntoView();
  }
  window.addEventListener("load", function () {
    setTimeout(irPraAncora, 250);
    setTimeout(irPraAncora, 900);
  });
})();
