const express = require("express");

const {
  addExpense,
  getUserExpenses,
} = require("../controllers/expenseController");

const router = express.Router();

router.post("/", addExpense);

router.get("/:userId", getUserExpenses);

module.exports = router;