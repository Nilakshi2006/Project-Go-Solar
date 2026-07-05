let posts = [
  {
    title: "Why Switch to Solar Energy?",
    content: "Explore the benefits of switching to solar—savings, sustainability, and simplicity.",
    videoLink: "https://www.youtube.com/watch?v=dhiWSsKUWEg" // "Should you switch to solar?" by Shannon Odell
  },
  {
    title: "How Do Solar Panels Work?",
    content: "A clear explanation of how solar cells convert sunlight into electricity.",
    videoLink: "https://www.youtube.com/watch?v=xKxrkht7CpY" // "How do solar panels work?" by Richard Komp
  },
  {
    title: "Top Solar Myths You Shouldn’t Believe",
    content: "Debunking the most common greenhouse solar myths that may be stopping you.",
    videoLink: "https://www.youtube.com/watch?v=DsqwwUA3OrY" // "12 LIES About Solar Panels You Shouldn't Believe!"
  },
  {
    title: "Residential vs Commercial Solar Systems",
    content: "Understand the key differences in scale, cost, and application between home and business solar installs.",
    videoLink: "https://www.youtube.com/watch?v=ammXpCfLziY" // "Key Differences Between Residential and Commercial & Industrial ..."
  },
  {
    title: "Do Solar Panels Need Regular Maintenance?",
    content: "Learn how to care for your panels to keep them working at their best.",
    videoLink: "https://www.youtube.com/watch?v=ELti0RyAlyc" // "Do Solar Panels Need Regular Maintenance?"
  },
  {
    title: "What Does a Solar Inverter Do?",
    content: "Discover why inverters are essential in turning solar-generated DC into usable AC power.",
    videoLink: "https://www.youtube.com/watch?v=haBHwlECenI" // "What Does a Solar Inverter Do and How They Work to ..."
  },
  {
    title: "Is Battery Storage Worth It in 2025?",
    content: "Exploring whether solar battery storage is now practical and worth the investment.",
    videoLink: "https://www.youtube.com/watch?v=vQwrbsk_-Lk" // "Is Battery Storage Actually Worth It In 2025?"
  },
  {
    title: "Solar Tax Credit Changes Coming in 2025",
    content: "What homeowners need to know about shifting government solar incentives.",
    videoLink: "https://www.youtube.com/watch?v=bipNWig0Srk" // "It's Official...The 30% Solar Tax Credit ENDS in 2025!"
  },
  {
    title: "Step-by-Step Guide to Solar Installation",
    content: "Understand the process—from site assessment to panels on your roof.",
    videoLink: "https://www.youtube.com/watch?v=j0WlO04pVBU" // "How Solar Energy Systems Work" (includes installation overview)
  },
  {
    title: "Solar Energy Basics Explained",
    content: "A beginner-friendly walkthrough of solar systems and energy conversion.",
    videoLink: "https://www.youtube.com/watch?v=j0WlO04pVBU" // same as above—comprehensive basic guide
  },
  {
    title: "Is Solar Still Worth It After 5 Years?",
    content: "Real data and insights on long-term value and performance of home solar systems.",
    videoLink: "https://www.youtube.com/watch?v=hxj8mNzv8PI" // "5 Years with Solar Panels - Is It Still Worth It?"
  },
  {
    title: "The Future of Solar—and What It Means for You",
    content: "Emerging trends and why solar may soon dominate global energy.",
    videoLink: "https://www.youtube.com/watch?v=edAdJxxstTE" // "Why solar will soon dominate & what that means for the world"
  }
];



document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const nav = document.getElementById('nav');
  const blogList = document.getElementById('blogList');
  const searchInput = document.getElementById('searchInput');
  const toggleAddBtn = document.getElementById('toggleAddPost');
  const addPostForm = document.getElementById('addPostForm');
  const addPostBtn = document.getElementById('addPostBtn');
  const modal = document.getElementById('video-modal');
  const modalIframe = document.getElementById('modal-iframe');
  const modalClose = document.getElementById('modal-close');
  const undoBanner = document.getElementById('undo-banner');
  const undoBtn = document.getElementById('undo-btn');

  let lastDeletedPost = null;
  let lastDeletedIndex = null;
  let undoTimeoutID = null;

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

  function getVideoId(link) {
    const match = link.match(/v=([^&]+)/);
    return match ? match[1] : '';
  }

  function showUndoBanner() {
    undoBanner.classList.add('show');
    clearTimeout(undoTimeoutID);
    undoTimeoutID = setTimeout(() => {
      undoBanner.classList.remove('show');
      lastDeletedPost = null;
      lastDeletedIndex = null;
    }, 6000); // Undo available for 6 seconds
  }

  function hideUndoBanner() {
    undoBanner.classList.remove('show');
  }

  function renderPosts(filter = '') {
    blogList.innerHTML = '';
    const filteredPosts = posts.filter(post =>
      post.title.toLowerCase().includes(filter.toLowerCase()) ||
      post.content.toLowerCase().includes(filter.toLowerCase())
    );

    if (filteredPosts.length === 0) {
      blogList.innerHTML = '<li>No posts found.</li>';
      return;
    }

    filteredPosts.forEach((post, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <h3 class="blog-title">${post.title}</h3>
        <p class="blog-content">${post.content}</p>
        <div class="post-actions">
          <button class="video-link" data-videolink="${post.videoLink}">Watch Video</button>
          <button class="delete-btn" data-index="${index}">Delete Post</button>
        </div>
      `;
      blogList.appendChild(li);
    });

    // Video buttons
    document.querySelectorAll('.video-link').forEach(btn => {
      btn.onclick = function () {
        const link = this.getAttribute('data-videolink');
        const videoId = getVideoId(link);
        modalIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        modal.style.display = 'flex';
      };
    });

    // Delete buttons
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.onclick = function () {
        const idx = this.getAttribute('data-index');
        lastDeletedPost = posts[idx];
        lastDeletedIndex = idx;

        posts.splice(idx, 1);
        renderPosts(searchInput.value);
        showUndoBanner();
      };
    });
  }

  undoBtn.onclick = () => {
    if (lastDeletedPost !== null && lastDeletedIndex !== null) {
      posts.splice(lastDeletedIndex, 0, lastDeletedPost);
      renderPosts(searchInput.value);
      hideUndoBanner();
      lastDeletedPost = null;
      lastDeletedIndex = null;
      clearTimeout(undoTimeoutID);
    }
  };

  toggleAddBtn.onclick = () => {
    addPostForm.style.display = addPostForm.style.display === 'block' ? 'none' : 'block';
  };

  addPostBtn.onclick = () => {
    const title = document.getElementById('newTitle').value.trim();
    const content = document.getElementById('newContent').value.trim();
    const videoLink = document.getElementById('newVideoLink').value.trim();

    if (!title || !content || !videoLink) {
      alert('Please fill in all fields to add a new post.');
      return;
    }

    posts.push({ title, content, videoLink });

    document.getElementById('newTitle').value = '';
    document.getElementById('newContent').value = '';
    document.getElementById('newVideoLink').value = '';

    addPostForm.style.display = 'none';
    renderPosts(searchInput.value);
  };

  searchInput.addEventListener('input', e => renderPosts(e.target.value));

  modalClose.onclick = () => {
    modal.style.display = 'none';
    modalIframe.src = '';
  };
  window.onclick = event => {
    if (event.target === modal) {
      modal.style.display = 'none';
      modalIframe.src = '';
    }
  };

  renderPosts();
});
