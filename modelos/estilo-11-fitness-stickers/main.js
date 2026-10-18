/* ====================================================================
   DADOS EDITÁVEIS, altere tudo por aqui
   ==================================================================== */

const TICKER = [
  "UGC de Conversão", "Criativos pra Ads", "Roteiros Virais",
  "Fotos Lifestyle", "Conteúdo E-commerce", "Consultoria UGC",
  "Reels Fitness", "Unboxing", "Review de Suplementos",
];

const BRANDS = [
  "Marca 01", "Marca 02", "Marca 03", "Marca 04", "Marca 05", "Marca 06",
  "Marca 07", "Marca 08", "Marca 09", "Marca 10", "Marca 11", "Marca 12",
];

const METRICS = [
  { num: 500, suffix: "+", label: "Vídeos produzidos" },
  { num: 200, suffix: "+", label: "Marcas atendidas" },
  { num: 100, suffix: "M+", label: "Views geradas" },
  { num: 2, suffix: " anos", label: "De experiência" },
];

const TABS = [
  { id: "todos", label: "Todos" },
  { id: "treino", label: "Treino" },
  { id: "nutricao", label: "Nutrição" },
  { id: "suplementos", label: "Suplementos" },
  { id: "moda", label: "Moda Fitness" },
  { id: "equipamentos", label: "Equipamentos" },
  { id: "lifestyle", label: "Lifestyle" },
];

const PORTFOLIO = [
  { nicho: "treino", badge: "Treino", nome: "Rotina de glúteos em casa", icon: "ic-dumbbell" },
  { nicho: "nutricao", badge: "Nutrição", nome: "Receita fit pós-treino", icon: "ic-drop" },
  { nicho: "suplementos", badge: "Suplemento", nome: "Review de whey protein", icon: "ic-shaker" },
  { nicho: "moda", badge: "Moda Fit", nome: "Try-on legging nova", icon: "ic-heart" },
  { nicho: "equipamentos", badge: "Equipamento", nome: "Unboxing kettlebell", icon: "ic-kettlebell" },
  { nicho: "lifestyle", badge: "Lifestyle", nome: "Um dia na vida fitness", icon: "ic-shoe" },
  { nicho: "treino", badge: "Treino", nome: "Desafio 30 dias de abdômen", icon: "ic-flame" },
  { nicho: "suplementos", badge: "Suplemento", nome: "Pré-treino: vale a pena?", icon: "ic-bolt" },
  { nicho: "nutricao", badge: "Nutrição", nome: "Marmita fit da semana", icon: "ic-calendar" },
  { nicho: "moda", badge: "Moda Fit", nome: "Look de academia do dia", icon: "ic-plate" },
  { nicho: "equipamentos", badge: "Equipamento", nome: "Smartwatch no treino", icon: "ic-bolt" },
  { nicho: "lifestyle", badge: "Lifestyle", nome: "Morning routine ativa", icon: "ic-heart" },
];

const SERVICES = [
  { icon: "ic-flame", title: "UGC de Conversão", desc: "Vídeos autênticos que parecem indicação de amiga e movem o seu público a comprar." },
  { icon: "ic-bolt", title: "Criativos pra Ads", desc: "Conteúdos otimizados pra rodar em tráfego pago e baixar o seu custo por aquisição." },
  { icon: "ic-calendar", title: "Roteiros", desc: "Roteiros virais baseados em trends fitness pensados pra prender nos 3 primeiros segundos." },
  { icon: "ic-heart", title: "Fotos Lifestyle", desc: "Fotos com vibe de academia e dia a dia ativo pra abastecer o seu feed e catálogo." },
  { icon: "ic-shaker", title: "Conteúdo E-commerce", desc: "Vídeos de produto, unboxing e review prontos pra página de venda e marketplace." },
  { icon: "ic-plate", title: "Consultoria UGC", desc: "Estratégia de conteúdo sob medida pra sua marca fitness escalar com criadores." },
];

const RESULTS = [
  { metric: "+100M", desc: "Views acumuladas em campanhas de marcas fitness." },
  { metric: "5,9x", desc: "ROAS médio nas campanhas de tráfego com meus criativos." },
  { metric: "+38%", desc: "De aumento na taxa de conversão em e-commerce." },
  { metric: "+2,5M", desc: "De alcance orgânico em um único reel de suplemento." },
];

const TESTIMONIALS = [
  { text: "Os vídeos da SEU NOME transformaram a nossa estratégia de ads. O ROAS subiu absurdamente.", author: "Cliente 01", niche: "Suplementos" },
  { text: "Conteúdo cheio de energia e na trend. Nosso engajamento triplicou em duas semanas.", author: "Cliente 02", niche: "Academia" },
  { text: "Profissionalismo do roteiro à entrega. Recomendo de olhos fechados pra qualquer marca fitness.", author: "Cliente 03", niche: "Moda Fitness" },
  { text: "Os reviews dela venderam mais que qualquer anúncio que já rodamos. Surreal!", author: "Cliente 04", niche: "Equipamentos" },
];

/* ====================================================================
   HELPERS
   ==================================================================== */
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const sticker = (id) => `<svg aria-hidden="true"><use href="#${id}" /></svg>`;
const ph = (icon) => `<div class="ph"><svg class="ph__icon" aria-hidden="true"><use href="#${icon}" /></svg><span class="ph__tag">VÍDEO</span></div>`;

/* ====================================================================
   RENDER: TICKER
   ==================================================================== */
function renderTicker() {
  const track = $("#tickerTrack");
  if (!track) return;
  const items = TICKER.map((t) => `<span class="ticker__item">${t}</span>`).join("");
  track.innerHTML = items + items; // duplica pra loop contínuo
}

/* ====================================================================
   RENDER: MARCAS
   ==================================================================== */
function renderBrands() {
  const track = $("#brandsTrack");
  if (!track) return;
  const chips = BRANDS.map((b) => `<span class="brand-chip">${b}</span>`).join("");
  track.innerHTML = chips + chips;
}

/* ====================================================================
   RENDER: MÉTRICAS
   ==================================================================== */
function renderMetrics() {
  const grid = $("#metricsGrid");
  if (!grid) return;
  grid.innerHTML = METRICS.map((m) => `
    <div class="metric reveal">
      <div class="metric__num" data-target="${m.num}" data-suffix="${m.suffix}">0${m.suffix}</div>
      <div class="metric__label">${m.label}</div>
    </div>`).join("");
}

function animateCount(el) {
  const target = +el.dataset.target;
  const suffix = el.dataset.suffix || "";
  const dur = 1400;
  const start = performance.now();
  function step(now) {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased) + suffix;
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ====================================================================
   RENDER: PORTFÓLIO + ABAS
   ==================================================================== */
let activeTab = "todos";

function renderTabs() {
  const wrap = $("#portfolioTabs");
  if (!wrap) return;
  wrap.innerHTML = TABS.map((t) =>
    `<button class="tab ${t.id === activeTab ? "is-active" : ""}" role="tab" data-tab="${t.id}" aria-selected="${t.id === activeTab}">${t.label}</button>`
  ).join("");
  $$(".tab", wrap).forEach((btn) => {
    btn.addEventListener("click", () => {
      activeTab = btn.dataset.tab;
      renderTabs();
      renderPortfolio();
    });
  });
}

function renderPortfolio() {
  const grid = $("#portfolioGrid");
  if (!grid) return;
  const list = activeTab === "todos" ? PORTFOLIO : PORTFOLIO.filter((p) => p.nicho === activeTab);
  grid.innerHTML = list.map((p) => `
    <article class="video-card reveal">
      <div class="video-card__thumb ph" style="border-radius:0">
        <span class="video-card__badge">${p.badge}</span>
        <svg class="ph__icon" aria-hidden="true"><use href="#${p.icon}" /></svg>
        <span class="video-card__play" aria-hidden="true"></span>
      </div>
      <div class="video-card__body">
        <h3 class="video-card__name">${p.nome}</h3>
        <p class="video-card__niche">${p.badge}</p>
      </div>
    </article>`).join("");
  revealObserve();
}

/* ====================================================================
   RENDER: SERVIÇOS
   ==================================================================== */
function renderServices() {
  const grid = $("#servicesGrid");
  if (!grid) return;
  grid.innerHTML = SERVICES.map((s) => `
    <article class="service-card reveal">
      <div class="service-card__icon">${sticker(s.icon)}</div>
      <h3 class="service-card__title">${s.title}</h3>
      <p class="service-card__desc">${s.desc}</p>
    </article>`).join("");
}

/* ====================================================================
   RENDER: RESULTADOS
   ==================================================================== */
function renderResults() {
  const grid = $("#resultsGrid");
  if (!grid) return;
  grid.innerHTML = RESULTS.map((r) => `
    <article class="result-card reveal">
      <div class="result-card__metric">${r.metric}</div>
      <p class="result-card__desc">${r.desc}</p>
    </article>`).join("");
}

/* ====================================================================
   RENDER: DEPOIMENTOS
   ==================================================================== */
function renderTestimonials() {
  const grid = $("#testimonialsGrid");
  if (!grid) return;
  grid.innerHTML = TESTIMONIALS.map((t) => `
    <article class="testimonial reveal">
      <p class="testimonial__text">${t.text}</p>
      <p class="testimonial__author">${t.author}</p>
      <p class="testimonial__niche">${t.niche}</p>
    </article>`).join("");
}

/* ====================================================================
   NAVBAR: scroll + hambúrguer
   ==================================================================== */
function initNav() {
  const nav = $("#nav");
  const burger = $("#navBurger");
  const links = $("#navLinks");

  window.addEventListener("scroll", () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 20);
  }, { passive: true });

  burger.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    burger.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  });

  $$("a", links).forEach((a) => a.addEventListener("click", () => {
    links.classList.remove("is-open");
    burger.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
  }));
}

/* ====================================================================
   INTERSECTION OBSERVERS: reveal + contador
   ==================================================================== */
let revealIO;
function revealObserve() {
  if (!revealIO) {
    revealIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          revealIO.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
  }
  $$(".reveal:not(.is-visible)").forEach((el) => revealIO.observe(el));
}

function initCounters() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        animateCount(e.target);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  $$(".metric__num").forEach((el) => io.observe(el));
}

/* ====================================================================
   FORMULÁRIOS: enviando -> enviado
   ==================================================================== */
function handleForm(form, btn, feedback, msg) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Enviando...";
    feedback.textContent = "";
    setTimeout(() => {
      btn.textContent = "Enviado!";
      feedback.textContent = msg;
      form.reset();
      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = original;
      }, 2200);
    }, 1100);
  });
}

/* ====================================================================
   MODAL DE LEAD: timer + mouseout + sessionStorage
   ==================================================================== */
function initModal() {
  const modal = $("#leadModal");
  if (!modal) return;
  const KEY = "leadShown";
  let shown = sessionStorage.getItem(KEY) === "1";

  function open() {
    if (shown) return;
    shown = true;
    sessionStorage.setItem(KEY, "1");
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
  }
  function close() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  }

  const timer = setTimeout(open, 5000);

  document.addEventListener("mouseout", (e) => {
    if (!e.relatedTarget && e.clientY <= 0) { clearTimeout(timer); open(); }
  });

  $$("[data-close]", modal).forEach((el) => el.addEventListener("click", close));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) close();
  });

  handleForm($("#modalForm"), $("#modalSubmit"), $("#modalFeedback"), "Pronto! Te enviei o guia no e-mail. 💪");
}

/* ====================================================================
   INIT
   ==================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  renderTicker();
  renderBrands();
  renderMetrics();
  renderTabs();
  renderPortfolio();
  renderServices();
  renderResults();
  renderTestimonials();

  initNav();
  initCounters();
  revealObserve();
  initModal();

  handleForm($("#contactForm"), $("#contactSubmit"), $("#contactFeedback"), "Mensagem enviada! Te respondo em breve. 🔥");

  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
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
