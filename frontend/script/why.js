const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const nav = document.getElementById('nav');

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

console.log("Why Us page loaded.");
