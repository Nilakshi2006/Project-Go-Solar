const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") }); // MUST be first

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

app.use(express.json());
// Configure CORS: allow setting an explicit origin via CORS_ORIGIN env var (e.g., your Netlify URL)
const allowedOrigin = process.env.CORS_ORIGIN || "*";
app.use(cors({ origin: allowedOrigin }));

if (process.env.NODE_ENV !== 'production') {
  console.log(`CORS allowed origin: ${allowedOrigin}`);
}

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("Error: Missing required environment variable MONGO_URI.");
  console.error("Set MONGO_URI in Render environment variables or your local .env file.");
  process.exit(1);
}

// Debug (remove later)
// console.log("MONGO:", MONGO_URI);

// Connect DB
connectDB();

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/quote", require("./routes/quoteRoutes"));

// Frontend serving behavior:
// - When SERVE_FRONTEND=true, serve the frontend from ../frontend (useful for combined deploys)
// - Otherwise, expose a simple root message so the backend service shows "Go solar server" on Render
const frontendPath = path.join(__dirname, "../frontend");
const serveFrontend = process.env.SERVE_FRONTEND === "true";

if (serveFrontend) {
  app.use(express.static(frontendPath));

  // SPA fallback: serve index.html for non-API routes
  app.use((req, res) => {
    if (req.path.startsWith("/api/")) return res.status(404).json({ msg: "Not Found" });
    res.sendFile(path.join(frontendPath, "index.html"));
  });

} else {
  // Minimal root response for a backend-only deployment (shows on Render service URL)
  // Send a small HTML page so clicking the local URL opens the same view as Render.
  app.get('/', (req, res) => {
    res.send(`<!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Go solar server</title>
          <style>body{font-family:Arial,Helvetica,sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;background:#f7f7f7}main{padding:24px;background:#fff;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,.08);text-align:center}h1{margin:0 0 8px}p{margin:0;color:#555}</style>
        </head>
        <body>
          <main>
            <h1>Go solar server</h1>
            <p>This is the backend service. API endpoints are available under <code>/api/</code>.</p>
          </main>
        </body>
      </html>
    `);
  });

  // For any non-API routes return 404 to avoid serving frontend assets
  app.use((req, res) => {
    if (req.path.startsWith('/api/')) return res.status(404).json({ msg: 'Not Found' });
    return res.status(404).send('Not Found');
  });

}

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  const url = `http://localhost:${PORT}/`;
  console.log(`Server running on port ${PORT}`);
  console.log(`Open the backend in your browser: ${url}`);
});

// Temporary endpoint to reveal the service's outbound IP address.
// Deploy the app on Render and visit /whoami to see which public IP the service uses.
const https = require('https');
app.get('/whoami', (req, res) => {
  // Use ipify to get public IP
  https.get('https://api.ipify.org?format=json', (resp) => {
    let data = '';
    resp.on('data', chunk => data += chunk);
    resp.on('end', () => {
      try {
        const parsed = JSON.parse(data);
        return res.json({ outboundIp: parsed.ip });
      } catch (e) {
        return res.status(500).json({ error: 'Failed to parse IP response', details: e.message });
      }
    });
  }).on('error', (err) => {
    return res.status(500).json({ error: 'Failed to fetch outbound IP', details: err.message });
  });
});