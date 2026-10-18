/* ===========================================================
   Estilo 12, Messenger / Windows XP, main.js (vanilla)
   =========================================================== */

/* ---------- DADOS (edite aqui) ---------- */
const TICKER = [
  "UGC de Conversão", "Criativos pra Ads", "Roteiros que vendem",
  "Fotos Lifestyle", "Conteúdo E-commerce", "Consultoria UGC",
  "Reels & TikTok", "Unboxing", "Depoimentos autênticos"
];

const BRANDS = [
  "Marca 01","Marca 02","Marca 03","Marca 04","Marca 05","Marca 06",
  "Marca 07","Marca 08","Marca 09","Marca 10","Marca 11","Marca 12"
];

const METRICS = [
  { num:500, suffix:"+", label:"vídeos entregues" },
  { num:200, suffix:"+", label:"marcas atendidas" },
  { num:100, suffix:"M+", label:"views gerados" },
  { num:2,   suffix:" anos", label:"de experiência" }
];

const TABS = [
  { id:"todos",       label:"Todos" },
  { id:"beleza",      label:"Beleza" },
  { id:"gastronomia", label:"Gastronomia" },
  { id:"fitness",     label:"Fitness" },
  { id:"moda",        label:"Moda" },
  { id:"tech",        label:"Tech" },
  { id:"casa",        label:"Casa & Deco" }
];

const PORTFOLIO = [
  { name:"Skincare noturno",      niche:"beleza",      badge:"Reels" },
  { name:"GRWM produto novo",     niche:"beleza",      badge:"TikTok" },
  { name:"Receita prática",       niche:"gastronomia", badge:"Reels" },
  { name:"Mukbang delivery",      niche:"gastronomia", badge:"UGC" },
  { name:"Treino em casa",        niche:"fitness",     badge:"Reels" },
  { name:"Whey review",           niche:"fitness",     badge:"Ads" },
  { name:"Look do dia",           niche:"moda",        badge:"TikTok" },
  { name:"Try-on haul",           niche:"moda",        badge:"Reels" },
  { name:"Unboxing gadget",       niche:"tech",        badge:"UGC" },
  { name:"App walkthrough",       niche:"tech",        badge:"Ads" },
  { name:"Antes & depois deco",   niche:"casa",        badge:"Reels" },
  { name:"Organização da cozinha",niche:"casa",        badge:"TikTok" }
];

const SERVICES = [
  { icon:"🎯", title:"UGC de Conversão", desc:"Vídeos pensados pra performar, do gancho ao CTA, focados em vender." },
  { icon:"📣", title:"Criativos pra Ads", desc:"Variações testáveis pra Meta e TikTok Ads, prontas pra escalar." },
  { icon:"📝", title:"Roteiros", desc:"Roteiros com ganchos fortes, storytelling e linguagem da sua audiência." },
  { icon:"📸", title:"Fotos Lifestyle", desc:"Imagens naturais de produto em uso, prontas pro feed e e-commerce." },
  { icon:"🛒", title:"Conteúdo E-commerce", desc:"Vídeos de produto que reduzem dúvida e aumentam a conversão na página." },
  { icon:"💡", title:"Consultoria UGC", desc:"Estratégia de conteúdo, briefing e direção pra sua marca acertar." }
];

const RESULTS = [
  { big:"+100M", desc:"views somados nas campanhas que produzi" },
  { big:"5,9x",  desc:"ROAS médio nos criativos de UGC" },
  { big:"+38%",  desc:"de aumento na taxa de conversão em ads" },
  { big:"-27%",  desc:"de redução no custo por aquisição (CPA)" }
];

const TESTIMONIALS = [
  { text:"Os vídeos pareciam recomendação de amiga. Bombou em ads e baixou nosso CPA logo na primeira semana.", name:"Cliente 01", niche:"Beleza" },
  { text:"Entrega rápida, roteiro afiado e edição impecável. Virou nossa criadora oficial de UGC.", name:"Cliente 02", niche:"Gastronomia" },
  { text:"Profissionalismo do briefing à entrega. Os criativos escalaram e o ROAS disparou.", name:"Cliente 03", niche:"Fitness" },
  { text:"Conteúdo autêntico que conversou de verdade com nosso público. Recomendo demais!", name:"Cliente 04", niche:"Tech" }
];

/* ---------- helpers ---------- */
const $  = (s, c=document) => c.querySelector(s);
const $$ = (s, c=document) => [...c.querySelectorAll(s)];
const el = (tag, cls, html) => { const e=document.createElement(tag); if(cls)e.className=cls; if(html!=null)e.innerHTML=html; return e; };
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- ano footer ---------- */
$('#year').textContent = new Date().getFullYear();

/* ---------- TICKER ---------- */
(function buildTicker(){
  const track = $('#tickerTrack');
  const items = [...TICKER, ...TICKER]; // duplica p/ loop contínuo
  items.forEach(t => track.appendChild(el('span','ticker__item',t)));
})();

/* ---------- MARCAS marquee ---------- */
(function buildBrands(){
  const track = $('#brandsTrack');
  const list = [...BRANDS, ...BRANDS];
  list.forEach(b => {
    const chip = el('span','brand-chip',`<span class="dot dot--online"></span>${b}`);
    track.appendChild(chip);
  });
})();

/* ---------- MÉTRICAS ---------- */
(function buildMetrics(){
  const grid = $('#metricsGrid');
  METRICS.forEach(m => {
    const card = el('div','metric reveal');
    card.innerHTML = `
      <div class="metric__bar">📊 estatística.exe</div>
      <div class="metric__body">
        <div class="metric__num"><span class="metric__count" data-target="${m.num}">0</span><span class="metric__suffix">${m.suffix}</span></div>
        <div class="metric__label">${m.label}</div>
      </div>`;
    grid.appendChild(card);
  });
})();

/* ---------- PORTFÓLIO (abas + grid data-driven) ---------- */
const tabsEl = $('#tabs');
const gridEl = $('#portfolioGrid');
let activeTab = 'todos';

function renderTabs(){
  tabsEl.innerHTML = '';
  TABS.forEach(t => {
    const b = el('button', 'tab' + (t.id===activeTab?' is-active':''), t.label);
    b.setAttribute('role','tab');
    b.setAttribute('aria-selected', t.id===activeTab ? 'true':'false');
    b.addEventListener('click', () => { activeTab = t.id; renderTabs(); renderGrid(); });
    tabsEl.appendChild(b);
  });
}
function renderGrid(){
  gridEl.innerHTML = '';
  const items = PORTFOLIO.filter(p => activeTab==='todos' || p.niche===activeTab);
  if(!items.length){ gridEl.appendChild(el('p',null,'Nenhum vídeo neste nicho ainda.')); return; }
  items.forEach(p => {
    const card = el('article','vid-card reveal');
    card.innerHTML = `
      <div class="vid-card__thumb">
        <div class="ph"></div>
        <span class="vid-card__badge">${p.badge}</span>
        <span class="vid-card__play" aria-hidden="true">▶</span>
      </div>
      <div class="vid-card__name">${p.name}</div>`;
    gridEl.appendChild(card);
  });
  observeReveals();
}
renderTabs();
renderGrid();

/* ---------- SERVIÇOS ---------- */
(function buildServices(){
  const grid = $('#servicesGrid');
  SERVICES.forEach(s => {
    const card = el('article','service reveal');
    card.innerHTML = `
      <div class="service__icon">${s.icon}</div>
      <h3 class="service__title">${s.title}</h3>
      <p class="service__desc">${s.desc}</p>`;
    grid.appendChild(card);
  });
})();

/* ---------- RESULTADOS ---------- */
(function buildResults(){
  const grid = $('#resultsGrid');
  RESULTS.forEach(r => {
    const card = el('article','result reveal');
    card.innerHTML = `
      <div class="result__bar">✔ resultado.log</div>
      <div class="result__body">
        <div class="result__big">${r.big}</div>
        <p class="result__desc">${r.desc}</p>
      </div>`;
    grid.appendChild(card);
  });
})();

/* ---------- DEPOIMENTOS ---------- */
(function buildTestimonials(){
  const grid = $('#testimonialsGrid');
  TESTIMONIALS.forEach(t => {
    const card = el('article','testimonial reveal');
    card.innerHTML = `
      <div class="chat-bubble chat-bubble--out"><p>${t.text}</p></div>
      <div class="testimonial__who">
        <div class="ph testimonial__avatar"></div>
        <div>
          <div class="testimonial__name">${t.name}</div>
          <div class="testimonial__niche">${t.niche}</div>
        </div>
      </div>`;
    grid.appendChild(card);
  });
})();

/* ---------- NAVBAR scroll + hambúrguer ---------- */
const nav = $('#nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('is-scrolled', window.scrollY > 10);
}, { passive:true });

const hamburger = $('#hamburger');
const navLinks  = $('#navLinks');
hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('is-open');
  hamburger.classList.toggle('is-open', open);
  hamburger.setAttribute('aria-expanded', open ? 'true':'false');
});
$$('#navLinks a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('is-open');
  hamburger.classList.remove('is-open');
  hamburger.setAttribute('aria-expanded','false');
}));

/* ---------- CONTADOR animado (IntersectionObserver) ---------- */
function animateCount(node){
  const target = parseFloat(node.dataset.target);
  if(reduceMotion){ node.textContent = target; return; }
  const dur = 1400, start = performance.now();
  function step(now){
    const p = Math.min((now-start)/dur, 1);
    const eased = 1 - Math.pow(1-p, 3);
    node.textContent = Math.round(target * eased);
    if(p<1) requestAnimationFrame(step);
    else node.textContent = target;
  }
  requestAnimationFrame(step);
}
const countObs = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => {
    if(e.isIntersecting){ animateCount(e.target); obs.unobserve(e.target); }
  });
}, { threshold:.5 });
$$('.metric__count').forEach(n => countObs.observe(n));

/* ---------- SCROLL REVEAL ---------- */
var revealObs = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => {
    if(e.isIntersecting){ e.target.classList.add('is-visible'); obs.unobserve(e.target); }
  });
}, { threshold:.12 });
function observeReveals(){ if(!revealObs) return; $$('.reveal:not(.is-visible)').forEach(n => revealObs.observe(n)); }
observeReveals();

/* ---------- FORMULÁRIOS (enviando → enviado) ---------- */
function handleForm(form, feedback, sentMsg){
  form.addEventListener('submit', e => {
    e.preventDefault();
    if(!form.checkValidity()){ form.reportValidity(); return; }
    const btn = form.querySelector('button[type=submit]');
    const original = btn.textContent;
    btn.disabled = true; btn.textContent = 'Enviando…';
    feedback.textContent = '';
    setTimeout(() => {
      btn.disabled = false; btn.textContent = original;
      form.reset();
      feedback.textContent = sentMsg;
    }, 1100);
  });
}
handleForm($('#contactForm'), $('#contactFeedback'), '✔ Mensagem enviada! Te respondo rapidinho. 🦆');
handleForm($('#leadForm'),    $('#leadFeedback'),    '✔ Pronto! Media kit a caminho do seu e-mail.');

/* ---------- MODAL DE LEAD (zumbido) ---------- */
const modal     = $('#modal');
const modalWin  = $('#modalWin');
const modalClose= $('#modalClose');
const modalOverlay = $('#modalOverlay');
const SS_KEY = 'leadModalShown_estilo12';
let modalShown = false;

function openModal(){
  if(modalShown || sessionStorage.getItem(SS_KEY)) return;
  modalShown = true;
  sessionStorage.setItem(SS_KEY,'1');
  modal.hidden = false;
  if(!reduceMotion){
    modalWin.classList.remove('shake');
    void modalWin.offsetWidth; // reflow p/ reiniciar a animação
    modalWin.classList.add('shake');
  }
  modalClose.focus();
}
function closeModal(){ modal.hidden = true; }

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if(e.key==='Escape' && !modal.hidden) closeModal(); });

// timer 5s
setTimeout(openModal, 5000);
// saída do mouse (exit intent)
document.addEventListener('mouseout', e => {
  if(e.clientY <= 0 && !e.relatedTarget) openModal();
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
