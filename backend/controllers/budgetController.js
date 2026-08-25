const pool = require("../config/database");

async function setBudget(req, res) {
  try {
    const { user_id, amount, month, year } = req.body;

    if (!user_id || !amount || !month || !year) {
      return res.status(400).json({
        message: "User, amount, month and year are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO budgets (user_id, amount, month, year)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (user_id, month, year)
       DO UPDATE SET amount = EXCLUDED.amount
       RETURNING id, user_id, amount, month, year, created_at`,
      [user_id, amount, month, year]
    );

    res.status(201).json({
      message: "Budget saved successfully",
      budget: result.rows[0],
    });
  } catch (error) {
    console.error("Set budget error:", error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
}

async function getMonthlyBudget(req, res) {
  try {
    const { userId, year, month } = req.params;

    const result = await pool.query(
      `SELECT id, user_id, amount, month, year, created_at
       FROM budgets
       WHERE user_id = $1
       AND year = $2
       AND month = $3`,
      [userId, year, month]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Budget not set for this month",
      });
    }

    res.status(200).json({
      budget: result.rows[0],
    });
  } catch (error) {
    console.error("Get budget error:", error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
}

module.exports = {
  setBudget,
  getMonthlyBudget,
};