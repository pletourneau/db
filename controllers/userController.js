const User = require("../models/User");

// Function to add a new user
exports.addUser = async (req, res) => {
  const { name } = req.body; // Assuming 'name' is passed as a request parameter

  try {
    // Check if user already exists
    let user = await User.findOne({ name });
    if (user) {
      return res.status(400).send("User already exists");
    }

    // If not, create a new user
    user = new User({ name }); // 'coins' will default to 1000 as defined in the schema
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).send("Error adding user");
  }
};

// Function to add coins to a user's account, admin only
// exports.addCoinsToUser = async (req, res) => {
exports.addOrSubtractCoins = async (req, res) => {
  const { userId, amount, operation } = req.body; // 'operation' could be 'add' or 'subtract'

  try {
    if (!req.user.isAdmin) {
      return res.status(403).send("Unauthorized: Only admins can modify coins");
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Perform the operation based on the 'operation' value
    if (operation === "add") {
      user.coins += Math.abs(amount); // Ensure amount is positive to avoid unintended subtraction
    } else if (operation === "subtract") {
      user.coins -= Math.abs(amount); // Ensure amount is positive to avoid unintended addition
      // Optional: prevent user coins from going negative
      if (user.coins < 0) {
        user.coins = 0; // Or handle this case differently, e.g., by returning an error
      }
    } else {
      return res.status(400).send("Invalid operation");
    }

    await user.save();
    res.json(user);
  } catch (error) {
    console.error("Error modifying user coins:", error);
    res.status(500).send("Error modifying user coins");
  }
};
