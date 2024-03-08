require("dotenv").config(); // to use environment variables from .env file
const express = require("express");
const mongoose = require("mongoose"); // Import mongoose
const User = require("./User"); // Import your User model

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// MongoDB connection with Mongoose
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Test route to insert and fetch user
app.get("/test", async (req, res) => {
  try {
    // Insert a new user
    const newUser = await User.create({
      name: "Test User",
      email: "test@example.com",
    });
    // Send the new user as response
    res.json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Error creating user");
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
