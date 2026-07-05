// Get references to the button and the info section
const toggleBtn = document.getElementById('toggleBtn');
const extraInfo = document.getElementById('extraInfo');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const nav = document.getElementById('nav');

if (toggleBtn && extraInfo) {
  toggleBtn.addEventListener('click', () => {
    const isVisible = extraInfo.style.display === 'block';
    extraInfo.style.display = isVisible ? 'none' : 'block';
    toggleBtn.textContent = isVisible ? 'Learn More' : 'Show Less';
  });
}

if (hamburger && navLinks) {
  navLinks.setAttribute('id', 'primary-nav');
  hamburger.setAttribute('role', 'button');
  hamburger.setAttribute('tabindex', '0');
  hamburger.setAttribute('aria-label', 'Toggle navigation');
  hamburger.setAttribute('aria-controls', 'primary-nav');
  hamburger.setAttribute('aria-expanded', 'false');

  const closeMenu = () => {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  };

  hamburger.addEventListener('click', () => {
    const isActive = navLinks.classList.toggle('active');
    hamburger.classList.toggle('active', isActive);
    hamburger.setAttribute('aria-expanded', String(isActive));
    document.body.classList.toggle('nav-open', isActive);
  });

  hamburger.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      hamburger.click();
    }
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  });
}

