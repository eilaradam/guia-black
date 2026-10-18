/* ============================================================
   DADOS, edite tudo por aqui
   ============================================================ */
const TICKER = [
  "UGC de Conversão", "Criativos pra Ads", "Roteiros que Vendem",
  "Fotos Lifestyle", "Conteúdo E-commerce", "Consultoria UGC",
  "Edição Mobile", "Direção de Cena"
];

const BRANDS = [
  "Marca 01", "Marca 02", "Marca 03", "Marca 04", "Marca 05", "Marca 06",
  "Marca 07", "Marca 08", "Marca 09", "Marca 10", "Marca 11", "Marca 12"
];

const METRICS = [
  { target: 500, suffix: "+", label: "Vídeos entregues" },
  { target: 200, suffix: "+", label: "Marcas atendidas" },
  { target: 100, suffix: "M+", label: "Views geradas" },
  { target: 2,   suffix: " anos", label: "De estrada" }
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
  { niche: "beleza", badge: "Top 10", name: "Skincare Glow", tagline: "Rotina noturna que viralizou" },
  { niche: "beleza", badge: "Novo", name: "Maquiagem 60s", tagline: "Tutorial relâmpago" },
  { niche: "gastronomia", badge: "Em alta", name: "Receita Express", tagline: "Jantar em 5 minutos" },
  { niche: "gastronomia", badge: "Top 10", name: "Unboxing Delivery", tagline: "Reação genuína" },
  { niche: "fitness", badge: "Novo", name: "Treino em Casa", tagline: "Sem equipamento" },
  { niche: "fitness", badge: "Em alta", name: "Shake Pós-Treino", tagline: "Review honesto" },
  { niche: "moda", badge: "Top 10", name: "Look do Dia", tagline: "Try-on haul" },
  { niche: "moda", badge: "Novo", name: "Provador Online", tagline: "3 peças, 3 vibes" },
  { niche: "tech", badge: "Em alta", name: "Gadget Test", tagline: "Vale a pena?" },
  { niche: "tech", badge: "Top 10", name: "Setup Tour", tagline: "Mesa dos sonhos" },
  { niche: "casa", badge: "Novo", name: "Organização", tagline: "Antes e depois" },
  { niche: "casa", badge: "Em alta", name: "Decor Hack", tagline: "Quarto renovado" }
];

const SERVICES = [
  { ic: "🎬", title: "UGC de Conversão", desc: "Vídeos autênticos pensados pra tirar o público da dúvida e levar pra compra." },
  { ic: "🚀", title: "Criativos pra Ads", desc: "Hooks fortes e variações testáveis prontas pra escalar no gerenciador." },
  { ic: "✍️", title: "Roteiros", desc: "Estrutura, gancho e CTA escritos pra plataforma e objetivo certo." },
  { ic: "📸", title: "Fotos Lifestyle", desc: "Imagens em contexto real de uso pra catálogo, feed e Ads estáticos." },
  { ic: "🛒", title: "Conteúdo E-commerce", desc: "Provas sociais, demonstrações e benefícios que aumentam a conversão." },
  { ic: "🧭", title: "Consultoria UGC", desc: "Estratégia de criadores, briefing e direção pra sua marca acertar de primeira." }
];

const RESULTS = [
  { metric: "+100M", desc: "Views acumuladas em campanhas de criadores." },
  { metric: "5,9x", desc: "ROAS médio nos criativos de melhor performance." },
  { metric: "-38%", desc: "Queda no custo por aquisição com UGC novo." },
  { metric: "+220%", desc: "Aumento de engajamento vs. conteúdo institucional." }
];

const TESTIMONIALS = [
  { text: "O vídeo virou nosso melhor criativo do trimestre. Entrega rápida e no tom exato da marca.", name: "Cliente 01", niche: "Beleza", color: "#e50914" },
  { text: "Roteiro afiado e direção impecável. O ROAS subiu logo na primeira leva de testes.", name: "Cliente 02", niche: "Tech", color: "#1f7a4d" },
  { text: "Parecia conteúdo orgânico, mas converteu como anúncio. Exatamente o que pedimos.", name: "Cliente 03", niche: "Gastronomia", color: "#3257c4" },
  { text: "Profissionalismo do briefing à entrega. Já é parceria fixa do nosso calendário.", name: "Cliente 04", niche: "Moda", color: "#b5862f" }
];

/* ============================================================
   HELPERS
   ============================================================ */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ============================================================
   TICKER
   ============================================================ */
(function buildTicker() {
  const track = $("#tickerTrack");
  const make = () => TICKER.map(t => `<span class="ticker__item">${t}</span>`).join("");
  track.innerHTML = make() + make(); // duplicado p/ loop contínuo
})();

/* ============================================================
   MARCAS (marquee)
   ============================================================ */
(function buildBrands() {
  const track = $("#brandsTrack");
  const make = () => BRANDS.map(b => `<span class="brand-chip">${b}</span>`).join("");
  track.innerHTML = make() + make();
})();

/* ============================================================
   MÉTRICAS
   ============================================================ */
(function buildMetrics() {
  const grid = $("#metricsGrid");
  grid.innerHTML = METRICS.map((m, i) => `
    <div class="metric">
      <div class="metric__num" data-target="${m.target}" data-suffix="${m.suffix}" id="metric-${i}">0</div>
      <div class="metric__label">${m.label}</div>
    </div>`).join("");
})();

function animateCount(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || "";
  if (prefersReduced) { el.textContent = target + suffix; return; }
  const dur = 1400;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = Math.round(target * eased);
    el.textContent = val + suffix;
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = target + suffix;
  }
  requestAnimationFrame(tick);
}

/* ============================================================
   PORTFÓLIO (abas + render)
   ============================================================ */
let activeTab = "todos";

(function buildTabs() {
  const wrap = $("#tabs");
  wrap.innerHTML = TABS.map(t =>
    `<button class="tab${t.id === "todos" ? " is-active" : ""}" role="tab" data-tab="${t.id}">${t.label}</button>`
  ).join("");
  wrap.addEventListener("click", e => {
    const btn = e.target.closest(".tab");
    if (!btn) return;
    activeTab = btn.dataset.tab;
    $$(".tab", wrap).forEach(b => b.classList.toggle("is-active", b === btn));
    renderPosters();
  });
})();

function renderPosters() {
  const row = $("#posterRow");
  const items = activeTab === "todos"
    ? PORTFOLIO
    : PORTFOLIO.filter(p => p.niche === activeTab);

  row.innerHTML = items.map(p => `
    <article class="poster" tabindex="0">
      <div class="ph poster__thumb">
        <div class="poster__overlay">
          <span class="poster__badge">${p.badge}</span>
          <span class="poster__name">${p.name}</span>
          <span class="poster__play">▶</span>
        </div>
        <div class="poster__tagline">${p.tagline}</div>
      </div>
    </article>`).join("");
}
renderPosters();

/* ============================================================
   SERVIÇOS
   ============================================================ */
(function buildServices() {
  $("#servicesGrid").innerHTML = SERVICES.map(s => `
    <article class="service">
      <div class="service__ic">${s.ic}</div>
      <h3 class="service__title">${s.title}</h3>
      <p class="service__desc">${s.desc}</p>
    </article>`).join("");
})();

/* ============================================================
   RESULTADOS
   ============================================================ */
(function buildResults() {
  $("#resultsGrid").innerHTML = RESULTS.map(r => `
    <article class="result">
      <div class="result__metric">${r.metric}</div>
      <p class="result__desc">${r.desc}</p>
    </article>`).join("");
})();

/* ============================================================
   DEPOIMENTOS
   ============================================================ */
(function buildTestimonials() {
  $("#testimonialsGrid").innerHTML = TESTIMONIALS.map(t => {
    const initial = t.name.replace(/[^0-9]/g, "") || t.name.charAt(0);
    return `
    <article class="testimonial">
      <p class="testimonial__text">“${t.text}”</p>
      <div class="testimonial__who">
        <div class="avatar" style="background:${t.color}">${initial}</div>
        <div>
          <div class="testimonial__name">${t.name}</div>
          <div class="testimonial__niche">${t.niche}</div>
        </div>
      </div>
    </article>`;
  }).join("");
})();

/* ============================================================
   NAVBAR: scroll + hambúrguer
   ============================================================ */
const nav = $("#nav");
const burger = $("#burger");
const navLinks = $("#navLinks");

window.addEventListener("scroll", () => {
  nav.classList.toggle("is-scrolled", window.scrollY > 20);
}, { passive: true });

burger.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  burger.setAttribute("aria-expanded", String(open));
  burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
});
navLinks.addEventListener("click", e => {
  if (e.target.tagName === "A") {
    nav.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
  }
});

/* ============================================================
   INTERSECTION OBSERVERS: reveal + contadores
   ============================================================ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      en.target.classList.add("is-visible");
      revealObserver.unobserve(en.target);
    }
  });
}, { threshold: 0.12 });
$$(".reveal").forEach(el => revealObserver.observe(el));

const countObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      $$(".metric__num", en.target).forEach(animateCount);
      obs.unobserve(en.target);
    }
  });
}, { threshold: 0.4 });
const metricsSection = $(".metrics");
if (metricsSection) countObserver.observe(metricsSection);

/* ============================================================
   FORMULÁRIOS (estado enviando → enviado)
   ============================================================ */
function handleForm(form, btn, feedback, msg) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Enviando...";
    feedback.textContent = "";
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = original;
      feedback.textContent = msg;
      form.reset();
    }, 1100);
  });
}
handleForm($("#contactForm"), $("#contactSubmit"), $("#contactFeedback"),
  "✓ Briefing enviado! Retorno em até 24h.");

/* ============================================================
   MODAL DE LEAD (5s OU mouseout · 1x por sessão)
   ============================================================ */
const modal = $("#leadModal");
let modalShown = false;

function openModal() {
  if (modalShown || sessionStorage.getItem("leadSeen")) return;
  modalShown = true;
  sessionStorage.setItem("leadSeen", "1");
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  const f = $("#lead-nome");
  if (f) f.focus();
}
function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
}

if (!sessionStorage.getItem("leadSeen")) {
  setTimeout(openModal, 5000);
  document.addEventListener("mouseout", function onLeave(e) {
    if (e.clientY <= 0 && !e.relatedTarget) {
      openModal();
      document.removeEventListener("mouseout", onLeave);
    }
  });
}

modal.addEventListener("click", e => {
  if (e.target.hasAttribute("data-close")) closeModal();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
});

handleForm($("#leadForm"), $("#leadSubmit"), $("#leadFeedback"),
  "✓ Pronto! O catálogo já está a caminho do seu e-mail.");
// fecha o modal um instante depois do sucesso
$("#leadForm").addEventListener("submit", () => {
  setTimeout(() => { if (modal.classList.contains("is-open")) closeModal(); }, 1900);
});

/* ============================================================
   ANO DO FOOTER
   ============================================================ */
$("#year").textContent = new Date().getFullYear();


/* ===== conteudos de destaque: usa o mesmo card do portfolio ===== */
(function () {
  var D = [
    { num: "+2,4M", rot: "views no reels",  titulo: "Campanha Marca 01",       nicho: "beleza", texto: "Vídeo de 30s que virou o anúncio principal." },
    { num: "+890k", rot: "views no tiktok", titulo: "Receita com Marca 02",    nicho: "comida", texto: "Receita curta gravada em casa." },
    { num: "+1,1M", rot: "views somadas",   titulo: "Antes e depois Marca 03", nicho: "casa",   texto: "O vídeo que mais converteu no ano." }
  ];
  function pinta() {
    var g = document.getElementById("hlGrid");
    var o = document.getElementById("posterRow");
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
