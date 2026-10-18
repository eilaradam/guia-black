/* ============================================================
   Estilo 6, Scrapbook verde brasileirinho · main.js (vanilla)
   ============================================================ */

/* ---------------- DADOS (editáveis) ---------------- */
const TICKER = [
  "UGC de Conversão", "Criativos pra Ads", "Roteiros", "Fotos Lifestyle",
  "Conteúdo E-commerce", "Consultoria UGC", "Vídeos pra Reels", "Unboxing"
];

const BRANDS = [
  "Marca 01", "Marca 02", "Marca 03", "Marca 04", "Marca 05", "Marca 06",
  "Marca 07", "Marca 08", "Marca 09", "Marca 10", "Marca 11", "Marca 12"
];

const METRICS = [
  { value: 500, suffix: "+", label: "vídeos entregues" },
  { value: 200, suffix: "+", label: "marcas atendidas" },
  { value: 100, suffix: "M+", label: "views gerados" },
  { value: 2,   suffix: " anos", label: "de estrada" }
];

const TABS = [
  { id: "todos", label: "Todos" },
  { id: "beleza", label: "Beleza" },
  { id: "gastronomia", label: "Gastronomia" },
  { id: "fitness", label: "Fitness" },
  { id: "moda", label: "Moda" },
  { id: "tech", label: "Tech" },
  { id: "casa", label: "Casa & Deco" }
];

const PORTFOLIO = [
  { name: "Skincare matinal",     niche: "beleza",      badge: "Reels" },
  { name: "Batom em 3 cores",     niche: "beleza",      badge: "UGC" },
  { name: "Receita de 5 min",     niche: "gastronomia", badge: "TikTok" },
  { name: "Unboxing café",        niche: "gastronomia", badge: "Ads" },
  { name: "Treino em casa",       niche: "fitness",     badge: "Reels" },
  { name: "Whey review",          niche: "fitness",     badge: "UGC" },
  { name: "Look do dia",          niche: "moda",        badge: "Reels" },
  { name: "Try-on outono",        niche: "moda",        badge: "TikTok" },
  { name: "App em teste",         niche: "tech",        badge: "Ads" },
  { name: "Setup gadget",         niche: "tech",        badge: "UGC" },
  { name: "Decor de quarto",      niche: "casa",        badge: "Reels" },
  { name: "Organização cozinha",  niche: "casa",        badge: "UGC" }
];

const SERVICES = [
  { icon: "🎯", title: "UGC de Conversão",   desc: "Vídeos pensados pra vender, gancho forte, prova e chamada pra ação que funciona." },
  { icon: "🚀", title: "Criativos pra Ads",   desc: "Peças no formato certo pra rodar tráfego pago e escalar resultado sem cansar a audiência." },
  { icon: "📝", title: "Roteiros",            desc: "Roteiro estratégico do gancho ao CTA, alinhado ao tom da sua marca e do nicho." },
  { icon: "📸", title: "Fotos Lifestyle",     desc: "Imagens de produto em uso real, naturais e prontas pra feed, site e catálogo." },
  { icon: "🛒", title: "Conteúdo E-commerce", desc: "Vídeos e fotos pra página de produto que tiram dúvida e aumentam a conversão." },
  { icon: "💡", title: "Consultoria UGC",     desc: "Te ajudo a montar estratégia, briefing e banco de criativos pra sua marca decolar." }
];

const RESULTS = [
  { big: "+100M", desc: "views somados nas campanhas" },
  { big: "5,9x",  desc: "ROAS médio em ads com meus criativos" },
  { big: "+38%",  desc: "de conversão na página de produto" },
  { big: "-27%",  desc: "no custo por aquisição (CPA)" }
];

const TESTIMONIALS = [
  { text: "Os vídeos pararam o scroll e venderam de verdade. Parecia indicação de amiga!", who: "Cliente 01", role: "Beleza" },
  { text: "ROAS subiu logo na primeira leva de criativos. Virou parceira fixa da marca.", who: "Cliente 02", role: "Tech" },
  { text: "Entrega rápida, roteiro afiado e zero cara de propaganda. Recomendo demais.", who: "Cliente 03", role: "Gastronomia" },
  { text: "Conteúdo natural que conversou com a nossa audiência. Resultado acima da meta.", who: "Cliente 04", role: "Moda" }
];

const ABOUT_TAGS = ["Roteiro", "Gravação", "Edição", "Reels & TikTok", "Ads Criativos", "Foto Lifestyle"];

/* ---------------- helpers ---------------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------------- TICKER ---------------- */
function buildTicker() {
  const track = $("#tickerTrack");
  if (!track) return;
  const make = () => TICKER.map(t =>
    `<span class="ticker__item">${t}<span class="sep">✦</span></span>`
  ).join("");
  track.innerHTML = make() + make(); // duplica p/ loop infinito
}

/* ---------------- MARCAS ---------------- */
function buildBrands() {
  const track = $("#brandsTrack");
  if (!track) return;
  const make = () => BRANDS.map(b => `<span class="brand-chip">${b}</span>`).join("");
  track.innerHTML = make() + make();
}

/* ---------------- SOBRE: tags ---------------- */
function buildAboutTags() {
  const ul = $("#aboutTags");
  if (!ul) return;
  ul.innerHTML = ABOUT_TAGS.map(t => `<li>${t}</li>`).join("");
}

/* ---------------- MÉTRICAS ---------------- */
function buildMetrics() {
  const grid = $("#metricsGrid");
  if (!grid) return;
  grid.innerHTML = METRICS.map((m, i) => `
    <div class="metric-card reveal">
      <span class="star">✦</span>
      <div class="metric-card__num"><span class="count" data-target="${m.value}">0</span><span class="metric-card__suf">${m.suffix}</span></div>
      <div class="metric-card__label">${m.label}</div>
    </div>`).join("");
}

function animateCount(el) {
  const target = parseInt(el.dataset.target, 10);
  if (reduceMotion) { el.textContent = target; return; }
  const dur = 1400;
  const start = performance.now();
  function step(now) {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased);
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

/* ---------------- PORTFÓLIO ---------------- */
let activeTab = "todos";

function buildTabs() {
  const wrap = $("#tabs");
  if (!wrap) return;
  wrap.innerHTML = TABS.map(t =>
    `<button class="tab${t.id === activeTab ? " is-active" : ""}" role="tab" data-tab="${t.id}" aria-selected="${t.id === activeTab}">${t.label}</button>`
  ).join("");
  $$(".tab", wrap).forEach(btn => {
    btn.addEventListener("click", () => {
      activeTab = btn.dataset.tab;
      $$(".tab", wrap).forEach(b => {
        const on = b.dataset.tab === activeTab;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-selected", on);
      });
      renderPortfolio();
    });
  });
}

function renderPortfolio() {
  const grid = $("#portfolioGrid");
  if (!grid) return;
  const items = PORTFOLIO.filter(p => activeTab === "todos" || p.niche === activeTab);
  grid.innerHTML = items.map(p => `
    <article class="video-card reveal">
      <div class="ph video-card__thumb">
        <span class="video-card__badge">${p.badge}</span>
        <span class="video-card__play" aria-hidden="true">▶</span>
      </div>
      <p class="video-card__name">${p.name}</p>
    </article>`).join("");
  observeReveals(grid);
}

/* ---------------- SERVIÇOS ---------------- */
function buildServices() {
  const grid = $("#servicesGrid");
  if (!grid) return;
  grid.innerHTML = SERVICES.map(s => `
    <article class="service-card reveal">
      <div class="service-card__ic" aria-hidden="true">${s.icon}</div>
      <h3 class="service-card__title">${s.title}</h3>
      <p class="service-card__desc">${s.desc}</p>
    </article>`).join("");
}

/* ---------------- RESULTADOS ---------------- */
function buildResults() {
  const grid = $("#resultsGrid");
  if (!grid) return;
  grid.innerHTML = RESULTS.map(r => `
    <article class="result-card reveal">
      <div class="result-card__big">${r.big}</div>
      <p class="result-card__desc">${r.desc}</p>
    </article>`).join("");
}

/* ---------------- DEPOIMENTOS ---------------- */
function buildTestimonials() {
  const grid = $("#testimonialsGrid");
  if (!grid) return;
  grid.innerHTML = TESTIMONIALS.map(t => `
    <article class="postit reveal">
      <span class="tape" aria-hidden="true"></span>
      <div class="postit__stars" aria-label="5 estrelas">★★★★★</div>
      <p class="postit__text">“${t.text}”</p>
      <p class="postit__who">${t.who}</p>
      <p class="postit__role">${t.role}</p>
    </article>`).join("");
}

/* ---------------- NAVBAR scroll + hambúrguer ---------------- */
function initNav() {
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 20);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const burger = $("#hamburger");
  const links = $("#navLinks");
  const toggle = (open) => {
    const isOpen = open ?? !links.classList.contains("is-open");
    links.classList.toggle("is-open", isOpen);
    burger.classList.toggle("is-open", isOpen);
    burger.setAttribute("aria-expanded", isOpen);
    burger.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  };
  burger.addEventListener("click", () => toggle());
  $$("#navLinks a").forEach(a => a.addEventListener("click", () => toggle(false)));
}

/* ---------------- SCROLL REVEAL + contador ---------------- */
const revealObserver = ("IntersectionObserver" in window)
  ? new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-visible");
        $$(".count", e.target).forEach(c => {
          if (!c.dataset.done) { c.dataset.done = "1"; animateCount(c); }
        });
        obs.unobserve(e.target);
      });
    }, { threshold: 0.18 })
  : null;

function observeReveals(root = document) {
  const els = $$(".reveal", root);
  if (!revealObserver) { els.forEach(el => el.classList.add("is-visible")); return; }
  els.forEach(el => { if (!el.classList.contains("is-visible")) revealObserver.observe(el); });
}

/* ---------------- FORMULÁRIOS (simulado) ---------------- */
function handleForm(form, btn, feedback) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Enviando...";
    feedback.textContent = "";
    setTimeout(() => {
      btn.textContent = "Enviado! ✦";
      feedback.textContent = "Recebi sua mensagem, te respondo rapidinho 💚";
      form.reset();
      setTimeout(() => { btn.disabled = false; btn.textContent = original; }, 2200);
    }, 900);
  });
}

function initForms() {
  const cForm = $("#contactForm");
  if (cForm) handleForm(cForm, $("#contactSubmit"), $("#contactFeedback"));
}

/* ---------------- MODAL DE LEAD ---------------- */
function initModal() {
  const modal = $("#leadModal");
  if (!modal) return;
  const KEY = "leadModalShown";
  let shown = false;

  const open = () => {
    if (shown || sessionStorage.getItem(KEY)) return;
    shown = true;
    sessionStorage.setItem(KEY, "1");
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    const first = modal.querySelector("input");
    if (first) first.focus();
  };
  const close = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  };

  // timer 5s
  if (!sessionStorage.getItem(KEY)) {
    setTimeout(open, 5000);
  }
  // saída do mouse
  document.addEventListener("mouseout", (e) => {
    if (e.clientY <= 0 && !e.relatedTarget) open();
  });

  modal.querySelectorAll("[data-close]").forEach(el => el.addEventListener("click", close));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) close();
  });

  const lForm = $("#leadForm");
  const lFeedback = $("#leadFeedback");
  if (lForm) {
    lForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!lForm.checkValidity()) { lForm.reportValidity(); return; }
      lFeedback.textContent = "Prontinho! Te envio o kit no e-mail 💚";
      lForm.reset();
      setTimeout(close, 1600);
    });
  }
}

/* ---------------- INIT ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  buildTicker();
  buildBrands();
  buildAboutTags();
  buildMetrics();
  buildTabs();
  renderPortfolio();
  buildServices();
  buildResults();
  buildTestimonials();

  initNav();
  initForms();
  initModal();

  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  observeReveals(document);
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
