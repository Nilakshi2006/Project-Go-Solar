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

const API_BASE_URL = window.__API_BASE_URL__ || "http://localhost:8080";

document.getElementById("quoteForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    
    let formData = {
        name: this.name.value,
        email: this.email.value,
        phone: this.phone.value,
        location: this.location.value,
        monthlyBill: this.usage.value
    };

    const token = localStorage.getItem("token");

    // 🔐 Check if user is logged in
    if (!token) {
        alert("Please login first!");
        window.location.href = "login.html";
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/quote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            alert("Your quote request has been submitted successfully!");
            this.reset();
        } else {
            alert(result.msg || "Something went wrong");
        }

    } catch (err) {
        console.error(err);
        alert("Server error");
    }
});