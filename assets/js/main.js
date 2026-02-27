console.log("main.js loaded ✅");

// =========================
// Theme toggle
// =========================
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


// =========================
// Mobile menu toggle (nav--open)
// =========================
const menuToggle = document.getElementById('menuToggle');
const nav = document.querySelector('.nav');
const navLinks = document.getElementById('navLinks');

menuToggle?.addEventListener('click', () => {
  nav?.classList.toggle('nav--open');

  const isOpen = nav?.classList.contains('nav--open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close menu after clicking a link (mobile UX)
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav?.classList.remove('nav--open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});


// =========================
// Scroll reveal
// =========================
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('is-visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => obs.observe(el));


// =========================
// Testimonials slider
// =========================
const slides = [...document.querySelectorAll('#slider .slide')];
let idx = 0;

if (slides.length) {
  setInterval(() => {
    slides.forEach(s => s.classList.remove('is-active'));
    idx = (idx + 1) % slides.length;
    slides[idx].classList.add('is-active');
  }, 3500);
}


// =========================
// Footer year (safe)
// =========================
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();


// =========================
// Before/After slider
// =========================
document.querySelectorAll('[data-ba]').forEach(ba => {
  const range = ba.querySelector('.ba__range');
  const after = ba.querySelector('.ba__after');
  const handle = ba.querySelector('.ba__handle');

  if (!range || !after || !handle) return;

  const set = (val) => {
    const left = Number(val);
    after.style.clipPath = `inset(0 0 0 ${left}%)`;
    handle.style.left = `${left}%`;
  };

  set(range.value);
  range.addEventListener('input', (e) => set(e.target.value));
});


// =========================
// Booking form (Formspree)
// Endpoint comes from the form's action attribute in HTML:
// action=https://formspree.io/f/meeldrvq
// =========================
const bookingForm = document.getElementById('bookingForm');
const bookingMsg = document.getElementById('bookingMsg');

bookingForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!bookingMsg) return;

  bookingMsg.textContent = "Sending…";

  try {
    const res = await fetch(bookingForm.action, {
      method: "POST",
      body: new FormData(bookingForm),
      headers: { "Accept": "application/json" }
    });

    const data = await res.json().catch(() => null);

    if (res.ok) {
      bookingMsg.textContent = "Request sent!";
      bookingForm.reset();
    } else {
      // show the error Formspree returns (very useful)
      const msg = data?.errors?.[0]?.message || "Submission failed. Please try again.";
      bookingMsg.textContent = msg;
    }
  } catch (err) {
    bookingMsg.textContent = "Network error. Please try again or message me on WhatsApp.";
  }
});
