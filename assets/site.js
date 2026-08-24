/* =========================================================
   Tainty Labs — site.js (compartido por todas las páginas)
   ========================================================= */

/* ===== Configuración de WhatsApp =====
   Número: código de país + número, sin espacios ni + */
const WHATSAPP  = '51932491316';
const WA_MSG = 'Hola Tainty Labs, vi su página web y quiero cotizar un producto para mi marca.';

const waUrl = (num, msg) => 'https://wa.me/' + num + '?text=' + encodeURIComponent(msg);
document.querySelectorAll('.wa-link').forEach(a => a.href = waUrl(WHATSAPP, WA_MSG));
document.querySelectorAll('.wa-cat').forEach(a => {
  a.href = waUrl(WHATSAPP, 'Hola Tainty Labs, quiero cotizar la línea de ' + a.dataset.cat + ' para mi marca.');
});
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ===== Botón modo claro / oscuro ===== */
(function(){
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    try { localStorage.setItem('tainty-theme', isDark ? 'dark' : 'light'); } catch(e){}
  });
})();

/* ===== Animación al hacer scroll =====
   Cada elemento aparece deslizándose cuando entra en pantalla.
   Los elementos de un mismo grupo entran escalonados. */
(function(){
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Entrada al cargar (portada principal y portada de línea) */
  const heroEls = document.querySelectorAll(
    '.hero .hero-badge, .hero h1, .hero p, .hero .hero-actions, .hero .hero-stats,' +
    '.line-hero .back-link, .line-hero h1, .line-hero .line-sub, .line-hero .line-meta, .line-hero .line-cta, .line-hero .line-photo'
  );
  heroEls.forEach((el, i) => {
    el.classList.add('hero-anim');
    el.style.setProperty('--hero-delay', (i * 0.1) + 's');
  });
  if (reduce) return; // el CSS ya deja todo visible

  /* Grupos a animar al hacer scroll. Selectores que no existan en una página se ignoran. */
  const groups = [
    '#que-hacemos .sec-tag, #que-hacemos .sec-title, #que-hacemos .sec-sub',
    '#que-hacemos .card',
    '#catalogo .sec-tag, #catalogo .sec-title, #catalogo .sec-sub',
    '#catalogo .cat-card',
    '#productos .sec-tag, #productos .sec-title, #productos .sec-sub',
    '#productos .prod-item',
    '.incluye h2, .incluye p, .incluye .chip',
    '#beneficios .sec-tag, #beneficios .sec-title, #beneficios .sec-sub',
    '#beneficios .card',
    '#proceso .sec-tag, #proceso .sec-title, #proceso .sec-sub',
    '#proceso .step',
    '#proceso .cotiza-band',
    '#contacto .contact-box'
  ];
  groups.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.setProperty('--reveal-delay', Math.min(i * 0.08, 0.45) + 's');
    });
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting){
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();
