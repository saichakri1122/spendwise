"use client";

import { useEffect, useState } from "react";
import BudgetCard from "@/components/BudgetCard";
import BudgetModal from "@/components/BudgetModal";
import EditBudget from "@/components/EditBudget";
import LogoutButton from "@/components/LogoutButton";
import ProtectedRoute from "@/components/ProtectedRoute";
import DeleteExpense from "@/components/DeleteExpense";
import EditExpense from "@/components/EditExpense";
import AIBot from "@/components/AIBot";

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
  const [selectedCategory, setSelectedCategory] = useState("");

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  const [monthlyBudget, setMonthlyBudget] =
    useState<number | null>(null);

  const [budgetLoading, setBudgetLoading] =
    useState(true);

  const [showBudgetModal, setShowBudgetModal] =
    useState(false);

  const [showEditBudget, setShowEditBudget] =
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
          `${process.env.NEXT_PUBLIC_API_URL}/api/expenses/${user.id}`
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
          `${process.env.NEXT_PUBLIC_API_URL}/api/budgets/${user.id}/${currentYear}/${currentMonth}`
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
     Handle Deleted Expense
  ----------------------------- */

  const handleExpenseDeleted = (
    expenseId: number
  ) => {
    setExpenses((currentExpenses) =>
      currentExpenses.filter(
        (expense) =>
          expense.id !== expenseId
      )
    );
  };

  /* -----------------------------
     Handle Updated Expense
  ----------------------------- */

  const handleExpenseUpdated = (
    updatedExpense: Expense
  ) => {
    setExpenses((currentExpenses) =>
      currentExpenses.map((expense) =>
        expense.id === updatedExpense.id
          ? updatedExpense
          : expense
      )
    );
  };

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
     Date + Category Filtering
  ----------------------------- */

  const filteredExpenses =
    expenses.filter((expense) => {
      const matchesDate = selectedDate
        ? expense.expense_date.split("T")[0] ===
          selectedDate
        : true;

      const matchesCategory = selectedCategory
        ? expense.category === selectedCategory
        : true;

      return matchesDate && matchesCategory;
    });

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
    <ProtectedRoute>
      <main className="min-h-screen bg-[#F7F8F3]">

        {/* Header */}
{/* Header */}
<header className="border-b border-[#E2E8E2] bg-white">
  <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-5">

    {/* Mobile Header */}
    <div className="flex flex-col gap-3 sm:hidden">

      <div className="flex items-center justify-between gap-3">

        <a
          href="/"
          className="shrink-0 text-xl font-bold text-[#183B2A]"
        >
          SpendWise
        </a>

        <LogoutButton />

      </div>

      <h2 className="text-lg font-bold leading-6 text-[#183B2A]">
        Welcome back
        {username ? `, ${username}` : ""}
      </h2>

    </div>

    {/* Desktop Header */}
    <div className="hidden items-center justify-between sm:flex">

      <a
        href="/"
        className="text-2xl font-bold text-[#183B2A]"
      >
        SpendWise
      </a>

      <div className="flex items-center gap-5">

        <h2 className="text-2xl font-bold text-[#183B2A]">
          Welcome back
          {username ? `, ${username}` : ""}
        </h2>

        <LogoutButton />

      </div>

    </div>

  </div>
</header>

        {/* Dashboard */}
        <div className="mx-auto max-w-7xl px-6 py-10">

          {/* Heading + Filters */}
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

            {/* Filters */}
            <div className="flex flex-col gap-4 sm:flex-row">

              {/* Date Filter */}
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

              {/* Category Filter */}
              <div>

                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-semibold text-[#183B2A]"
                >
                  Select Category
                </label>

                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) =>
                    setSelectedCategory(
                      e.target.value
                    )
                  }
                  className="cursor-pointer rounded-xl border border-[#D5DED6] bg-white px-4 py-3 text-sm text-[#183B2A] outline-none transition focus:border-[#668172] focus:ring-2 focus:ring-[#E8F0E8]"
                >

                  <option value="">
                    All Categories
                  </option>

                  <option value="Food">
                    Food
                  </option>

                  <option value="Shopping">
                    Shopping
                  </option>

                  <option value="Transport">
                    Transport
                  </option>

                  <option value="Bills">
                    Bills
                  </option>

                  <option value="Entertainment">
                    Entertainment
                  </option>

                  <option value="Healthcare">
                    Healthcare
                  </option>

                  <option value="Education">
                    Education
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

              </div>

            </div>

          </div>

          {/* Selected Filters Indicator */}
          {(selectedDate ||
            selectedCategory) && (
            <div className="mt-5 flex items-center justify-between rounded-2xl bg-[#E8F0E8] px-5 py-3">

              <p className="text-sm font-medium text-[#183B2A]">

                Showing:
                {selectedDate &&
                  ` ${selectedDate}`}

                {selectedDate &&
                  selectedCategory &&
                  " • "}

                {selectedCategory &&
                  ` ${selectedCategory}`}

              </p>

              <button
                type="button"
                onClick={() => {
                  setSelectedDate("");
                  setSelectedCategory("");
                }}
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
                {selectedDate ||
                selectedCategory
                  ? "Filtered expenses"
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
                {selectedDate ||
                selectedCategory
                  ? "Filtered transactions"
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
              <div>

                <BudgetCard
                  monthlyBudget={
                    monthlyBudget
                  }
                  budgetSpent={
                    monthlySpent
                  }
                />

                <div className="mt-3 flex justify-end">

                  <button
                    type="button"
                    onClick={() =>
                      setShowEditBudget(true)
                    }
                    className="cursor-pointer rounded-xl bg-[#E8F0E8] px-4 py-2 text-sm font-semibold text-[#183B2A] transition hover:bg-[#DCE8DD]"
                  >
                    Edit Budget
                  </button>

                </div>

              </div>
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
                    {selectedDate ||
                    selectedCategory
                      ? "Expenses matching your filters."
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
                      {selectedDate ||
                      selectedCategory
                        ? "No matching expenses"
                        : "No expenses yet"}
                    </p>

                    <p className="mt-2 text-sm text-[#8A968E]">
                      {selectedDate ||
                      selectedCategory
                        ? "Try changing your filters."
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

                        <div className="flex items-center gap-4">

                          <p className="font-bold text-[#183B2A]">
                            ₹
                            {Number(
                              expense.amount
                            ).toFixed(2)}
                          </p>

                          <EditExpense
                            expense={expense}
                            onUpdated={
                              handleExpenseUpdated
                            }
                          />

                          <DeleteExpense
                            expenseId={expense.id}
                            onDeleted={
                              handleExpenseDeleted
                            }
                          />

                        </div>

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
                      {selectedDate ||
                      selectedCategory
                        ? "No categories match your filters."
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

        {/* Edit Budget */}
        {showEditBudget &&
          monthlyBudget !== null && (
            <EditBudget
              currentAmount={monthlyBudget}
              month={currentMonth}
              year={currentYear}
              userId={
                JSON.parse(
                  localStorage.getItem(
                    "spendwiseUser"
                  ) || "{}"
                ).id
              }
              onUpdated={(amount) => {
                setMonthlyBudget(amount);
              }}
              onClose={() =>
                setShowEditBudget(false)
              }
            />
          )}

        {/* SpendWise AI */}
        <AIBot username={username} />

      </main>
    </ProtectedRoute>
  );
}