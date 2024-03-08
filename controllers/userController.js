const User = require("../models/User"); // Adjust the path based on your project structure

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
exports.addCoinsToUser = async (req, res) => {
  const { userId, amount } = req.body; // Assuming 'userId' and 'amount' are passed as request parameters

  try {
    if (!req.user.isAdmin) {
      return res.status(403).send("Unauthorized: Only admins can add coins");
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Add the coins to the user's account
    user.coins += amount;
    await user.save();

    res.json(user); // Send back the updated user info
  } catch (error) {
    console.error("Error adding coins to user:", error);
    res.status(500).send("Error adding coins to user");
  }
};

exports.addCoinsToUser = async (req, res) => {
  // Implement logic to add coins to user account
};
