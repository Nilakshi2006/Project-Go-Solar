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

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});