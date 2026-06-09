const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');
const form = document.querySelector('#contactForm');
const formNote = document.querySelector('#formNote');

navToggle?.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  formNote.textContent = 'Thanks! Replace this with Formspree, Netlify Forms, or your preferred contact setup.';
  form.reset();
});

document.querySelector('#year').textContent = new Date().getFullYear();
