const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ["trueFalse", "multipleChoice"],
    }, // question type
    odds: String, // applicable if type is trueFalse, format "X:Y"
    options: [String], // applicable if type is multipleChoice
    correctAnswer: String, // store the correct answer or outcome
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // link to the admin who created the question
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
