const User = require("../models/User");
const Question = require("../models/Question");
const Bet = require("../models/Bet");

exports.placeBet = async (req, res) => {
  const { userId, questionId, amount, selectedOption } = req.body;

  try {
    const user = await User.findById(userId);
    const question = await Question.findById(questionId);

    if (!user || !question) {
      return res.status(404).send("User or question not found");
    }

    if (user.coins < amount) {
      return res.status(400).send("Not enough coins to place bet");
    }

    // Deduct coins from user
    user.coins -= amount;
    await user.save();

    // Create and save the new bet
    const newBet = new Bet({
      question: questionId,
      user: userId,
      amount: amount,
      selectedOption: selectedOption,
    });
    await newBet.save();

    res.status(201).json(newBet);
  } catch (error) {
    console.error("Error placing bet:", error);
    res.status(500).send("Error placing bet");
  }
};

exports.createQuestion = async (req, res) => {
  const { content, odds, betType, options, buyIn } = req.body; // Add any additional fields needed for the question

  try {
    const adminUser = await User.findById(req.user.id);
    if (!adminUser.isAdmin) {
      return res
        .status(403)
        .send("Unauthorized: Only admins can create questions");
    }

    const newQuestion = new Question({
      content,
      odds,
      betType,
      options,
      buyIn,
    });
    await newQuestion.save();

    res.status(201).json(newQuestion);
  } catch (error) {
    console.error("Error creating question:", error);
    res.status(500).send("Error creating question");
  }
};

exports.resolveQuestion = async (req, res) => {
  const { questionId, correctAnswer } = req.body; // Assuming 'correctAnswer' is provided correctly

  try {
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).send("Question not found");
    }

    if (!req.user.isAdmin) {
      return res.status(403).send("Unauthorized");
    }

    question.correctAnswer = correctAnswer; // Update the question with the correct answer
    await question.save();

    // Retrieve all bets related to this question
    const bets = await Bet.find({ question: questionId });

    // Iterate through each bet to update user's coins if they won
    for (const bet of bets) {
      if (bet.selectedAnswer === correctAnswer) {
        // User won the bet. Calculate the payout based on the odds.
        const [win, lose] = question.odds.split(":").map(Number); // Splitting the "2:1" format and converting to numbers
        const winnings = (bet.amount * win) / lose; // Calculating the winnings based on the odds

        // Find the user and update their coins
        const user = await User.findById(bet.user);
        user.coins += winnings; // Add winnings to the user's coin balance
        await user.save();

        // Mark the bet as resolved and set the payout
        bet.isResolved = true;
        bet.payout = winnings;
      } else {
        // User lost the bet; just mark the bet as resolved without payout
        bet.isResolved = true;
        bet.payout = 0;
      }
      await bet.save(); // Save the updated bet status
    }

    res.json({ message: "Question resolved and bets updated" });
  } catch (error) {
    console.error("Error resolving question:", error);
    res.status(500).send("Error resolving question");
  }
};
