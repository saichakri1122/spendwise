"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddExpense() {
  const router = useRouter();

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [expenseDate, setExpenseDate] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const savedUser =
        localStorage.getItem("spendwiseUser");

      if (!savedUser) {
        setError(
          "User session not found. Please login again."
        );
        return;
      }

      // Prevent future dates
      if (expenseDate > today) {
        setError(
          "Expense date cannot be in the future."
        );
        return;
      }

      const user = JSON.parse(savedUser);

      const response = await fetch(
        "http://localhost:5000/api/expenses",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user.id,
            amount,
            category,
            description,
            expense_date: expenseDate,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            "Failed to add expense."
        );
        return;
      }

      setSuccess(
        "Expense added successfully!"
      );

      setAmount("");
      setCategory("");
      setDescription("");
      setExpenseDate("");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);

    } catch (error) {
      console.error(
        "Add expense failed:",
        error
      );

      setError(
        "Unable to connect to the server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F8F3] px-6 py-12">
      <div className="mx-auto max-w-2xl">

        <a
          href="/dashboard"
          className="text-sm font-semibold text-[#668172] hover:text-[#183B2A]"
        >
          ← Back to Dashboard
        </a>

        <div className="mt-8">

          <p className="text-sm font-semibold uppercase tracking-widest text-[#668172]">
            Expenses
          </p>

          <h1 className="mt-2 text-4xl font-bold text-[#183B2A]">
            Add an expense
          </h1>

          <p className="mt-3 text-[#526158]">
            Record your spending and keep your finances organized.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-3xl bg-white p-8 shadow-sm"
        >

          {/* Amount */}
          <div>

            <label
              htmlFor="amount"
              className="text-sm font-semibold text-[#183B2A]"
            >
              Amount
            </label>

            <div className="relative mt-2">

              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-[#668172]">
                ₹
              </span>

              <input
                id="amount"
                type="number"
                min="0"
                step="0.01"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value)
                }
                placeholder="0.00"
                className="w-full rounded-xl border border-gray-200 py-3 pl-9 pr-4 outline-none transition focus:border-[#668172] focus:ring-2 focus:ring-[#E8F0E8]"
                required
              />

            </div>

          </div>

          {/* Category */}
          <div className="mt-5">

            <label
              htmlFor="category"
              className="text-sm font-semibold text-[#183B2A]"
            >
              Category
            </label>

            <select
              id="category"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="mt-2 w-full cursor-pointer rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-[#668172] focus:ring-2 focus:ring-[#E8F0E8]"
              required
            >

              <option value="">
                Select a category
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

          {/* Description */}
          <div className="mt-5">

            <label
              htmlFor="description"
              className="text-sm font-semibold text-[#183B2A]"
            >
              Description
            </label>

            <textarea
              id="description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="What did you spend on?"
              rows={4}
              className="mt-2 w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#668172] focus:ring-2 focus:ring-[#E8F0E8]"
            />

          </div>

          {/* Date */}
          <div className="mt-5">

            <label
              htmlFor="expenseDate"
              className="text-sm font-semibold text-[#183B2A]"
            >
              Expense Date
            </label>

            <input
              id="expenseDate"
              type="date"
              value={expenseDate}
              max={today}
              onChange={(e) =>
                setExpenseDate(e.target.value)
              }
              className="mt-2 w-full cursor-pointer rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-[#668172] focus:ring-2 focus:ring-[#E8F0E8]"
              required
            />

            <p className="mt-2 text-xs text-[#8A968E]">
              Future dates cannot be selected.
            </p>

          </div>

          {/* Messages */}
          {error && (
            <p className="mt-4 text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          {success && (
            <p className="mt-4 text-sm font-medium text-green-700">
              {success}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-7 w-full cursor-pointer rounded-xl bg-[#183B2A] py-3.5 font-semibold text-white transition hover:bg-[#24553D] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Adding expense..."
              : "Add Expense"}
          </button>

        </form>

      </div>
    </main>
  );
}