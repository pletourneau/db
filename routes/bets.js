const express = require("express");
const router = express.Router();
const {
  placeBet,
  createQuestion,
  resolveQuestion,
} = require("../controllers/betController");

router.post("/place", placeBet);
router.post("/question/add", createQuestion);
router.put("/question/resolve", resolveQuestion);

module.exports = router;
