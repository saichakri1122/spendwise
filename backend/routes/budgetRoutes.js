const express = require("express");

const {
  setBudget,
  getMonthlyBudget,
} = require("../controllers/budgetController");

const router = express.Router();

router.post("/", setBudget);

router.get("/:userId/:year/:month", getMonthlyBudget);

module.exports = router;