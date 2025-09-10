// Age calculation
function updateAge() {
  const birthDate = new Date('2004-01-01'); // Adjust birth date as needed
  const today = new Date();
  const age = Math.floor((today - birthDate) / (365.25 * 24 * 60 * 60 * 1000));
  const ageElement = document.getElementById('age-display');
  if (ageElement) ageElement.textContent = age;
}

// Stars animation
function createStars() {
  const starsContainer = document.getElementById('stars-container');
  if (!starsContainer) return;
  const numberOfStars = 100;
  for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement('div');
    star.className = 'absolute bg-white rounded-full animate-pulse';
    const size = Math.random() * 3 + 1;
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    star.style.opacity = (Math.random() * 0.8 + 0.2).toString();
    starsContainer.appendChild(star);
  }
}

// Smooth scrolling
function smoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId) return;
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      e.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// Auto-hiding header
function initAutoHidingHeader() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  let lastScrollY = window.scrollY;
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    clearTimeout(scrollTimeout);
    if (currentScrollY < windowHeight * 0.8) {
      navbar.style.transform = 'translateY(0)';
    } else if (currentScrollY < lastScrollY) {
      navbar.style.transform = 'translateY(0)';
      scrollTimeout = setTimeout(() => { navbar.style.transform = 'translateY(-100%)'; }, 3000);
    } else {
      navbar.style.transform = 'translateY(-100%)';
    }
    lastScrollY = currentScrollY;
  });
}

// Loading screen control
function initLoadingScreen() {
  const loadingOverlay = document.getElementById('loading-overlay');
  if (!loadingOverlay) return;
  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingOverlay.classList.add('content-hidden');
      setTimeout(() => { loadingOverlay.classList.add('hidden'); }, 250);
    }, 1500);
  });
}

// Earth background section remains in-page; script init
export function initHomePage() {
  initLoadingScreen();
  updateAge();
  createStars();
  smoothScroll();
  initAutoHidingHeader();
}

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => initHomePage());
}
