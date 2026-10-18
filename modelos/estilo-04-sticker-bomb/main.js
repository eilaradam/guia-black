/* ============ DADOS (edite à vontade) ============ */
const TICKER = [
  "UGC de Conversão", "Criativos pra Ads", "Roteiros que vendem",
  "Fotos Lifestyle", "Conteúdo E-commerce", "Consultoria UGC",
  "Unboxing", "Review autêntico", "Trends & Memes"
];

const BRANDS = [
  "Marca 01","Marca 02","Marca 03","Marca 04","Marca 05","Marca 06",
  "Marca 07","Marca 08","Marca 09","Marca 10","Marca 11","Marca 12"
];

const METRICS = [
  { target: 500, suffix: "+", label: "vídeos criados" },
  { target: 200, suffix: "+", label: "marcas atendidas" },
  { target: 100, suffix: "M+", label: "views geradas" },
  { target: 2,   suffix: " anos", label: "de estrada" }
];

const TABS = [
  { id: "todos",       label: "Todos" },
  { id: "beleza",      label: "Beleza" },
  { id: "gastronomia", label: "Gastronomia" },
  { id: "fitness",     label: "Fitness" },
  { id: "moda",        label: "Moda" },
  { id: "tech",        label: "Tech" },
  { id: "casa",        label: "Casa & Deco" }
];

const PORTFOLIO = [
  { niche: "beleza",      badge: "Beleza",      name: "Skincare rotina", ph: "ph-pink" },
  { niche: "beleza",      badge: "Beleza",      name: "GRWM trend",      ph: "ph-purple" },
  { niche: "gastronomia", badge: "Gastro",      name: "Receita rápida",  ph: "ph-mint" },
  { niche: "gastronomia", badge: "Gastro",      name: "Mukbang review",  ph: "ph-pink" },
  { niche: "fitness",     badge: "Fitness",     name: "Treino em casa",  ph: "ph-mint" },
  { niche: "fitness",     badge: "Fitness",     name: "Shake pós-treino",ph: "ph-purple" },
  { niche: "moda",        badge: "Moda",        name: "Try-on haul",     ph: "ph-pink" },
  { niche: "moda",        badge: "Moda",        name: "Look do dia",     ph: "ph-mint" },
  { niche: "tech",        badge: "Tech",        name: "Unboxing gadget", ph: "ph-purple" },
  { niche: "tech",        badge: "Tech",        name: "App review",      ph: "ph-pink" },
  { niche: "casa",        badge: "Casa & Deco", name: "Organização",     ph: "ph-mint" },
  { niche: "casa",        badge: "Casa & Deco", name: "Decor reveal",    ph: "ph-purple" }
];

const SERVICES = [
  { ic: "⚡", title: "UGC de Conversão", desc: "Vídeos pensados pra parar o scroll e levar ao clique. Gancho forte e CTA na medida." },
  { ic: "🎯", title: "Criativos pra Ads", desc: "Conteúdo otimizado pra performar em Meta e TikTok Ads, em várias variações." },
  { ic: "✍️", title: "Roteiros", desc: "Roteiros estratégicos com ganchos testados pra cada etapa do funil." },
  { ic: "📸", title: "Fotos Lifestyle", desc: "Imagens autênticas do produto no dia a dia, prontas pro feed e catálogo." },
  { ic: "🛒", title: "Conteúdo E-commerce", desc: "Vídeos e fotos de produto que aumentam conversão na página de venda." },
  { ic: "💡", title: "Consultoria UGC", desc: "Te ajudo a montar e escalar sua estratégia de creators e conteúdo." }
];

const RESULTS = [
  { num: "+100M", desc: "views somadas em campanhas" },
  { num: "5,9x",  desc: "ROAS médio em Ads" },
  { num: "+38%",  desc: "CTR acima da média" },
  { num: "200+",  desc: "marcas que confiaram" }
];

const TESTIMONIALS = [
  { quote: "Os vídeos viraram nossos criativos campeões. ROAS explodiu no primeiro mês.", name: "Cliente 01", niche: "beleza" },
  { quote: "Profissionalismo do briefing à entrega. Conteúdo autêntico e que converte de verdade.", name: "Cliente 02", niche: "gastronomia" },
  { quote: "Sempre cheia de ideias de trend. Nosso engajamento triplicou.", name: "Cliente 03", niche: "fitness" },
  { quote: "Entrega rápida, criativa e cheia de personalidade. Virou parceira fixa.", name: "Cliente 04", niche: "moda" }
];

/* ============ HELPERS ============ */
const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ============ TICKER ============ */
(function buildTicker(){
  const track = $("#tickerTrack");
  if (!track) return;
  const items = [...TICKER, ...TICKER]; // duplica pra loop contínuo
  track.innerHTML = items.map(t =>
    `<span><span class="zap">⚡</span> ${t}</span>`
  ).join("");
})();

/* ============ MARCAS ============ */
(function buildBrands(){
  const track = $("#brandsTrack");
  if (!track) return;
  const items = [...BRANDS, ...BRANDS];
  track.innerHTML = items.map(b => `<span class="brand-chip">${b}</span>`).join("");
})();

/* ============ MÉTRICAS ============ */
(function buildMetrics(){
  const grid = $("#metricsGrid");
  if (!grid) return;
  grid.innerHTML = METRICS.map((m, i) => `
    <div class="metric-card">
      <div class="metric-num" data-target="${m.target}" data-suffix="${m.suffix}">0${m.suffix}</div>
      <div class="metric-label">${m.label}</div>
    </div>`).join("");
})();

function animateCount(el){
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || "";
  if (reduceMotion){ el.textContent = target + suffix; return; }
  const dur = 1400;
  const start = performance.now();
  function step(now){
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = target * eased;
    const shown = Number.isInteger(target) ? Math.round(val) : val.toFixed(1);
    el.textContent = shown + suffix;
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ============ PORTFÓLIO (abas + filtro) ============ */
(function buildPortfolio(){
  const tabsEl = $("#tabs");
  const grid = $("#portGrid");
  if (!tabsEl || !grid) return;

  tabsEl.innerHTML = TABS.map((t, i) =>
    `<button class="tab${i === 0 ? " is-active" : ""}" role="tab" data-tab="${t.id}" aria-selected="${i===0}">${t.label}</button>`
  ).join("");

  function render(filter){
    const list = filter === "todos" ? PORTFOLIO : PORTFOLIO.filter(p => p.niche === filter);
    grid.innerHTML = list.map(p => `
      <article class="port-card reveal">
        <div class="port-thumb ph ${p.ph}"></div>
        <span class="port-badge">${p.badge}</span>
        <p class="port-name">${p.name}</p>
      </article>`).join("");
    observeReveal(grid);
  }

  tabsEl.addEventListener("click", e => {
    const btn = e.target.closest(".tab");
    if (!btn) return;
    $$(".tab", tabsEl).forEach(t => { t.classList.remove("is-active"); t.setAttribute("aria-selected","false"); });
    btn.classList.add("is-active");
    btn.setAttribute("aria-selected","true");
    render(btn.dataset.tab);
  });

  render("todos");
})();

/* ============ SERVIÇOS ============ */
(function buildServices(){
  const grid = $("#servicesGrid");
  if (!grid) return;
  grid.innerHTML = SERVICES.map(s => `
    <article class="service-card reveal">
      <div class="service-ic">${s.ic}</div>
      <h3>${s.title}</h3>
      <p>${s.desc}</p>
    </article>`).join("");
})();

/* ============ RESULTADOS ============ */
(function buildResults(){
  const grid = $("#resultsGrid");
  if (!grid) return;
  grid.innerHTML = RESULTS.map(r => `
    <article class="result-card reveal">
      <div class="result-num">${r.num}</div>
      <div class="result-desc">${r.desc}</div>
    </article>`).join("");
})();

/* ============ DEPOIMENTOS ============ */
(function buildTestimonials(){
  const grid = $("#testiGrid");
  if (!grid) return;
  grid.innerHTML = TESTIMONIALS.map(t => `
    <article class="testi-card reveal">
      <p class="quote">${t.quote}</p>
      <p class="testi-name">${t.name}</p>
      <p class="testi-niche">#${t.niche}</p>
    </article>`).join("");
})();

/* ============ NAVBAR scroll + hambúrguer ============ */
(function navbar(){
  const nav = $("#navbar");
  const burger = $("#hamburger");
  const links = $("#navLinks");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 30);
  });
  function close(){ links.classList.remove("is-open"); burger.classList.remove("is-open"); burger.setAttribute("aria-expanded","false"); }
  burger.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    burger.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  });
  $$("a", links).forEach(a => a.addEventListener("click", close));
})();

/* ============ SCROLL REVEAL + contador ============ */
var revealObserver, metricObserver; /* var: e chamado antes de existir */
function observeReveal(scope = document){
  if (!revealObserver) return;
  $$(".reveal:not(.is-visible)", scope).forEach(el => revealObserver.observe(el));
}
(function setupObservers(){
  if (!("IntersectionObserver" in window) || reduceMotion){
    $$(".reveal").forEach(el => el.classList.add("is-visible"));
    $$(".metric-num").forEach(animateCount);
    return;
  }
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting){ e.target.classList.add("is-visible"); revealObserver.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  observeReveal();

  metricObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting){ animateCount(e.target); metricObserver.unobserve(e.target); }
    });
  }, { threshold: 0.5 });
  $$(".metric-num").forEach(el => metricObserver.observe(el));
})();

/* ============ FORMULÁRIOS (estado simulado) ============ */
function wireForm(form, btn, feedback, msg){
  if (!form) return;
  form.addEventListener("submit", e => {
    e.preventDefault();
    if (!form.checkValidity()){ form.reportValidity(); return; }
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Enviando...";
    feedback.textContent = "";
    feedback.classList.remove("ok");
    setTimeout(() => {
      btn.textContent = original;
      btn.disabled = false;
      feedback.textContent = msg;
      feedback.classList.add("ok");
      form.reset();
    }, 1100);
  });
}
wireForm($("#contactForm"), $("#contactSubmit"), $("#contactFeedback"), "Enviado! Te respondo rapidinho ⚡");

/* ============ MODAL DE LEAD ============ */
(function leadModal(){
  const overlay = $("#leadModal");
  if (!overlay) return;
  const closeBtn = $("#leadClose");
  const SEEN = "leadModalSeen";
  let shown = false;

  function open(){
    if (shown || sessionStorage.getItem(SEEN)) return;
    shown = true;
    sessionStorage.setItem(SEEN, "1");
    overlay.hidden = false;
    const firstInput = overlay.querySelector("input");
    if (firstInput) firstInput.focus();
  }
  function close(){ overlay.hidden = true; }

  if (!sessionStorage.getItem(SEEN)){
    setTimeout(open, 5000);
    document.addEventListener("mouseout", e => {
      if (!e.relatedTarget && e.clientY <= 0) open();
    });
  }

  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", e => { if (e.target === overlay) close(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !overlay.hidden) close(); });

  wireForm($("#leadForm"), $("#leadSubmit"), $("#leadFeedback"), "Prontinho! Media kit a caminho ⚡");
})();

/* ============ ANO DO FOOTER ============ */
(function footerYear(){
  const el = $("#footCopy");
  if (el) el.textContent = `© ${new Date().getFullYear()} SEU NOME · UGC Creator · Todos os direitos reservados.`;
})();


/* ===== conteudos de destaque: usa o mesmo card do portfolio ===== */
(function () {
  var D = [
    { num: "+2,4M", rot: "views no reels",  titulo: "Campanha Marca 01",       nicho: "beleza", texto: "Vídeo de 30s que virou o anúncio principal." },
    { num: "+890k", rot: "views no tiktok", titulo: "Receita com Marca 02",    nicho: "comida", texto: "Receita curta gravada em casa." },
    { num: "+1,1M", rot: "views somadas",   titulo: "Antes e depois Marca 03", nicho: "casa",   texto: "O vídeo que mais converteu no ano." }
  ];
  function pinta() {
    var g = document.getElementById("hlGrid");
    var o = document.getElementById("portGrid");
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
