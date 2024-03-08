// Bet.js
const mongoose = require("mongoose");

const betSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  predictedResult: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Bet = mongoose.model("Bet", betSchema);

module.exports = Bet;
