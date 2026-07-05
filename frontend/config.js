window.__API_BASE_URL__ = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:8080'
  : 'https://your-render-or-backend-url';
