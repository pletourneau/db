require("dotenv").config(); // to use environment variables from .env file
const express = require("express");
const mongoose = require("mongoose"); // Import mongoose
const User = require("./User"); // Import your User model
const userRoutes = require("./routes/users");
const betRoutes = require("./routes/bets");

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

app.use("/api/users", userRoutes);
app.use("/api/bets", betRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
