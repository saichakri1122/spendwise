const pool = require("../config/database");

async function addExpense(req, res) {
  try {
    const {
      user_id,
      amount,
      category,
      description,
      expense_date,
    } = req.body;

    if (!user_id || !amount || !category || !expense_date) {
      return res.status(400).json({
        message: "User, amount, category and expense date are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO expenses
       (user_id, amount, category, description, expense_date)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, user_id, amount, category, description, expense_date, created_at`,
      [
        user_id,
        amount,
        category,
        description || null,
        expense_date,
      ]
    );

    res.status(201).json({
      message: "Expense added successfully",
      expense: result.rows[0],
    });
  } catch (error) {
    console.error("Add expense error:", error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
}


async function getUserExpenses(req, res) {
  try {
    const { userId } = req.params;

    const result = await pool.query(
      `SELECT
        id,
        user_id,
        amount,
        category,
        description,
        expense_date,
        created_at
       FROM expenses
       WHERE user_id = $1
       ORDER BY expense_date DESC, created_at DESC`,
      [userId]
    );

    res.status(200).json({
      expenses: result.rows,
    });
  } catch (error) {
    console.error("Get expenses error:", error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
}
module.exports = {
  addExpense,
  getUserExpenses,
};