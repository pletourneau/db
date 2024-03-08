require("dotenv").config();
const mongoose = require("mongoose");
const User = require("models/User"); // Update the path as per your project structure

const seedAdmin = async () => {
  // Connect to MongoDB
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

  // Check if an admin already exists
  const existingAdmin = await User.findOne({ name: "Paul", isAdmin: true });
  if (existingAdmin) {
    console.log("Admin user already exists");
    await mongoose.disconnect();
    return;
  }

  // Create a new admin user
  const adminUser = new User({
    name: "Paul",
    // Assuming default coins value is set in the model, so it's not needed here
    isAdmin: true,
  });

  await adminUser.save();
  console.log("Admin user created");

  // Disconnect from MongoDB
  await mongoose.disconnect();
};

seedAdmin().catch((err) => console.error("Error seeding admin:", err));
