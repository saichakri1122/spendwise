"use client";

import { useEffect, useState } from "react";
import BudgetCard from "@/components/BudgetCard";
import BudgetModal from "@/components/BudgetModal";
import LogoutButton from "@/components/LogoutButton";

type Expense = {
  id: number;
  user_id: number;
  amount: string;
  category: string;
  description: string | null;
  expense_date: string;
  created_at: string;
};

export default function Dashboard() {
  const [username, setUsername] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  const [monthlyBudget, setMonthlyBudget] =
    useState<number | null>(null);

  const [budgetLoading, setBudgetLoading] =
    useState(true);

  const [showBudgetModal, setShowBudgetModal] =
    useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const savedUser =
          localStorage.getItem("spendwiseUser");

        if (!savedUser) {
          setLoading(false);
          setBudgetLoading(false);
          return;
        }

        const user = JSON.parse(savedUser);

        setUsername(user.name);

        /* -----------------------------
           Fetch Expenses
        ----------------------------- */

        const expenseResponse = await fetch(
          `http://localhost:5000/api/expenses/${user.id}`
        );

        const expenseData =
          await expenseResponse.json();

        if (!expenseResponse.ok) {
          console.error(
            "Failed to fetch expenses:",
            expenseData.message
          );
        } else {
          setExpenses(expenseData.expenses);
        }

        /* -----------------------------
           Fetch Current Month Budget
        ----------------------------- */

        const currentDate = new Date();

        const currentYear =
          currentDate.getFullYear();

        const currentMonth =
          currentDate.getMonth() + 1;

        const budgetResponse = await fetch(
          `http://localhost:5000/api/budgets/${user.id}/${currentYear}/${currentMonth}`
        );

        if (budgetResponse.ok) {
          const budgetData =
            await budgetResponse.json();

          setMonthlyBudget(
            Number(budgetData.budget.amount)
          );

          setShowBudgetModal(false);
        } else {
          setMonthlyBudget(null);
          setShowBudgetModal(true);
        }

      } catch (error) {
        console.error(
          "Error fetching dashboard data:",
          error
        );
      } finally {
        setLoading(false);
        setBudgetLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  /* -----------------------------
     Current Month
  ----------------------------- */

  const currentDate = new Date();

  const currentYear =
    currentDate.getFullYear();

  const currentMonth =
    currentDate.getMonth() + 1;

  /* -----------------------------
     Current Month Expenses
     Used ONLY for Budget
  ----------------------------- */

  const currentMonthExpenses =
    expenses.filter((expense) => {
      const date =
        expense.expense_date
          .split("T")[0]
          .split("-")
          .map(Number);

      const expenseYear = date[0];
      const expenseMonth = date[1];

      return (
        expenseYear === currentYear &&
        expenseMonth === currentMonth
      );
    });

  const monthlySpent =
    currentMonthExpenses.reduce(
      (total, expense) =>
        total + Number(expense.amount),
      0
    );

  /* -----------------------------
     Calendar Filtering
  ----------------------------- */

  const filteredExpenses = selectedDate
    ? expenses.filter((expense) => {
        const expenseDate =
          expense.expense_date.split("T")[0];

        return expenseDate === selectedDate;
      })
    : expenses;

  /* -----------------------------
     Dashboard Calculations
  ----------------------------- */

  const totalSpending =
    filteredExpenses.reduce(
      (total, expense) =>
        total + Number(expense.amount),
      0
    );

  const transactionCount =
    filteredExpenses.length;

  const averageExpense =
    transactionCount > 0
      ? totalSpending / transactionCount
      : 0;

  /* -----------------------------
     Category Calculations
  ----------------------------- */

  const categoryTotals =
    filteredExpenses.reduce(
      (totals, expense) => {
        const category =
          expense.category;

        totals[category] =
          (totals[category] || 0) +
          Number(expense.amount);

        return totals;
      },
      {} as Record<string, number>
    );

  const categories =
    Object.entries(categoryTotals).sort(
      ([, amountA], [, amountB]) =>
        amountB - amountA
    );

  const highestCategoryAmount =
    categories.length > 0
      ? categories[0][1]
      : 0;

  return (
    <main className="min-h-screen bg-[#F7F8F3]">

      {/* Header */}
      <header className="border-b border-[#E2E8E2] bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <a
            href="/"
            className="text-2xl font-bold text-[#183B2A]"
          >
            SpendWise
          </a>

          <div className="flex items-center gap-5">

            <span className="text-sm font-medium text-[#526158]">
              Welcome back
              {username
                ? `, ${username}`
                : ""}
            </span>

            <LogoutButton />

          </div>

        </div>

      </header>

      {/* Dashboard */}
      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Heading + Calendar */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

          <div>

            <p className="text-sm font-semibold uppercase tracking-widest text-[#668172]">
              Dashboard
            </p>

            <h1 className="mt-2 text-4xl font-bold text-[#183B2A]">
              Your finances at a glance.
            </h1>

            <p className="mt-3 text-[#526158]">
              Track your spending, understand your habits, and stay in control.
            </p>

          </div>

          {/* Calendar */}
          <div>

            <label
              htmlFor="date"
              className="mb-2 block text-sm font-semibold text-[#183B2A]"
            >
              Select Date
            </label>

            <input
              id="date"
              type="date"
              value={selectedDate}
              onChange={(e) =>
                setSelectedDate(
                  e.target.value
                )
              }
              className="cursor-pointer rounded-xl border border-[#D5DED6] bg-white px-4 py-3 text-sm text-[#183B2A] outline-none transition focus:border-[#668172] focus:ring-2 focus:ring-[#E8F0E8]"
            />

          </div>

        </div>

        {/* Selected Date Indicator */}
        {selectedDate && (
          <div className="mt-5 flex items-center justify-between rounded-2xl bg-[#E8F0E8] px-5 py-3">

            <p className="text-sm font-medium text-[#183B2A]">
              Showing expenses for{" "}
              {selectedDate}
            </p>

            <button
              type="button"
              onClick={() =>
                setSelectedDate("")
              }
              className="cursor-pointer text-sm font-semibold text-[#668172] hover:text-[#183B2A]"
            >
              Clear
            </button>

          </div>
        )}

        {/* Summary Cards */}
        <div className="mt-10 grid gap-5 md:grid-cols-3">

          {/* Total Spending */}
          <div className="rounded-3xl bg-[#183B2A] p-7 text-white">

            <p className="text-sm text-[#C5D4CA]">
              Total Spending
            </p>

            <h2 className="mt-4 text-4xl font-bold">
              {loading
                ? "..."
                : `₹${totalSpending.toFixed(
                    2
                  )}`}
            </h2>

            <p className="mt-2 text-sm text-[#C5D4CA]">
              {selectedDate
                ? "Selected date"
                : "All recorded expenses"}
            </p>

          </div>

          {/* Transactions */}
          <div className="rounded-3xl bg-white p-7">

            <p className="text-sm text-[#668172]">
              Transactions
            </p>

            <h2 className="mt-4 text-4xl font-bold text-[#183B2A]">
              {loading
                ? "..."
                : transactionCount}
            </h2>

            <p className="mt-2 text-sm text-[#526158]">
              {selectedDate
                ? "Selected date"
                : "Total transactions"}
            </p>

          </div>

          {/* Average Expense */}
          <div className="rounded-3xl bg-white p-7">

            <p className="text-sm text-[#668172]">
              Average Expense
            </p>

            <h2 className="mt-4 text-4xl font-bold text-[#183B2A]">
              {loading
                ? "..."
                : `₹${averageExpense.toFixed(
                    2
                  )}`}
            </h2>

            <p className="mt-2 text-sm text-[#526158]">
              Per transaction
            </p>

          </div>

        </div>

        {/* Monthly Budget */}
        {!budgetLoading &&
          monthlyBudget !== null && (
            <BudgetCard
              monthlyBudget={
                monthlyBudget
              }
              budgetSpent={
                monthlySpent
              }
            />
          )}

        {/* Main Content */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">

          {/* Recent Expenses */}
          <div className="rounded-3xl bg-white p-7 lg:col-span-2">

            <div className="flex items-center justify-between gap-4">

              <div>

                <h2 className="text-2xl font-bold text-[#183B2A]">
                  Recent Expenses
                </h2>

                <p className="mt-1 text-sm text-[#526158]">
                  {selectedDate
                    ? "Expenses for the selected date."
                    : "Your latest spending activity."}
                </p>

              </div>

              <a
                href="/dashboard/expenses/add"
                className="cursor-pointer whitespace-nowrap rounded-xl bg-[#E8F0E8] px-4 py-2 text-sm font-semibold text-[#183B2A] transition hover:bg-[#DCE8DD]"
              >
                + Add Expense
              </a>

            </div>

            {/* Expense List */}
            <div className="mt-8 space-y-3">

              {loading ? (

                <div className="rounded-2xl border border-dashed border-[#D5DED6] p-10 text-center">

                  <p className="font-medium text-[#526158]">
                    Loading expenses...
                  </p>

                </div>

              ) : filteredExpenses.length === 0 ? (

                <div className="rounded-2xl border border-dashed border-[#D5DED6] p-10 text-center">

                  <p className="font-medium text-[#526158]">
                    {selectedDate
                      ? "No expenses for this date"
                      : "No expenses yet"}
                  </p>

                  <p className="mt-2 text-sm text-[#8A968E]">
                    {selectedDate
                      ? "Try selecting another date."
                      : "Add your first expense to start tracking your spending."}
                  </p>

                </div>

              ) : (

                filteredExpenses
                  .slice(0, 5)
                  .map((expense) => (

                    <div
                      key={expense.id}
                      className="flex items-center justify-between rounded-2xl border border-[#E8EEE8] px-5 py-4 transition hover:bg-[#F7F8F3]"
                    >

                      <div>

                        <p className="font-semibold text-[#183B2A]">
                          {expense.category}
                        </p>

                        <p className="mt-1 text-sm text-[#8A968E]">
                          {expense.description ||
                            "No description"}{" "}
                          •{" "}
                          {expense.expense_date}
                        </p>

                      </div>

                      <p className="font-bold text-[#183B2A]">
                        ₹
                        {Number(
                          expense.amount
                        ).toFixed(2)}
                      </p>

                    </div>

                  ))

              )}

            </div>

          </div>

          {/* Spending Categories */}
          <div className="rounded-3xl bg-white p-7">

            <h2 className="text-2xl font-bold text-[#183B2A]">
              Spending Categories
            </h2>

            <p className="mt-1 text-sm text-[#526158]">
              See where your money goes.
            </p>

            <div className="mt-8 space-y-6">

              {loading ? (

                <p className="text-sm text-[#526158]">
                  Loading categories...
                </p>

              ) : categories.length === 0 ? (

                <div className="rounded-2xl border border-dashed border-[#D5DED6] p-6 text-center">

                  <p className="text-sm font-medium text-[#526158]">
                    No spending data yet
                  </p>

                  <p className="mt-2 text-xs text-[#8A968E]">
                    {selectedDate
                      ? "No categories for this date."
                      : "Add an expense to see your categories."}
                  </p>

                </div>

              ) : (

                categories.map(
                  ([category, amount]) => {

                    const percentage =
                      highestCategoryAmount >
                      0
                        ? (amount /
                            highestCategoryAmount) *
                          100
                        : 0;

                    return (
                      <div
                        key={category}
                      >

                        <div className="flex justify-between text-sm">

                          <span className="font-medium text-[#526158]">
                            {category}
                          </span>

                          <span className="font-semibold text-[#183B2A]">
                            ₹
                            {amount.toFixed(
                              2
                            )}
                          </span>

                        </div>

                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#E8F0E8]">

                          <div
                            className="h-full rounded-full bg-[#668172] transition-all"
                            style={{
                              width: `${percentage}%`,
                            }}
                          />

                        </div>

                      </div>
                    );
                  }
                )

              )}

            </div>

          </div>

        </div>

      </div>

      {/* Budget Modal */}
      {showBudgetModal && (
        <BudgetModal
          onClose={() =>
            setShowBudgetModal(false)
          }
          onBudgetSaved={(amount) => {
            setMonthlyBudget(amount);
            setShowBudgetModal(false);
          }}
        />
      )}

    </main>
  );
}