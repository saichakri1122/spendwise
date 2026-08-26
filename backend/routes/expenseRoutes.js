const express = require("express");

const {
  addExpense,
  getUserExpenses,
  deleteExpense,
  updateExpense,
} = require("../controllers/expenseController");

const router = express.Router();

router.post("/", addExpense);

router.get("/:userId", getUserExpenses);
router.delete("/:id", deleteExpense);
router.put("/:id", updateExpense);

module.exports = router;