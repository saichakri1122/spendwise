const pool = require("../config/database");

async function chatWithAI(req, res) {
  try {
    const { user_id, message } = req.body;

    console.log("=================================");
    console.log("AI User ID:", user_id);
    console.log("AI Message:", message);

    if (!user_id || !message) {
      return res.status(400).json({
        message: "User ID and message are required",
      });
    }

    /* -----------------------------
       Get User Expenses
    ----------------------------- */

    const expenseResult = await pool.query(
      `SELECT
        amount,
        category,
        description,
        expense_date
       FROM expenses
       WHERE user_id = $1
       ORDER BY expense_date DESC, created_at DESC`,
      [user_id]
    );

    const expenses = expenseResult.rows;

    console.log("AI Expenses:", expenses);

    /* -----------------------------
       Get Current Month Budget
    ----------------------------- */

    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;

    const budgetResult = await pool.query(
      `SELECT amount
       FROM budgets
       WHERE user_id = $1
       AND year = $2
       AND month = $3`,
      [user_id, year, month]
    );

    const budget =
      budgetResult.rows.length > 0
        ? Number(budgetResult.rows[0].amount)
        : null;

    console.log("AI Budget:", budget);

    /* -----------------------------
       Current Month Expenses
    ----------------------------- */

    const currentMonthExpenses =
      expenses.filter((expense) => {
        const expenseDate =
          new Date(expense.expense_date);

        return (
          expenseDate.getFullYear() === year &&
          expenseDate.getMonth() + 1 === month
        );
      });

    /* -----------------------------
       Calculate Current Month Spending
    ----------------------------- */

    const totalSpent = currentMonthExpenses.reduce(
      (total, expense) =>
        total + Number(expense.amount),
      0
    );

    /* -----------------------------
       Calculate Category Spending
    ----------------------------- */

    const categoryTotals = {};

    currentMonthExpenses.forEach(
      (expense) => {
        const category =
          expense.category;

        categoryTotals[category] =
          (categoryTotals[category] || 0) +
          Number(expense.amount);
      }
    );

    /* -----------------------------
       Remaining Budget
    ----------------------------- */

    const remainingBudget =
      budget !== null
        ? budget - totalSpent
        : null;

    /* -----------------------------
       Financial Context
    ----------------------------- */

    const financialContext = {
      currentMonth: month,
      currentYear: year,
      monthlyBudget: budget,
      totalSpentThisMonth: totalSpent,
      remainingBudget,
      categorySpending: categoryTotals,
      currentMonthExpenses,
    };

    console.log(
      "Financial Context:",
      financialContext
    );

    /* -----------------------------
       Send Data to OpenRouter
    ----------------------------- */

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          model: "openrouter/free",

          messages: [
            {
              role: "system",

              content: `
You are SpendWise AI, a personal financial assistant.

You are given the user's REAL financial data from the SpendWise application.

IMPORTANT RULES:

1. Always use the provided financial data.
2. Never invent expenses, budgets, transactions, or amounts.
3. If the requested information is not available, clearly say so.
4. When the user asks about "this month", use the current month data provided.
5. Answer financial questions using Indian Rupees (₹).
6. Keep answers simple, clear and conversational.
7. Do not ask the user to provide transaction data because the data is already provided below.
8. Do not pretend to have access to information that is not present in the data.

USER FINANCIAL DATA:

${JSON.stringify(
  financialContext,
  null,
  2
)}
              `,
            },

            {
              role: "user",
              content: message,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(
        "OpenRouter error:",
        data
      );

      return res.status(response.status).json({
        message:
          data.error?.message ||
          "AI request failed",
      });
    }

    const reply =
      data.choices?.[0]?.message?.content;

    if (!reply) {
      return res.status(500).json({
        message:
          "AI returned an empty response",
      });
    }

    console.log("AI Reply:", reply);
    console.log("=================================");

    res.status(200).json({
      reply,
    });
  } catch (error) {
    console.error(
      "AI chat error:",
      error
    );

    res.status(500).json({
      message:
        "Something went wrong while processing your request",
    });
  }
}

module.exports = {
  chatWithAI,
};