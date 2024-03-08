const mongoose = require("mongoose");

const betSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // link to the user making the bet
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    }, // link to the question being bet on
    amount: { type: Number, required: true }, // how much the user is betting
    selectedAnswer: { type: String, required: true }, // the answer the user is betting on
    isResolved: { type: Boolean, default: false }, // whether the bet has been resolved
    payout: { type: Number }, // amount user wins; undefined until bet is resolved
  },
  { timestamps: true }
);

const Bet = mongoose.model("Bet", betSchema);

module.exports = Bet;
