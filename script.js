// ============================================
// Mobile nav toggle
// ============================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// close menu after clicking a link (mobile)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ============================================
// Typing effect for the hero tagline
// ============================================
const taglineText = "Computer Science Student · Aspiring Web Developer";
const typedEl = document.getElementById('typedText');
let i = 0;

function typeWriter() {
  if (i < taglineText.length) {
    typedEl.textContent += taglineText.charAt(i);
    i++;
    setTimeout(typeWriter, 35);
  }
}
typeWriter();

// ============================================
// Scroll reveal animation using IntersectionObserver
// ============================================
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));

// ============================================
// Footer year
// ============================================
document.getElementById('year').textContent = new Date().getFullYear();
