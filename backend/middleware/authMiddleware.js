const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const header = req.headers["authorization"];

    if (!header) {
      return res.status(401).json({ msg: "No token, access denied" });
    }

    // Format: Bearer token
    const token = header.split(" ")[1];

    const secret = process.env.JWT_SECRET || process.env.SECRET;
    if (!secret) {
      return res.status(500).json({ msg: "JWT secret not configured" });
    }

    const decoded = jwt.verify(token, secret);

    req.user = decoded; // contains user id

    next();

  } catch (err) {
    res.status(401).json({ msg: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;