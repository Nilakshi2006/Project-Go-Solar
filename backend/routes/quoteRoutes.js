const router = require("express").Router();
const Quote = require("../models/Quote");
const auth = require("../middleware/authMiddleware");

// SAVE QUOTE (Protected)
router.post("/", auth, async (req, res) => {
  try {
    const data = await Quote.create({
      ...req.body,
      userId: req.user.id
    });

    res.json({ message: "Quote saved successfully", data });

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;