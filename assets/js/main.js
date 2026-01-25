console.log("main.js loaded ✅");

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle?.addEventListener('click', () => {
  const body = document.body;
  const next = body.dataset.theme === 'dark' ? 'light' : 'dark';
  body.dataset.theme = next;
  localStorage.setItem('theme', next);
});
(() => {
  const saved = localStorage.getItem('theme');
  if (saved) document.body.dataset.theme = saved;
})();

// ✅ Mobile menu toggle (single system)
const menuToggle = document.getElementById('menuToggle');
const nav = document.querySelector('.nav');
const navLinks = document.getElementById('navLinks');

menuToggle?.addEventListener('click', () => {
  nav?.classList.toggle('nav--open');

  const isOpen = nav?.classList.contains('nav--open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close menu after clicking a link
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav?.classList.remove('nav--open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

// Scroll reveal
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('is-visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// Testimonials slider
const slides = [...document.querySelectorAll('#slider .slide')];
let idx = 0;
if (slides.length) {
  setInterval(() => {
    slides.forEach(s => s.classList.remove('is-active'));
    idx = (idx + 1) % slides.length;
    slides[idx].classList.add('is-active');
  }, 3500);
}

// Footer year (safe)
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Before/After slider
document.querySelectorAll('[data-ba]').forEach(ba => {
  const range = ba.querySelector('.ba__range');
  const after = ba.querySelector('.ba__after');
  const handle = ba.querySelector('.ba__handle');

  const set = (val) => {
    const left = Number(val);
    after.style.clipPath = `inset(0 0 0 ${left}%)`;
    handle.style.left = `${left}%`;
  };

  if (range) {
    set(range.value);
    range.addEventListener('input', (e) => set(e.target.value));
  }
});

// Booking form (demo UX)
const bookingForm = document.getElementById('bookingForm');
const bookingMsg = document.getElementById('bookingMsg');

bookingForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!bookingMsg) return;

  bookingMsg.textContent = "Request sent! I’ll confirm availability with you shortly.";
  bookingForm.reset();
});
