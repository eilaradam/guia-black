/* =========================================================
   ESTILO 3, Retrô Y2K / desktop scrapbook · main.js (vanilla)
   Edite os ARRAYS abaixo para trocar o conteúdo.
   ========================================================= */

/* ---------- DADOS (edite aqui) ---------- */
const TICKER = [
  "UGC de Conversão", "Criativos pra Ads", "Roteiros que vendem",
  "Fotos Lifestyle", "Conteúdo E-commerce", "Consultoria UGC",
];

const BRANDS = Array.from({ length: 12 }, (_, i) => `Marca ${String(i + 1).padStart(2, "0")}`);

const METRICS = [
  { num: 500, suffix: "+", label: "vídeos" },
  { num: 200, suffix: "+", label: "marcas" },
  { num: 100, suffix: "M+", label: "views" },
  { num: 2,   suffix: " anos", label: "de estrada" },
];

const PORTFOLIO = [
  { cat: "beleza", name: "Skincare noturno", badge: "Beleza" },
  { cat: "beleza", name: "Rotina de make", badge: "Beleza" },
  { cat: "gastronomia", name: "Receita 30s", badge: "Food" },
  { cat: "gastronomia", name: "Unboxing café", badge: "Food" },
  { cat: "fitness", name: "Treino em casa", badge: "Fitness" },
  { cat: "fitness", name: "Shake pós-treino", badge: "Fitness" },
  { cat: "moda", name: "Look do dia", badge: "Moda" },
  { cat: "moda", name: "Try-on haul", badge: "Moda" },
  { cat: "tech", name: "Review gadget", badge: "Tech" },
  { cat: "tech", name: "Setup desk", badge: "Tech" },
  { cat: "casa", name: "Organização closet", badge: "Casa & Deco" },
  { cat: "casa", name: "Faxina aesthetic", badge: "Casa & Deco" },
];

const TABS = [
  { id: "todos", label: "Todos ✨" },
  { id: "beleza", label: "Beleza" },
  { id: "gastronomia", label: "Gastronomia" },
  { id: "fitness", label: "Fitness" },
  { id: "moda", label: "Moda" },
  { id: "tech", label: "Tech" },
  { id: "casa", label: "Casa & Deco" },
];

const SERVICES = [
  { icon: "🎯", title: "UGC de Conversão", desc: "Vídeos pensados pra vender, com gancho, prova e CTA que funcionam." },
  { icon: "🚀", title: "Criativos pra Ads", desc: "Variações de criativos prontos pra rodar e escalar no tráfego pago." },
  { icon: "✍️", title: "Roteiros", desc: "Roteiros estratégicos que prendem nos 3 primeiros segundos." },
  { icon: "📸", title: "Fotos Lifestyle", desc: "Imagens autênticas do produto no dia a dia, prontas pro feed." },
  { icon: "🛒", title: "Conteúdo E-commerce", desc: "Provas sociais e demonstrações que reduzem objeção e devolução." },
  { icon: "💡", title: "Consultoria UGC", desc: "Mentoria pra sua marca estruturar uma esteira de conteúdo que escala." },
];

const RESULTS = [
  { num: "+100M", desc: "de views somados em campanhas com criadores." },
  { num: "5,9x", desc: "de ROAS médio nos criativos campeões." },
  { num: "-32%", desc: "no custo por aquisição após trocar pra UGC." },
  { num: "4,9★", desc: "de satisfação média das marcas." },
];

const TESTIMONIALS = [
  { text: "Os vídeos performaram melhor que toda a nossa produção interna. Virou nosso criativo campeão!", name: "Cliente 01", niche: "Beleza" },
  { text: "Profissionalismo absurdo. Entrega no prazo, roteiro afiado e resultado em vendas.", name: "Cliente 02", niche: "Gastronomia" },
  { text: "Traduziu a alma da marca em 15 segundos. Recomendo de olhos fechados!", name: "Cliente 03", niche: "Moda" },
];

const GRADIENTS = [
  "linear-gradient(135deg,#ff4fb0,#b794ff)",
  "linear-gradient(135deg,#ffe24d,#ff4fb0)",
  "linear-gradient(135deg,#b6ff5c,#aee0ff)",
  "linear-gradient(135deg,#b794ff,#ffe24d)",
  "linear-gradient(135deg,#aee0ff,#ff4fb0)",
];
const grad = (i) => GRADIENTS[i % GRADIENTS.length];

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

/* ---------- Render ---------- */
function renderTicker() { const i = TICKER.map((t) => `<span>${t}</span>`).join(""); $("#ticker").innerHTML = i + i; }
function renderBrands() { const c = BRANDS.map((b) => `<span class="brand-chip">${b}</span>`).join(""); $("#brands").innerHTML = c + c; }
function renderMetrics() {
  $("#metrics").innerHTML = METRICS.map((m) => `
    <div class="metric reveal">
      <div class="metric__num" data-target="${m.num}" data-suffix="${m.suffix}">0${m.suffix}</div>
      <div class="metric__label">${m.label}</div>
    </div>`).join("");
}
function renderTabs() {
  $("#tabs").innerHTML = TABS.map((t, i) => `<button class="tab ${i === 0 ? "is-active" : ""}" role="tab" data-cat="${t.id}">${t.label}</button>`).join("");
}
function renderPortfolio(cat = "todos") {
  const list = cat === "todos" ? PORTFOLIO : PORTFOLIO.filter((p) => p.cat === cat);
  $("#portfolioGrid").innerHTML = list.map((p, i) => `
    <article class="video-card reveal">
      <div class="video-card__thumb ph" style="background:${grad(i)}">
        <span class="video-card__badge">${p.badge}</span>
        <span class="video-card__play">▶</span>
      </div>
      <p class="video-card__name">${p.name}</p>
    </article>`).join("");
  observeReveals();
}
function renderServices() {
  $("#services").innerHTML = SERVICES.map((s) => `
    <article class="service reveal">
      <div class="service__icon">${s.icon}</div>
      <h3 class="service__title">${s.title}</h3>
      <p class="service__desc">${s.desc}</p>
    </article>`).join("");
}
function renderResults() {
  $("#results").innerHTML = RESULTS.map((r) => `
    <article class="result reveal">
      <div class="result__num">${r.num}</div>
      <p class="result__desc">${r.desc}</p>
    </article>`).join("");
}
function renderTestimonials() {
  $("#testimonials").innerHTML = TESTIMONIALS.map((t, i) => `
    <article class="testimonial reveal">
      <p class="testimonial__text">“${t.text}”</p>
      <div class="testimonial__who">
        <span class="testimonial__avatar ph" style="background:${grad(i + 1)}"></span>
        <span>
          <span class="testimonial__name">${t.name}</span><br />
          <span class="testimonial__niche">${t.niche}</span>
        </span>
      </div>
    </article>`).join("");
}

/* ---------- Relógio real ---------- */
function initClock() {
  const el = $("#clock");
  const tick = () => {
    const d = new Date();
    const p = (n) => String(n).padStart(2, "0");
    el.textContent = `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
  };
  tick();
  setInterval(tick, 1000);
}

/* ---------- Menu (mobile) ---------- */
function initNav() {
  const burger = $("#navBurger"), menu = $("#navLinks");
  burger.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", open);
  });
  $$("#navLinks a").forEach((a) => a.addEventListener("click", () => menu.classList.remove("is-open")));
}

/* ---------- Drag (mouse + touch) ---------- */
function initDrag() {
  let zTop = 10;
  $$("[data-drag]").forEach((el) => {
    let startX, startY, baseX, baseY, dragging = false;

    const point = (e) => e.touches ? e.touches[0] : e;
    const down = (e) => {
      dragging = true;
      el.style.zIndex = ++zTop;
      const p = point(e);
      const rect = el.getBoundingClientRect();
      const parent = el.offsetParent.getBoundingClientRect();
      baseX = rect.left - parent.left;
      baseY = rect.top - parent.top;
      // fixa posição em px e remove ancoragem right/bottom
      el.style.left = baseX + "px";
      el.style.top = baseY + "px";
      el.style.right = "auto";
      el.style.bottom = "auto";
      startX = p.clientX; startY = p.clientY;
      el.style.cursor = "grabbing";
      if (e.cancelable) e.preventDefault();
    };
    const move = (e) => {
      if (!dragging) return;
      const p = point(e);
      el.style.left = baseX + (p.clientX - startX) + "px";
      el.style.top = baseY + (p.clientY - startY) + "px";
      if (e.cancelable) e.preventDefault();
    };
    const up = () => { dragging = false; el.style.cursor = "grab"; };

    el.addEventListener("mousedown", down);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    el.addEventListener("touchstart", down, { passive: false });
    window.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("touchend", up);
  });
}

/* ---------- Tabs ---------- */
function initTabs() {
  $("#tabs").addEventListener("click", (e) => {
    const btn = e.target.closest(".tab");
    if (!btn) return;
    $$(".tab").forEach((t) => t.classList.remove("is-active"));
    btn.classList.add("is-active");
    renderPortfolio(btn.dataset.cat);
  });
}

/* ---------- Counters ---------- */
function animateCount(el) {
  const target = +el.dataset.target, suffix = el.dataset.suffix || "", dur = 1500, start = performance.now();
  const step = (now) => {
    const pr = Math.min((now - start) / dur, 1), eased = 1 - Math.pow(1 - pr, 3);
    el.textContent = Math.round(target * eased) + suffix;
    if (pr < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* ---------- Reveal ---------- */
let revealObserver;
function observeReveals() {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        const counter = entry.target.querySelector?.("[data-target]");
        if (counter && !counter.dataset.done) { counter.dataset.done = "1"; animateCount(counter); }
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.15 });
  }
  $$(".reveal:not(.is-visible)").forEach((el) => revealObserver.observe(el));
}

/* ---------- Forms ---------- */
function handleForm(form, btn, feedback) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (btn) { btn.disabled = true; btn.textContent = "enviando…"; }
    setTimeout(() => {
      if (feedback) feedback.hidden = false;
      form.reset();
      if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label || "✓"; }
    }, 900);
  });
}

/* ---------- Modal ---------- */
function initModal() {
  const modal = $("#leadModal");
  if (sessionStorage.getItem("leadShown")) return;
  let shown = false;
  const open = () => {
    if (shown) return; shown = true;
    sessionStorage.setItem("leadShown", "1");
    modal.classList.add("is-open"); modal.setAttribute("aria-hidden", "false");
    observeReveals();
  };
  const close = () => { modal.classList.remove("is-open"); modal.setAttribute("aria-hidden", "true"); };
  const timer = setTimeout(open, 5000);
  const onLeave = (e) => { if (e.clientY <= 0) { open(); document.removeEventListener("mouseout", onLeave); } };
  document.addEventListener("mouseout", onLeave);
  $$("[data-close]", modal).forEach((el) => el.addEventListener("click", () => { clearTimeout(timer); close(); }));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  handleForm($("#leadForm"), null, $("#leadFeedback"));
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderTicker(); renderBrands(); renderMetrics(); renderTabs();
  renderPortfolio(); renderServices(); renderResults(); renderTestimonials();
  initClock(); initNav(); initDrag(); initTabs(); initModal(); observeReveals();
  $("#year").textContent = new Date().getFullYear();
  const cfBtn = $("#cfBtn");
  if (cfBtn) cfBtn.dataset.label = "enviar ★";
  handleForm($("#contactForm"), cfBtn, $("#cfFeedback"));
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
