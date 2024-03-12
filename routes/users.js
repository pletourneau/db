// users.js

const express = require("express");
const router = express.Router();
const {
  addUser,
  addCoinsToUser,
  addOrSubtractCoins,
} = require("../controllers/userController");

router.post("/add", addUser);
router.put("/coins/add", addOrSubtractCoins);

module.exports = router;
