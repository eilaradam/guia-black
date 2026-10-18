/* ====== DADOS (edite à vontade) ====== */
const TICKER = [
  "UGC de Conversão","Criativos pra Ads","Roteiros que vendem","Fotos Lifestyle",
  "Conteúdo E-commerce","Consultoria UGC","Beauty","Lifestyle","Unboxing","Tutoriais"
];

const BRANDS = [
  "Marca 01","Marca 02","Marca 03","Marca 04","Marca 05","Marca 06",
  "Marca 07","Marca 08","Marca 09","Marca 10","Marca 11","Marca 12"
];

const METRICS = [
  { target:500, suffix:"+", label:"vídeos entregues" },
  { target:200, suffix:"+", label:"marcas atendidas" },
  { target:100, suffix:"M+", label:"views gerados" },
  { target:2,   suffix:" anos", label:"de estrada UGC" }
];

const TABS = [
  { id:"todos", label:"Todos" },
  { id:"beleza", label:"Beleza" },
  { id:"gastronomia", label:"Gastronomia" },
  { id:"fitness", label:"Fitness" },
  { id:"moda", label:"Moda" },
  { id:"tech", label:"Tech" },
  { id:"casa", label:"Casa & Deco" }
];

const PORTFOLIO = [
  { name:"Rotina de skincare", badge:"Beleza", niche:"beleza" },
  { name:"GRWM com base nova", badge:"Beleza", niche:"beleza" },
  { name:"Unboxing perfume", badge:"Beleza", niche:"beleza" },
  { name:"Receita fit em 30s", badge:"Gastro", niche:"gastronomia" },
  { name:"Café da manhã real", badge:"Gastro", niche:"gastronomia" },
  { name:"Treino em casa", badge:"Fitness", niche:"fitness" },
  { name:"Shake pós-treino", badge:"Fitness", niche:"fitness" },
  { name:"Look do dia", badge:"Moda", niche:"moda" },
  { name:"Try-on de inverno", badge:"Moda", niche:"moda" },
  { name:"App review", badge:"Tech", niche:"tech" },
  { name:"Gadget unboxing", badge:"Tech", niche:"tech" },
  { name:"Organização da casa", badge:"Casa", niche:"casa" },
  { name:"Decor de sala", badge:"Casa", niche:"casa" },
  { name:"Tutorial de cílios", badge:"Beleza", niche:"beleza" }
];

const SERVICES = [
  { ico:"🎬", title:"UGC de Conversão", desc:"Vídeos autênticos feitos pra parar o scroll e levar à compra." },
  { ico:"🚀", title:"Criativos pra Ads", desc:"Variações de hook e CTA testadas pra escalar suas campanhas." },
  { ico:"✍️", title:"Roteiros", desc:"Roteiro estratégico com gancho, problema, solução e prova." },
  { ico:"📸", title:"Fotos Lifestyle", desc:"Imagens com a cara da vida real pra feed, site e ads." },
  { ico:"🛒", title:"Conteúdo E-commerce", desc:"Vídeos de produto que aumentam conversão na página." },
  { ico:"💡", title:"Consultoria UGC", desc:"Te ajudo a montar e rodar uma estratégia de criadores." }
];

const RESULTS = [
  { num:"+100M", desc:"de views somados nas campanhas que produzi." },
  { num:"5,9x", desc:"de ROAS médio nos criativos de melhor performance." },
  { num:"+40%", desc:"de aumento na taxa de conversão de e-commerce." },
  { num:"3x", desc:"mais engajamento vs. conteúdo institucional." }
];

const TESTIMONIALS = [
  { quote:"Os vídeos viraram nosso criativo campeão de ROAS. Entrega impecável e no prazo.", name:"Cliente 01", niche:"Beleza" },
  { quote:"Conteúdo natural, que conecta de verdade. Nosso CTR subiu já na primeira semana.", name:"Cliente 02", niche:"Gastronomia" },
  { quote:"Profissionalismo do briefing à entrega. Recomendo de olhos fechados.", name:"Cliente 03", niche:"Fitness" },
  { quote:"Transformou nossos lançamentos. Cada vídeo parece recomendação de amiga.", name:"Cliente 04", niche:"Moda" }
];

/* ====== Helpers ====== */
const $ = (s, c=document) => c.querySelector(s);
const $$ = (s, c=document) => [...c.querySelectorAll(s)];
const el = (tag, cls, html) => { const e=document.createElement(tag); if(cls)e.className=cls; if(html!=null)e.innerHTML=html; return e; };

/* ====== Render: Ticker ====== */
function renderTicker(){
  const track = $("#tickerTrack");
  const make = () => { const s=el("span"); s.textContent=TICKER.join("  ✦  "); return s; };
  track.append(make(), make());
}

/* ====== Render: Marcas ====== */
function renderBrands(){
  const track = $("#brandsTrack");
  const set = () => BRANDS.map(b => { const c=el("span","chip"); c.textContent=b; return c; });
  track.append(...set(), ...set());
}

/* ====== Render: Métricas ====== */
function renderMetrics(){
  const grid = $("#metricsGrid");
  METRICS.forEach(m => {
    const card = el("div","metric");
    card.innerHTML = `<div class="metric__num" data-target="${m.target}" data-suffix="${m.suffix}">0${m.suffix}</div>
                      <div class="metric__label">${m.label}</div>`;
    grid.appendChild(card);
  });
}

/* ====== Render: Tabs + Portfólio ====== */
function renderTabs(){
  const wrap = $("#tabs");
  TABS.forEach((t,i) => {
    const b = el("button","tab"+(i===0?" is-active":""), t.label);
    b.setAttribute("role","tab");
    b.dataset.filter = t.id;
    b.addEventListener("click", () => {
      $$(".tab", wrap).forEach(x => x.classList.remove("is-active"));
      b.classList.add("is-active");
      renderPortfolio(t.id);
    });
    wrap.appendChild(b);
  });
}

function renderPortfolio(filter="todos"){
  const grid = $("#portfolioGrid");
  grid.innerHTML = "";
  const items = filter==="todos" ? PORTFOLIO : PORTFOLIO.filter(p => p.niche===filter);
  items.forEach(p => {
    const card = el("article","vcard reveal");
    card.innerHTML = `
      <div class="vcard__thumb">
        <div class="ph ph--video"></div>
        <span class="vcard__badge">${p.badge}</span>
        <span class="vcard__play">▶</span>
      </div>
      <div class="vcard__name">${p.name}</div>`;
    grid.appendChild(card);
  });
  observeReveals();
}

/* ====== Render: Serviços ====== */
function renderServices(){
  const grid = $("#servicesGrid");
  SERVICES.forEach(s => {
    const card = el("article","scard reveal");
    card.innerHTML = `<div class="scard__ico">${s.ico}</div>
      <h3 class="scard__title">${s.title}</h3>
      <p class="scard__desc">${s.desc}</p>`;
    grid.appendChild(card);
  });
}

/* ====== Render: Resultados ====== */
function renderResults(){
  const grid = $("#resultsGrid");
  RESULTS.forEach(r => {
    const card = el("article","rcard reveal");
    card.innerHTML = `<div class="rcard__num">${r.num}</div><p class="rcard__desc">${r.desc}</p>`;
    grid.appendChild(card);
  });
}

/* ====== Render: Depoimentos ====== */
function renderTestimonials(){
  const grid = $("#testimonialsGrid");
  TESTIMONIALS.forEach(t => {
    const card = el("article","tcard reveal");
    card.innerHTML = `
      <p class="tcard__quote">${t.quote}</p>
      <div class="tcard__who">
        <span class="tcard__av"></span>
        <span>
          <span class="tcard__name">${t.name}</span><br>
          <span class="tcard__niche">${t.niche}</span>
        </span>
      </div>`;
    grid.appendChild(card);
  });
}

/* ====== Navbar scroll ====== */
function initNav(){
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 20);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive:true });

  const ham = $("#hamburger");
  const links = $("#navLinks");
  const toggle = (open) => {
    const isOpen = open ?? !links.classList.contains("is-open");
    links.classList.toggle("is-open", isOpen);
    ham.classList.toggle("is-open", isOpen);
    ham.setAttribute("aria-expanded", String(isOpen));
  };
  ham.addEventListener("click", () => toggle());
  $$("#navLinks a").forEach(a => a.addEventListener("click", () => toggle(false)));
}

/* ====== Contador de métricas ====== */
function animateCount(node){
  const target = parseFloat(node.dataset.target);
  const suffix = node.dataset.suffix || "";
  const dur = 1400;
  const start = performance.now();
  const step = (now) => {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = Math.round(target * eased);
    node.textContent = val + suffix;
    if (p < 1) requestAnimationFrame(step);
    else node.textContent = target + suffix;
  };
  requestAnimationFrame(step);
}

function initCounters(){
  const nums = $$(".metric__num");
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting){ animateCount(e.target); io.unobserve(e.target); }
    });
  }, { threshold:0.5 });
  nums.forEach(n => io.observe(n));
}

/* ====== Scroll reveal ====== */
let revealIO;
function observeReveals(){
  if (!revealIO){
    revealIO = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting){ e.target.classList.add("is-visible"); revealIO.unobserve(e.target); }
      });
    }, { threshold:0.12 });
  }
  $$(".reveal:not(.is-visible)").forEach(n => revealIO.observe(n));
}

/* ====== Formulários ====== */
function handleForm(form, btn, feedback){
  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    if (!form.checkValidity()){ form.reportValidity(); return; }
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Enviando...";
    feedback.textContent = "";
    setTimeout(() => {
      btn.textContent = "Enviado! ✓";
      feedback.textContent = "Recebido! Te respondo rapidinho 💚";
      form.reset();
      setTimeout(() => { btn.disabled = false; btn.textContent = original; }, 2200);
    }, 900);
  });
}

/* ====== Modal de lead ====== */
function initModal(){
  const modal = $("#leadModal");
  if (!modal) return;
  let shown = false;

  const open = () => {
    if (shown || sessionStorage.getItem("leadShown")) return;
    shown = true;
    sessionStorage.setItem("leadShown","1");
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden","false");
    const f = $("#modalNome"); if (f) f.focus();
  };
  const close = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden","true");
  };

  const timer = setTimeout(open, 5000);

  const onMouseOut = (e) => {
    if (e.clientY <= 0 && !e.relatedTarget){ open(); }
  };
  document.addEventListener("mouseout", onMouseOut);

  modal.addEventListener("click", (e) => { if (e.target.hasAttribute("data-close")) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

  handleForm($("#modalForm"), $("#modalSubmit"), $("#modalFeedback"));
  // após mostrar uma vez, limpa o timer redundante
  modal.addEventListener("transitionend", () => {}, { once:true });
  void timer;
}

/* ====== Init ====== */
document.addEventListener("DOMContentLoaded", () => {
  $("#year").textContent = new Date().getFullYear();

  renderTicker();
  renderBrands();
  renderMetrics();
  renderTabs();
  renderPortfolio("todos");
  renderServices();
  renderResults();
  renderTestimonials();

  initNav();
  initCounters();
  observeReveals();
  initModal();

  handleForm($("#contactForm"), $("#contactSubmit"), $("#contactFeedback"));
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
