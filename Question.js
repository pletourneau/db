// Question.js
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  content: { type: String, required: true },
  odds: { type: String, required: true }, // For simplicity, store odds as a string like "2:1"
  result: { type: String, default: null }, // Possible values: null (unresolved), 'win', 'lose'
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the admin who created the question
  created_at: { type: Date, default: Date.now },
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
