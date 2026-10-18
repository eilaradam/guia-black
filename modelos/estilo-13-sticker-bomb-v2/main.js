/* ===== DADOS (edite à vontade) ===== */
const TICKER = [
  "UGC de Conversão", "Criativos pra Ads", "Roteiros que vendem",
  "Fotos Lifestyle", "Conteúdo E-commerce", "Consultoria UGC",
  "Trends & Memes", "Reels & TikTok"
];

const BRANDS = [
  "Marca 01","Marca 02","Marca 03","Marca 04","Marca 05","Marca 06",
  "Marca 07","Marca 08","Marca 09","Marca 10","Marca 11","Marca 12"
];

const METRICS = [
  { target:500, suffix:"+", label:"vídeos criados" },
  { target:200, suffix:"+", label:"marcas atendidas" },
  { target:100, suffix:"M+", label:"views geradas" },
  { target:2,   suffix:" anos", label:"de estrada" }
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
  { niche:"beleza", badge:"Beleza", name:"Skincare GRWM", ph:"ph--magenta" },
  { niche:"beleza", badge:"Beleza", name:"Resenha de batom", ph:"ph--orange" },
  { niche:"gastronomia", badge:"Food", name:"Receita viral 30s", ph:"ph--lime" },
  { niche:"gastronomia", badge:"Food", name:"Unboxing delivery", ph:"ph--blue" },
  { niche:"fitness", badge:"Fitness", name:"Treino em casa", ph:"ph--blue" },
  { niche:"fitness", badge:"Fitness", name:"Whey day in life", ph:"ph--lime" },
  { niche:"moda", badge:"Moda", name:"Try-on outono", ph:"ph--orange" },
  { niche:"moda", badge:"Moda", name:"Look do dia", ph:"ph--magenta" },
  { niche:"tech", badge:"Tech", name:"Review de gadget", ph:"ph--blue" },
  { niche:"tech", badge:"Tech", name:"App walkthrough", ph:"ph--magenta" },
  { niche:"casa", badge:"Casa", name:"Organização kitchen", ph:"ph--lime" },
  { niche:"casa", badge:"Casa", name:"Decor antes/depois", ph:"ph--orange" }
];

const SERVICES = [
  { ic:"⚡", title:"UGC de Conversão", desc:"Vídeos autênticos pensados pra transformar scroll em clique e clique em venda." },
  { ic:"🎯", title:"Criativos pra Ads", desc:"Variações de criativos prontos pra testar no Meta e TikTok Ads, com hooks que seguram." },
  { ic:"✍️", title:"Roteiros", desc:"Roteiros afiados com timing de trend, humor e CTA na medida certa." },
  { ic:"📸", title:"Fotos Lifestyle", desc:"Banco de imagens com cara de gente real pra abastecer feed, site e ads." },
  { ic:"🛒", title:"Conteúdo E-commerce", desc:"Vídeos de produto, unboxing e prova social que vendem na página." },
  { ic:"💡", title:"Consultoria UGC", desc:"Mentoria pra sua marca montar estratégia de creators e escalar conteúdo." }
];

const RESULTS = [
  { big:"+100M", desc:"views acumuladas em campanhas" },
  { big:"5,9x", desc:"ROAS médio em criativos de ads" },
  { big:"+38%", desc:"de CTR vs. criativo institucional" },
  { big:"4 dias", desc:"do briefing à entrega final" }
];

const TESTIMONIALS = [
  { quote:"Os vídeos pararam o feed e nossas vendas subiram na primeira semana. Virou nosso criativo campeão.", who:"Cliente 01", niche:"Skincare" },
  { quote:"Entendeu o tom da marca na hora e ainda trouxe ideias de trend que a gente nem tinha pensado.", who:"Cliente 02", niche:"Food & Bebidas" },
  { quote:"Entrega rápida, comunicação fácil e resultado em ROAS. Já contratei pro segundo lote.", who:"Cliente 03", niche:"Moda" },
  { quote:"Conteúdo com cara de gente real fez toda a diferença nos nossos ads de e-commerce.", who:"Cliente 04", niche:"Tech" }
];

/* ===== HELPERS ===== */
const $ = (s, el=document) => el.querySelector(s);
const $$ = (s, el=document) => [...el.querySelectorAll(s)];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ===== RENDER: ticker ===== */
function renderTicker(){
  const el = $("#ticker");
  const items = TICKER.map(t => `<span class="ticker__item">${t}</span>`).join("");
  el.innerHTML = items + items; // duplicado p/ loop contínuo
}

/* ===== RENDER: marcas ===== */
function renderBrands(){
  const el = $("#brands");
  const chips = BRANDS.map(b => `<span class="brands__chip">${b}</span>`).join("");
  el.innerHTML = chips + chips;
}

/* ===== RENDER: métricas ===== */
function renderMetrics(){
  const el = $("#metrics");
  el.innerHTML = METRICS.map(m => `
    <div class="metric reveal">
      <div class="metric__num" data-target="${m.target}" data-suffix="${m.suffix}">0${m.suffix}</div>
      <div class="metric__label">${m.label}</div>
    </div>`).join("");
}

/* ===== RENDER: portfólio (data-driven) ===== */
function renderTabs(){
  const el = $("#tabs");
  el.innerHTML = TABS.map((t,i) =>
    `<button class="tab ${i===0?"is-active":""}" role="tab" data-filter="${t.id}" aria-selected="${i===0}">${t.label}</button>`
  ).join("");
}

function renderPortfolio(filter="todos"){
  const el = $("#portfolioGrid");
  const list = filter==="todos" ? PORTFOLIO : PORTFOLIO.filter(p => p.niche===filter);
  el.innerHTML = list.map(p => `
    <article class="vcard reveal">
      <div class="vcard__thumb">
        <div class="ph ${p.ph}"></div>
        <span class="vcard__badge">${p.badge}</span>
        <span class="vcard__play" aria-hidden="true">▶</span>
      </div>
      <div class="vcard__name">${p.name}</div>
    </article>`).join("");
  observeReveals();
}

/* ===== RENDER: serviços ===== */
function renderServices(){
  $("#services").innerHTML = SERVICES.map(s => `
    <article class="scard reveal">
      <span class="scard__ic" aria-hidden="true">${s.ic}</span>
      <h3>${s.title}</h3>
      <p>${s.desc}</p>
    </article>`).join("");
}

/* ===== RENDER: resultados ===== */
function renderResults(){
  $("#results").innerHTML = RESULTS.map(r => `
    <article class="rcard reveal">
      <div class="rcard__big">${r.big}</div>
      <div class="rcard__desc">${r.desc}</div>
    </article>`).join("");
}

/* ===== RENDER: depoimentos ===== */
function renderTestimonials(){
  $("#testimonials").innerHTML = TESTIMONIALS.map(t => `
    <article class="tcard reveal">
      <p class="tcard__quote">${t.quote}</p>
      <div class="tcard__who">${t.who}</div>
      <div class="tcard__niche">${t.niche}</div>
    </article>`).join("");
}

/* ===== NAVBAR scroll + burger ===== */
function initNav(){
  const nav = $("#nav");
  const burger = $("#burger");
  const links = $("#navLinks");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 30);
  }, { passive:true });
  burger.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    burger.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
  });
  $$("#navLinks a").forEach(a => a.addEventListener("click", () => {
    links.classList.remove("is-open");
    burger.classList.remove("is-open");
    burger.setAttribute("aria-expanded","false");
  }));
}

/* ===== ABAS ===== */
function initTabs(){
  $("#tabs").addEventListener("click", e => {
    const btn = e.target.closest(".tab");
    if(!btn) return;
    $$("#tabs .tab").forEach(t => { t.classList.remove("is-active"); t.setAttribute("aria-selected","false"); });
    btn.classList.add("is-active");
    btn.setAttribute("aria-selected","true");
    renderPortfolio(btn.dataset.filter);
  });
}

/* ===== CONTADOR animado ===== */
function animateCount(el){
  const target = +el.dataset.target;
  const suffix = el.dataset.suffix || "";
  if(reduceMotion){ el.textContent = target + suffix; return; }
  const dur = 1400;
  const start = performance.now();
  function tick(now){
    const p = Math.min((now - start)/dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased) + suffix;
    if(p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function initCounters(){
  const nums = $$(".metric__num");
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(en => {
      if(en.isIntersecting){ animateCount(en.target); obs.unobserve(en.target); }
    });
  }, { threshold:0.4 });
  nums.forEach(n => io.observe(n));
}

/* ===== SCROLL REVEAL ===== */
let revealIO;
function observeReveals(){
  if(reduceMotion){ $$(".reveal").forEach(r => r.classList.add("is-visible")); return; }
  if(!revealIO){
    revealIO = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if(en.isIntersecting){ en.target.classList.add("is-visible"); revealIO.unobserve(en.target); }
      });
    }, { threshold:0.12 });
  }
  $$(".reveal:not(.is-visible)").forEach(r => revealIO.observe(r));
}

/* ===== FORM helper ===== */
function handleForm(form, btn, feedback, okMsg){
  form.addEventListener("submit", e => {
    e.preventDefault();
    if(!form.checkValidity()){ form.reportValidity(); return; }
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Enviando...";
    feedback.textContent = "";
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = original;
      feedback.textContent = okMsg;
      form.reset();
    }, 1100);
  });
}

/* ===== MODAL DE LEAD ===== */
function initModal(){
  const modal = $("#leadModal");
  const overlay = $("#modalOverlay");
  const closeBtn = $("#modalClose");
  const KEY = "leadModalShown";
  let shown = false;

  function open(){
    if(shown || sessionStorage.getItem(KEY)) return;
    shown = true;
    sessionStorage.setItem(KEY, "1");
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden","false");
  }
  function close(){
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden","true");
  }

  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", close);
  document.addEventListener("keydown", e => { if(e.key==="Escape") close(); });

  if(!sessionStorage.getItem(KEY)){
    setTimeout(open, 5000);
    document.addEventListener("mouseout", e => {
      if(e.clientY <= 0 && !e.relatedTarget) open();
    });
  }

  handleForm($("#leadForm"), $("#leadBtn"), $("#leadFeedback"), "Prontinho! Mídia kit a caminho ⚡");
}

/* ===== INIT ===== */
function init(){
  renderTicker();
  renderBrands();
  renderMetrics();
  renderTabs();
  renderPortfolio("todos");
  renderServices();
  renderResults();
  renderTestimonials();

  initNav();
  initTabs();
  initCounters();
  initModal();
  observeReveals();

  handleForm($("#contactForm"), $("#contactBtn"), $("#contactFeedback"), "Mensagem enviada! Te respondo rapidinho ✦");

  $("#year").textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", init);


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
