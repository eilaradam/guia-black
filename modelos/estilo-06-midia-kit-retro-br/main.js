/* ============================================================
   DADOS EDITÁVEIS, altere tudo por aqui
   ============================================================ */

const TICKER = [
  "UGC DE CONVERSÃO",
  "CRIATIVOS PRA ADS",
  "ROTEIROS QUE VENDEM",
  "FOTOS LIFESTYLE",
  "CONTEÚDO E-COMMERCE",
  "CONSULTORIA UGC",
  "REELS & TIKTOK",
  "UNBOXING",
];

const BRANDS = [
  "Marca 01", "Marca 02", "Marca 03", "Marca 04",
  "Marca 05", "Marca 06", "Marca 07", "Marca 08",
  "Marca 09", "Marca 10", "Marca 11", "Marca 12",
];

const METRICS = [
  { value: 500, suffix: "+", label: "vídeos entregues" },
  { value: 200, suffix: "+", label: "marcas atendidas" },
  { value: 100, suffix: "M+", label: "views geradas" },
  { value: 2,   suffix: " anos", label: "de estrada" },
];

// nichos das abas
const TABS = [
  { id: "beleza",      label: "Beleza" },
  { id: "gastronomia", label: "Gastronomia" },
  { id: "fitness",     label: "Fitness" },
  { id: "moda",        label: "Moda" },
  { id: "tech",        label: "Tech" },
  { id: "casa",        label: "Casa & Deco" },
];

const PORTFOLIO = [
  { nicho: "beleza",      badge: "Reel",     nome: "Skincare 60s",        cor: "yellow" },
  { nicho: "beleza",      badge: "TikTok",   nome: "Get Ready With Me",   cor: "green"  },
  { nicho: "beleza",      badge: "Ads",      nome: "Antes & Depois",      cor: "blue"   },
  { nicho: "gastronomia", badge: "Reel",     nome: "Receita Rápida",      cor: "green"  },
  { nicho: "gastronomia", badge: "Stories",  nome: "Mukbang Lanche",      cor: "yellow" },
  { nicho: "gastronomia", badge: "Ads",      nome: "Delivery Review",     cor: "blue"   },
  { nicho: "fitness",     badge: "Reel",     nome: "Treino em Casa",      cor: "blue"   },
  { nicho: "fitness",     badge: "TikTok",   nome: "Shake Pré-Treino",    cor: "yellow" },
  { nicho: "fitness",     badge: "Ads",      nome: "Desafio 30 Dias",     cor: "green"  },
  { nicho: "moda",        badge: "Reel",     nome: "Try-On Haul",         cor: "yellow" },
  { nicho: "moda",        badge: "Lookbook", nome: "Look do Dia",         cor: "blue"   },
  { nicho: "moda",        badge: "Ads",      nome: "Coleção Verão",       cor: "green"  },
  { nicho: "tech",        badge: "Unbox",    nome: "Unboxing Gadget",     cor: "blue"   },
  { nicho: "tech",        badge: "Review",   nome: "Review Fone",         cor: "green"  },
  { nicho: "tech",        badge: "Ads",      nome: "App Walkthrough",     cor: "yellow" },
  { nicho: "casa",        badge: "Reel",     nome: "Organização Cozinha", cor: "green"  },
  { nicho: "casa",        badge: "TikTok",   nome: "Cantinho Aconchego",  cor: "yellow" },
  { nicho: "casa",        badge: "Ads",      nome: "Faxina Satisfatória", cor: "blue"   },
];

const SERVICES = [
  { icon: "▶", titulo: "UGC de Conversão",  desc: "Vídeos autênticos feitos pra converter, naturais como recomendação de amiga, estratégicos como anúncio." },
  { icon: "✦", titulo: "Criativos pra Ads", desc: "Pacotes de criativos pensados pra performar no tráfego pago, com variações pra teste A/B." },
  { icon: "✎", titulo: "Roteiros",          desc: "Roteiros que prendem nos 3 primeiros segundos e levam o público até a chamada pra ação." },
  { icon: "❂", titulo: "Fotos Lifestyle",   desc: "Imagens com cara de vida real pro feed, anúncio e e-commerce da sua marca." },
  { icon: "✚", titulo: "Conteúdo E-commerce", desc: "Vídeos e fotos de produto que vendem na página, no marketplace e nos catálogos." },
  { icon: "✸", titulo: "Consultoria UGC",   desc: "Te ajudo a montar do zero uma estratégia de conteúdo gerado por criadores pra sua marca." },
];

const RESULTS = [
  { metric: "+100M",  label: "views",        desc: "Alcance somado dos conteúdos produzidos para marcas parceiras." },
  { metric: "5,9x",   label: "ROAS",         desc: "Retorno sobre investimento em campanhas de tráfego com meus criativos." },
  { metric: "+38%",   label: "conversão",    desc: "Aumento médio na taxa de conversão das páginas com UGC." },
  { metric: "-27%",   label: "custo por lead", desc: "Redução do CPL ao trocar banner por vídeo gerado por criador." },
];

const TESTIMONIALS = [
  { texto: "Os vídeos converteram demais. Nosso ROAS subiu logo na primeira semana de campanha.", nome: "Cliente 01", nicho: "Beleza" },
  { texto: "Entrega rápida, conteúdo com cara de gente de verdade. Virou parceria fixa aqui.", nome: "Cliente 02", nicho: "Gastronomia" },
  { texto: "Os roteiros prendem do primeiro segundo. Sentimos a diferença no tempo de visualização.", nome: "Cliente 03", nicho: "Fitness" },
  { texto: "Profissionalismo do briefing à entrega. Recomendo de olhos fechados pra qualquer marca.", nome: "Cliente 04", nicho: "Moda" },
];

/* ============================================================
   HELPERS
   ============================================================ */
const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.addEventListener("DOMContentLoaded", () => {
  buildTicker();
  buildBrands();
  buildMetrics();
  buildTabs();
  buildPortfolio("beleza");
  buildServices();
  buildResults();
  buildTestimonials();
  initNavbar();
  initReveal();
  initForms();
  initLeadModal();
  $("#ano").textContent = new Date().getFullYear();
});

/* ---------- TICKER ---------- */
function buildTicker() {
  const track = $("#tickerTrack");
  const make = () =>
    TICKER.map(t => `<span class="ticker__item">${t}</span><span class="ticker__star">★</span>`).join("");
  track.innerHTML = make() + make(); // duplicado pro loop infinito
}

/* ---------- MARCAS ---------- */
function buildBrands() {
  const track = $("#brandsTrack");
  const make = () =>
    BRANDS.map(b => `<span class="brand-chip">${b}</span>`).join("");
  track.innerHTML = make() + make();
}

/* ---------- MÉTRICAS ---------- */
function buildMetrics() {
  const wrap = $("#metricsGrid");
  wrap.innerHTML = METRICS.map((m, i) => `
    <div class="metric reveal" style="--d:${i * 0.08}s">
      <div class="metric__num" data-target="${m.value}" data-suffix="${m.suffix}">0${m.suffix}</div>
      <div class="metric__label">${m.label}</div>
    </div>`).join("");

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        countUp($(".metric__num", e.target.closest(".metric")) || e.target);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  $$(".metric__num").forEach(n => obs.observe(n));
}

function countUp(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || "";
  if (reduceMotion) { el.textContent = target + suffix; return; }
  const dur = 1400;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = Math.round(target * eased);
    el.textContent = val + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ---------- ABAS PORTFÓLIO ---------- */
function buildTabs() {
  const wrap = $("#tabs");
  wrap.innerHTML = TABS.map((t, i) =>
    `<button class="tab ${i === 0 ? "is-active" : ""}" data-tab="${t.id}">${t.label}</button>`
  ).join("");

  wrap.addEventListener("click", (e) => {
    const btn = e.target.closest(".tab");
    if (!btn) return;
    $$(".tab", wrap).forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    buildPortfolio(btn.dataset.tab);
  });
}

function buildPortfolio(nicho) {
  const grid = $("#portfolioGrid");
  const items = PORTFOLIO.filter(p => p.nicho === nicho);
  grid.innerHTML = items.map((p, i) => `
    <article class="vcard reveal is-visible" style="--d:${i * 0.05}s; --rot:${(i % 2 ? 1 : -1) * (1 + (i % 3))}deg">
      <div class="vcard__thumb ph ph--${p.cor}">
        <span class="vcard__play">▶</span>
        <span class="vcard__badge">${p.badge}</span>
      </div>
      <div class="vcard__nome">${p.nome}</div>
    </article>`).join("");
}

/* ---------- SERVIÇOS ---------- */
function buildServices() {
  const wrap = $("#servicesGrid");
  wrap.innerHTML = SERVICES.map((s, i) => `
    <article class="svc reveal" style="--d:${i * 0.06}s; --rot:${(i % 2 ? 1 : -1) * 1.2}deg">
      <span class="svc__icon">${s.icon}</span>
      <h3 class="svc__titulo">${s.titulo}</h3>
      <p class="svc__desc">${s.desc}</p>
    </article>`).join("");
}

/* ---------- RESULTADOS ---------- */
function buildResults() {
  const wrap = $("#resultsGrid");
  wrap.innerHTML = RESULTS.map((r, i) => `
    <article class="res reveal" style="--d:${i * 0.07}s">
      <div class="res__metric">${r.metric}</div>
      <div class="res__sub">${r.label}</div>
      <p class="res__desc">${r.desc}</p>
    </article>`).join("");
}

/* ---------- DEPOIMENTOS ---------- */
function buildTestimonials() {
  const wrap = $("#testimonialsGrid");
  wrap.innerHTML = TESTIMONIALS.map((t, i) => `
    <article class="depo reveal" style="--d:${i * 0.07}s; --rot:${(i % 2 ? 1 : -1) * 1}deg">
      <div class="depo__aspas">”</div>
      <p class="depo__texto">${t.texto}</p>
      <div class="depo__rodape">
        <span class="depo__ava ph ph--yellow"></span>
        <span>
          <strong class="depo__nome">${t.nome}</strong>
          <span class="depo__nicho">${t.nicho}</span>
        </span>
      </div>
    </article>`).join("");
}

/* ---------- NAVBAR ---------- */
function initNavbar() {
  const nav = $("#navbar");
  const toggle = $("#hamb");
  const menu = $("#menu");

  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 30);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  $$("#menu a, #menu .btn").forEach(a =>
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
}

/* ---------- SCROLL REVEAL ---------- */
function initReveal() {
  const els = $$(".reveal");
  if (reduceMotion) { els.forEach(e => e.classList.add("is-visible")); return; }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("is-visible"); obs.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  els.forEach(e => obs.observe(e));
}

/* ---------- FORMULÁRIOS ---------- */
function initForms() {
  // form de contato
  const form = $("#contatoForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = $("button[type=submit]", form);
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Enviando...";
    setTimeout(() => {
      btn.textContent = "✓ Enviado!";
      form.reset();
      $("#contatoFeedback").textContent = "Recebido! Em breve te respondo, valeu! 🤝";
      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = original;
        $("#contatoFeedback").textContent = "";
      }, 3500);
    }, 1000);
  });
}

/* ---------- MODAL DE LEAD ---------- */
function initLeadModal() {
  const modal = $("#leadModal");
  if (!modal) return;
  const KEY = "leadShown_estilo07";
  let shown = sessionStorage.getItem(KEY) === "1";

  const open = () => {
    if (shown) return;
    shown = true;
    sessionStorage.setItem(KEY, "1");
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  };
  const close = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  };

  // timer 5s
  const timer = setTimeout(open, 5000);

  // exit intent
  const onMouseOut = (e) => {
    if (e.clientY <= 0 && !shown) { open(); clearTimeout(timer); }
  };
  document.addEventListener("mouseout", onMouseOut);

  $("#leadClose").addEventListener("click", close);
  $("#leadOverlay").addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) close();
  });

  $("#leadForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = $("button[type=submit]", $("#leadForm"));
    btn.disabled = true;
    btn.textContent = "Enviando...";
    setTimeout(() => {
      $("#leadForm").style.display = "none";
      $("#leadSuccess").style.display = "block";
      setTimeout(close, 2200);
    }, 900);
  });
}


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
