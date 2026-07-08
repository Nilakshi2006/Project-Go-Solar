const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") }); // MUST be first

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

app.use(express.json());
app.use(cors());

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

// Serve frontend static files (if frontend is deployed in ../frontend)
const frontendPath = path.join(__dirname, "../frontend");
app.use(express.static(frontendPath));

// SPA fallback: serve index.html for non-API routes
app.get("*", (req, res) => {
  if (req.path.startsWith("/api/")) return res.status(404).json({ msg: "Not Found" });
  res.sendFile(path.join(frontendPath, "index.html"));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});