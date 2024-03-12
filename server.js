require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const userRoutes = require("./routes/users");
const betRoutes = require("./routes/bets");

const app = express();
app.use(express.json());

// MongoDB connection with Mongoose
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const cors = require("cors");
app.use(cors());
app.use("/api/users", userRoutes);
app.use("/api/bets", betRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
