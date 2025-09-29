
// year
document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});

// language toggle (persisted)
const btnEN = document.getElementById('btn-en');
const btnAR = document.getElementById('btn-ar');

function setLang(lang){
  const elements = document.querySelectorAll('[data-en]');
  elements.forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if(text){ el.textContent = text; }
  });
  if(lang==='ar'){
    document.documentElement.setAttribute('lang','ar');
    document.documentElement.setAttribute('dir','rtl');
    btnEN && btnEN.classList.remove('active');
    btnAR && btnAR.classList.add('active');
    btnEN && btnEN.setAttribute('aria-pressed','false');
    btnAR && btnAR.setAttribute('aria-pressed','true');
  } else {
    document.documentElement.setAttribute('lang','en');
    document.documentElement.setAttribute('dir','ltr');
    btnAR && btnAR.classList.remove('active');
    btnEN && btnEN.classList.add('active');
    btnAR && btnAR.setAttribute('aria-pressed','false');
    btnEN && btnEN.setAttribute('aria-pressed','true');
  }
  localStorage.setItem('c4oe_lang', lang);
}
if(btnEN) btnEN.addEventListener('click', ()=> setLang('en'));
if(btnAR) btnAR.addEventListener('click', ()=> setLang('ar'));

// init language from storage
(function(){
  const saved = localStorage.getItem('c4oe_lang') || 'en';
  setLang(saved);
})();

// reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.classList.add('reveal-visible');
      observer.unobserve(e.target);
    }
  });
}, {threshold: 0.12});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// section deep-link support when rewritten (e.g., /methodology)
(function(){
  const path = window.location.pathname.replace(/\/+$/,''); // trim trailing /
  const map = {
    '/home': '#home',
    '/why': '#why',
    '/services': '#services',
    '/methodology': '#methodology',
    '/partners': '#partners',
    '/contact': '#contact'
  };
  if(map[path]){
    const id = map[path];
    setTimeout(()=>{
      const el = document.querySelector(id);
      if(el){ el.scrollIntoView({behavior:'smooth'}); }
    }, 50);
  }
})();
