// users.js

const express = require("express");
const router = express.Router();
const { addUser, addCoinsToUser } = require("../controllers/userController");

router.post("/add", addUser);
router.put("/coins/add", addCoinsToUser);

module.exports = router;
