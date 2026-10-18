/* ===== Estilo 15, Boutique vintage · dados editáveis ===== */
const TICKER = [
  "UGC de Conversão", "Criativos pra Ads", "Roteiros", "Fotos Lifestyle",
  "Conteúdo E-commerce", "Consultoria UGC", "Unboxing", "Try-on", "Review autêntico"
];

const BRANDS = [
  "Marca 01","Marca 02","Marca 03","Marca 04","Marca 05","Marca 06",
  "Marca 07","Marca 08","Marca 09","Marca 10","Marca 11","Marca 12"
];

const METRICS = [
  { num:500, suffix:"+", label:"vídeos criados" },
  { num:200, suffix:"+", label:"marcas atendidas" },
  { num:100, suffix:"M+", label:"views geradas" },
  { num:2,   suffix:" anos", label:"de estrada" }
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
  { niche:"beleza",      badge:"Beleza",      name:"Rotina skincare 70s",     ph:"ph--rose" },
  { niche:"beleza",      badge:"Beleza",      name:"GRWM achadinho",          ph:"ph--gold" },
  { niche:"gastronomia", badge:"Gastronomia", name:"Receita de vó",           ph:"ph--green" },
  { niche:"gastronomia", badge:"Gastronomia", name:"Café boutique",           ph:"ph--gold" },
  { niche:"fitness",     badge:"Fitness",     name:"Treino em casa",          ph:"ph--green" },
  { niche:"fitness",     badge:"Fitness",     name:"Shake pós-treino",        ph:"ph--rose" },
  { niche:"moda",        badge:"Moda",        name:"Try-on vintage",          ph:"ph--rose" },
  { niche:"moda",        badge:"Moda",        name:"Look do dia retrô",       ph:"ph--gold" },
  { niche:"tech",        badge:"Tech",        name:"Unboxing gadget",         ph:"ph--green" },
  { niche:"tech",        badge:"Tech",        name:"Setup aesthetic",         ph:"ph--rose" },
  { niche:"casa",        badge:"Casa & Deco", name:"Decor brechó",            ph:"ph--gold" },
  { niche:"casa",        badge:"Casa & Deco", name:"Organização charmosa",    ph:"ph--green" }
];

const SERVICES = [
  { ico:"✦", title:"UGC de Conversão", desc:"Vídeos com cara de gente real que transformam scroll em compra." },
  { ico:"◈", title:"Criativos pra Ads", desc:"Peças testadas pra rodar em Meta e TikTok Ads com baixo CPA." },
  { ico:"✎", title:"Roteiros", desc:"Ganchos, falas e CTAs escritos pra prender nos 3 primeiros segundos." },
  { ico:"❀", title:"Fotos Lifestyle", desc:"Imagens com estética nostálgica pra feed, site e campanhas." },
  { ico:"▣", title:"Conteúdo E-commerce", desc:"Pacotes de mídia pensados pra página de produto e PDP." },
  { ico:"♛", title:"Consultoria UGC", desc:"Estratégia de criadores, briefing e direção pra sua marca brilhar." }
];

const RESULTS = [
  { num:"+100M", desc:"views acumuladas nas campanhas" },
  { num:"5,9x",  desc:"ROAS médio em criativos UGC" },
  { num:"-38%",  desc:"de redução no custo por aquisição" },
  { num:"+12pts",desc:"de retenção média no vídeo" }
];

const TESTIMONIALS = [
  { text:"Parecia recomendação de amiga, e vendeu como tal. Melhor parceria de UGC que tivemos.", name:"Cliente 01", niche:"Beleza" },
  { text:"Os criativos baixaram nosso CPA em semanas. Entrega impecável e cheia de charme.", name:"Cliente 02", niche:"E-commerce" },
  { text:"Roteiros afiados, estética única. Nossa marca ganhou personalidade nos vídeos.", name:"Cliente 03", niche:"Moda" },
  { text:"Profissionalismo de quem entende de dados sem perder o lado humano. Recomendo demais.", name:"Cliente 04", niche:"Fitness" }
];

/* ===== Helpers ===== */
const $  = (s, c=document) => c.querySelector(s);
const $$ = (s, c=document) => [...c.querySelectorAll(s)];
const el = (tag, cls, html) => { const n=document.createElement(tag); if(cls)n.className=cls; if(html!=null)n.innerHTML=html; return n; };

/* ===== Render: Ticker ===== */
(function renderTicker(){
  const track = $("#tickerTrack");
  const items = [...TICKER, ...TICKER]; // duplicado pra loop sem corte
  items.forEach(t => track.appendChild(el("span","ticker__item",t)));
})();

/* ===== Render: Marcas ===== */
(function renderBrands(){
  const track = $("#brandsTrack");
  const items = [...BRANDS, ...BRANDS];
  items.forEach(b => track.appendChild(el("span","chip",b)));
})();

/* ===== Render: Métricas ===== */
(function renderMetrics(){
  const grid = $("#metricsGrid");
  METRICS.forEach(m => {
    const card = el("div","metric reveal");
    card.innerHTML = `<div class="metric__num" data-target="${m.num}">0<span class="metric__suffix">${m.suffix}</span></div>
                      <p class="metric__label">${m.label}</p>`;
    grid.appendChild(card);
  });
})();

/* ===== Render: Portfólio (abas + grid) ===== */
const tabsEl = $("#tabs");
const gridEl = $("#portfolioGrid");
function renderTabs(){
  TABS.forEach((t,i) => {
    const b = el("button", "tab"+(i===0?" is-active":""), t.label);
    b.setAttribute("role","tab");
    b.dataset.id = t.id;
    b.addEventListener("click", () => {
      $$(".tab", tabsEl).forEach(x => x.classList.remove("is-active"));
      b.classList.add("is-active");
      renderCards(t.id);
    });
    tabsEl.appendChild(b);
  });
}
function renderCards(filter){
  gridEl.innerHTML = "";
  const list = filter==="todos" ? PORTFOLIO : PORTFOLIO.filter(p => p.niche===filter);
  list.forEach(p => {
    const card = el("article","vcard");
    card.innerHTML = `
      <div class="vcard__thumb">
        <div class="ph ${p.ph}"></div>
        <span class="vcard__badge">${p.badge}</span>
        <span class="vcard__play" aria-hidden="true">▶</span>
      </div>
      <p class="vcard__name">${p.name}</p>`;
    gridEl.appendChild(card);
  });
}
renderTabs();
renderCards("todos");

/* ===== Render: Serviços ===== */
(function renderServices(){
  const grid = $("#servicesGrid");
  SERVICES.forEach(s => {
    const c = el("article","service reveal");
    c.innerHTML = `<span class="service__ico" aria-hidden="true">${s.ico}</span>
                   <h3 class="service__title">${s.title}</h3>
                   <p class="service__desc">${s.desc}</p>`;
    grid.appendChild(c);
  });
})();

/* ===== Render: Resultados ===== */
(function renderResults(){
  const grid = $("#resultsGrid");
  RESULTS.forEach(r => {
    const c = el("article","result reveal");
    c.innerHTML = `<div class="result__num">${r.num}</div><p class="result__desc">${r.desc}</p>`;
    grid.appendChild(c);
  });
})();

/* ===== Render: Depoimentos ===== */
(function renderTestimonials(){
  const grid = $("#testimonialsGrid");
  TESTIMONIALS.forEach(t => {
    const c = el("article","testimonial reveal");
    c.innerHTML = `<span class="testimonial__quote" aria-hidden="true">&rdquo;</span>
                   <p class="testimonial__text">${t.text}</p>
                   <p class="testimonial__name">${t.name}</p>
                   <p class="testimonial__niche">${t.niche}</p>`;
    grid.appendChild(c);
  });
})();

/* ===== Navbar scroll ===== */
const nav = $("#nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("is-scrolled", window.scrollY > 30);
}, { passive:true });

/* ===== Hambúrguer ===== */
const hamburger = $("#hamburger");
const navLinks  = $("#navLinks");
function closeMenu(){ hamburger.classList.remove("is-open"); navLinks.classList.remove("is-open"); hamburger.setAttribute("aria-expanded","false"); }
hamburger.addEventListener("click", () => {
  const open = navLinks.classList.toggle("is-open");
  hamburger.classList.toggle("is-open", open);
  hamburger.setAttribute("aria-expanded", String(open));
});
$$(".nav__links a").forEach(a => a.addEventListener("click", closeMenu));

/* ===== Contador animado (IntersectionObserver) ===== */
function animateCount(node){
  const numEl = $(".metric__num", node);
  const target = +numEl.dataset.target;
  const suffix = $(".metric__suffix", numEl).outerHTML;
  const dur = 1500, start = performance.now();
  function tick(now){
    const p = Math.min((now-start)/dur, 1);
    const val = Math.floor((1-Math.pow(1-p,3)) * target);
    numEl.innerHTML = val + suffix;
    if(p<1) requestAnimationFrame(tick);
    else numEl.innerHTML = target + suffix;
  }
  requestAnimationFrame(tick);
}

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const countObserver = new IntersectionObserver((entries,obs) => {
  entries.forEach(e => {
    if(e.isIntersecting){
      if(reduceMotion){
        const n = $(".metric__num", e.target);
        n.innerHTML = n.dataset.target + $(".metric__suffix", n).outerHTML;
      } else animateCount(e.target);
      obs.unobserve(e.target);
    }
  });
}, { threshold:.5 });
$$(".metric").forEach(m => countObserver.observe(m));

/* ===== Scroll reveal ===== */
const revealObserver = new IntersectionObserver((entries,obs) => {
  entries.forEach(e => {
    if(e.isIntersecting){ e.target.classList.add("is-visible"); obs.unobserve(e.target); }
  });
}, { threshold:.12 });
$$(".reveal").forEach(r => revealObserver.observe(r));

/* ===== Formulários (estado enviando → enviado) ===== */
function handleForm(form, btn, feedback, sentMsg){
  form.addEventListener("submit", e => {
    e.preventDefault();
    if(!form.checkValidity()){ form.reportValidity(); return; }
    const original = btn.textContent;
    btn.textContent = "Enviando...";
    btn.disabled = true;
    feedback.textContent = "";
    setTimeout(() => {
      btn.textContent = "Enviado ✓";
      feedback.textContent = sentMsg;
      form.reset();
      setTimeout(() => { btn.textContent = original; btn.disabled = false; }, 2200);
    }, 900);
  });
}
handleForm($("#contactForm"), $("#contactSubmit"), $("#contactFeedback"), "Recebido! Te respondo rapidinho. ✦");
handleForm($("#leadForm"), $("#leadSubmit"), $("#leadFeedback"), "Prontinho! O mídia kit já está a caminho. ✦");

/* ===== Modal de lead (5s OU mouseout, 1x por sessão) ===== */
const modal = $("#leadModal");
let modalShown = false;
function openModal(){
  if(modalShown || sessionStorage.getItem("leadShown")) return;
  modalShown = true;
  sessionStorage.setItem("leadShown","1");
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden","false");
  const first = $("input", modal);
  if(first) first.focus();
}
function closeModal(){
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden","true");
}
if(!sessionStorage.getItem("leadShown")){
  setTimeout(openModal, 5000);
  document.addEventListener("mouseout", e => {
    if(e.clientY <= 0 && !e.relatedTarget) openModal();
  });
}
$$("[data-close]", modal).forEach(b => b.addEventListener("click", closeModal));
document.addEventListener("keydown", e => { if(e.key==="Escape" && modal.classList.contains("is-open")) closeModal(); });

/* ===== Ano do footer ===== */
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
