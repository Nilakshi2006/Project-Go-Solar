const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  email: String,
  phone: String,
  location: String,
  monthlyBill: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Quote", quoteSchema);