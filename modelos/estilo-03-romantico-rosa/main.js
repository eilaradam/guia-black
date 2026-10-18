/* =====================================================
   DADOS EDITÁVEIS, altere tudo por aqui ♡
   ===================================================== */

const TICKER = [
  "UGC de Conversão", "Criativos pra Ads", "Roteiros que vendem",
  "Fotos Lifestyle", "Conteúdo E-commerce", "Consultoria UGC",
  "Unboxing", "Reels", "Storytelling de marca"
];

const BRANDS = [
  "Marca 01", "Marca 02", "Marca 03", "Marca 04", "Marca 05", "Marca 06",
  "Marca 07", "Marca 08", "Marca 09", "Marca 10", "Marca 11", "Marca 12"
];

const METRICS = [
  { target: 500, suffix: "+", label: "vídeos criados" },
  { target: 200, suffix: "+", label: "marcas atendidas" },
  { target: 100, suffix: "M+", label: "views geradas" },
  { target: 2,   suffix: " anos", label: "de estrada" }
];

const TABS = [
  { id: "todos",      label: "Todos" },
  { id: "beleza",     label: "Beleza" },
  { id: "gastronomia",label: "Gastronomia" },
  { id: "fitness",    label: "Fitness" },
  { id: "moda",       label: "Moda" },
  { id: "tech",       label: "Tech" },
  { id: "casa",       label: "Casa & Deco" }
];

const PORTFOLIO = [
  { niche: "beleza",      badge: "Reels",   name: "Rotina de skincare" },
  { niche: "beleza",      badge: "UGC",     name: "Resenha de batom" },
  { niche: "gastronomia", badge: "Receita", name: "Café da manhã fofo" },
  { niche: "gastronomia", badge: "Unboxing",name: "Kit gourmet" },
  { niche: "fitness",     badge: "UGC",     name: "Treino em casa" },
  { niche: "fitness",     badge: "Ads",     name: "Shake proteico" },
  { niche: "moda",        badge: "Lookbook",name: "Look do dia" },
  { niche: "moda",        badge: "Reels",   name: "Try-on de verão" },
  { niche: "tech",        badge: "Review",  name: "Gadget novo" },
  { niche: "tech",        badge: "UGC",     name: "App de produtividade" },
  { niche: "casa",        badge: "Decor",   name: "Cantinho aconchego" },
  { niche: "casa",        badge: "Tutorial",name: "Organização de gaveta" }
];

const SERVICES = [
  { icon: "♡", title: "UGC de Conversão",   desc: "Conteúdo nativo que parece conversa de amiga e leva direto pro carrinho." },
  { icon: "✦", title: "Criativos pra Ads",  desc: "Vídeos pensados pra performar em campanhas pagas e baixar seu CPA." },
  { icon: "❀", title: "Roteiros",           desc: "Roteiros estratégicos com gancho, dor e CTA, prontos pra gravar." },
  { icon: "✿", title: "Fotos Lifestyle",    desc: "Imagens delicadas e reais do seu produto no dia a dia." },
  { icon: "♡", title: "Conteúdo E-commerce",desc: "Banco de vídeos e fotos pra abastecer site, app e marketplace." },
  { icon: "✦", title: "Consultoria UGC",    desc: "Mentoria pra sua marca rodar UGC com consistência e resultado." }
];

const RESULTS = [
  { num: "+100M", desc: "views acumuladas nos conteúdos" },
  { num: "5,9x",  desc: "ROAS médio em campanhas de UGC" },
  { num: "+38%",  desc: "de conversão vs. criativo padrão" },
  { num: "-42%",  desc: "de CPA com criativos nativos" }
];

const TESTIMONIALS = [
  { text: "Trabalhar com ela foi um sonho. O vídeo bombou e as vendas dispararam na mesma semana!", name: "Cliente 01", niche: "Beleza" },
  { text: "Entregou tudo no prazo, com um carinho absurdo. Virou nossa creator fixa.", name: "Cliente 02", niche: "Gastronomia" },
  { text: "Os criativos dela baixaram nosso CPA pela metade. Recomendo de olhos fechados.", name: "Cliente 03", niche: "Fitness" },
  { text: "Sensível, estratégica e super profissional. Cada entrega supera a expectativa.", name: "Cliente 04", niche: "Moda" }
];

/* =====================================================
   RENDER
   ===================================================== */

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

// Ticker (duplicado para loop contínuo)
function renderTicker() {
  const track = $("#ticker");
  const make = () => TICKER.map(t => `<span class="ticker__item">${t}</span>`).join("");
  track.innerHTML = make() + make();
}

// Marcas (duplicado para loop contínuo)
function renderBrands() {
  const track = $("#brandsTrack");
  const make = () => BRANDS.map(b => `<span class="chip">${b}</span>`).join("");
  track.innerHTML = make() + make();
}

// Métricas
function renderMetrics() {
  const grid = $("#metrics");
  METRICS.forEach(m => {
    const card = el("div", "metric");
    card.innerHTML = `
      <div class="metric__num" data-target="${m.target}" data-suffix="${m.suffix}">0${m.suffix}</div>
      <div class="metric__label">${m.label}</div>`;
    grid.appendChild(card);
  });
}

// Tabs + grid de portfólio
let activeTab = "todos";
function renderTabs() {
  const wrap = $("#tabs");
  TABS.forEach(t => {
    const b = el("button", "tab" + (t.id === activeTab ? " is-active" : ""), t.label);
    b.setAttribute("role", "tab");
    b.dataset.tab = t.id;
    b.addEventListener("click", () => {
      activeTab = t.id;
      wrap.querySelectorAll(".tab").forEach(x => x.classList.toggle("is-active", x.dataset.tab === t.id));
      renderPortfolio();
    });
    wrap.appendChild(b);
  });
}
function renderPortfolio() {
  const grid = $("#portfolioGrid");
  grid.innerHTML = "";
  const items = PORTFOLIO.filter(p => activeTab === "todos" || p.niche === activeTab);
  items.forEach((p, i) => {
    const card = el("article", "vcard");
    card.style.animationDelay = (i * 0.05) + "s";
    card.innerHTML = `
      <div class="vcard__thumb ph">
        <span class="vcard__badge">${p.badge}</span>
        <span class="vcard__play" aria-hidden="true">♡</span>
      </div>
      <div class="vcard__name">${p.name}</div>`;
    grid.appendChild(card);
  });
}

// Serviços
function renderServices() {
  const grid = $("#services");
  SERVICES.forEach(s => {
    const card = el("article", "service reveal");
    card.innerHTML = `
      <div class="service__icon">${s.icon}</div>
      <h3 class="service__title">${s.title}</h3>
      <p class="service__desc">${s.desc}</p>`;
    grid.appendChild(card);
  });
}

// Resultados
function renderResults() {
  const grid = $("#results");
  RESULTS.forEach(r => {
    const card = el("article", "result reveal");
    card.innerHTML = `
      <div class="result__num">${r.num}</div>
      <div class="result__desc">${r.desc}</div>`;
    grid.appendChild(card);
  });
}

// Depoimentos
function renderTestimonials() {
  const grid = $("#testimonials");
  TESTIMONIALS.forEach(t => {
    const card = el("article", "testimonial reveal");
    card.innerHTML = `
      <p class="testimonial__text">${t.text}</p>
      <div class="testimonial__who">
        <div class="testimonial__name">${t.name}</div>
        <div class="testimonial__niche">${t.niche}</div>
      </div>`;
    grid.appendChild(card);
  });
}

/* =====================================================
   INTERAÇÕES
   ===================================================== */

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Navbar scrolled
function initNavScroll() {
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 30);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

// Hambúrguer
function initBurger() {
  const burger = $("#navBurger");
  const links = $("#navLinks");
  const toggle = (open) => {
    const isOpen = open != null ? open : !links.classList.contains("is-open");
    links.classList.toggle("is-open", isOpen);
    burger.classList.toggle("is-open", isOpen);
    burger.setAttribute("aria-expanded", String(isOpen));
  };
  burger.addEventListener("click", () => toggle());
  links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => toggle(false)));
}

// Contador animado
function animateCount(node) {
  const target = parseFloat(node.dataset.target);
  const suffix = node.dataset.suffix || "";
  if (reduceMotion) { node.textContent = target + suffix; return; }
  const dur = 1600;
  const start = performance.now();
  const step = (now) => {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = target % 1 === 0 ? Math.round(target * eased) : (target * eased).toFixed(1).replace(".", ",");
    node.textContent = val + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// IntersectionObservers (reveal + métricas)
function initObservers() {
  const revealObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("is-visible"); obs.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach(n => revealObs.observe(n));

  const countObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) { animateCount(e.target); obs.unobserve(e.target); }
    });
  }, { threshold: 0.6 });
  document.querySelectorAll(".metric__num").forEach(n => countObs.observe(n));
}

// Form helper (envio simulado)
function wireForm(formId, feedbackId, msgSending, msgDone) {
  const form = $("#" + formId);
  const feedback = $("#" + feedbackId);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    feedback.classList.remove("is-ok");
    feedback.textContent = msgSending;
    const btn = form.querySelector("button[type=submit]");
    if (btn) btn.disabled = true;
    setTimeout(() => {
      feedback.textContent = msgDone;
      feedback.classList.add("is-ok");
      form.reset();
      if (btn) btn.disabled = false;
    }, 1100);
  });
}

// Modal de lead
function initModal() {
  const modal = $("#leadModal");
  if (!modal) return;
  const KEY = "leadModalSeen";
  let shown = false;

  const open = () => {
    if (shown || sessionStorage.getItem(KEY)) return;
    shown = true;
    sessionStorage.setItem(KEY, "1");
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
  };
  const close = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  };

  modal.querySelectorAll("[data-close]").forEach(b => b.addEventListener("click", close));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

  if (!sessionStorage.getItem(KEY)) {
    setTimeout(open, 5000);
    document.addEventListener("mouseout", (e) => {
      if (!e.relatedTarget && e.clientY <= 0) open();
    });
  }
}

/* =====================================================
   INIT
   ===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  renderTicker();
  renderBrands();
  renderMetrics();
  renderTabs();
  renderPortfolio();
  renderServices();
  renderResults();
  renderTestimonials();

  initNavScroll();
  initBurger();
  initObservers();
  initModal();

  wireForm("contactForm", "contactFeedback", "Enviando... ♡", "Recebido! Te respondo rapidinho ❀");
  wireForm("leadForm", "leadFeedback", "Enviando... ✦", "Prontinho! Olha seu e-mail ♡");

  const y = $("#year");
  if (y) y.textContent = new Date().getFullYear();
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
