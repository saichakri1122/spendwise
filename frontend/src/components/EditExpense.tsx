"use client";

import { useState } from "react";

type Expense = {
  id: number;
  user_id: number;
  amount: string;
  category: string;
  description: string | null;
  expense_date: string;
  created_at: string;
};

type EditExpenseProps = {
  expense: Expense;
  onUpdated: (updatedExpense: Expense) => void;
};

export default function EditExpense({
  expense,
  onUpdated,
}: EditExpenseProps) {
  const [showModal, setShowModal] =
    useState(false);

  const [amount, setAmount] =
    useState(expense.amount);

  const [category, setCategory] =
    useState(expense.category);

  const [description, setDescription] =
    useState(expense.description || "");

  const [expenseDate, setExpenseDate] =
    useState(
      expense.expense_date.split("T")[0]
    );

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleUpdate = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/expenses/${expense.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount,
            category,
            description,
            expense_date: expenseDate,
          }),
        }
      );

      const responseText =
        await response.text();

      let data;

      try {
        data = JSON.parse(responseText);
      } catch {
        console.error(
          "Backend returned non-JSON:",
          responseText
        );

        setError(
          "Server returned an unexpected response."
        );

        return;
      }

      if (!response.ok) {
        setError(
          data.message ||
            "Failed to update expense."
        );

        return;
      }

      onUpdated(data.expense);

      setShowModal(false);

    } catch (error) {
      console.error(
        "Update expense error:",
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
    <>
      <button
        type="button"
        onClick={() =>
          setShowModal(true)
        }
        className="cursor-pointer rounded-lg px-3 py-2 text-sm font-semibold text-[#668172] transition hover:bg-[#E8F0E8]"
      >
        Edit
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6 sm:px-6">

          <div className="max-h-[calc(100vh-48px)] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-xl sm:p-7">

            <div className="flex items-center justify-between gap-4">

              <h2 className="text-xl font-bold text-[#183B2A] sm:text-2xl">
                Edit Expense
              </h2>

              <button
                type="button"
                onClick={() =>
                  setShowModal(false)
                }
                aria-label="Close"
                className="shrink-0 cursor-pointer text-xl text-[#668172] hover:text-[#183B2A]"
              >
                ×
              </button>

            </div>

            <form
              onSubmit={handleUpdate}
              className="mt-6 space-y-5"
            >

              {/* Amount */}
              <div>

                <label
                  htmlFor={`edit-amount-${expense.id}`}
                  className="text-sm font-semibold text-[#183B2A]"
                >
                  Amount
                </label>

                <div className="relative mt-2">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-[#668172]">
                    ₹
                  </span>

                  <input
                    id={`edit-amount-${expense.id}`}
                    type="number"
                    min="0"
                    step="0.01"
                    value={amount}
                    onChange={(e) =>
                      setAmount(
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-gray-200 py-3 pl-9 pr-4 outline-none focus:border-[#668172] focus:ring-2 focus:ring-[#E8F0E8]"
                  />

                </div>

              </div>

              {/* Category */}
              <div>

                <label
                  htmlFor={`edit-category-${expense.id}`}
                  className="text-sm font-semibold text-[#183B2A]"
                >
                  Category
                </label>

                <select
                  id={`edit-category-${expense.id}`}
                  value={category}
                  onChange={(e) =>
                    setCategory(
                      e.target.value
                    )
                  }
                  className="mt-2 w-full cursor-pointer rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-[#668172] focus:ring-2 focus:ring-[#E8F0E8]"
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
              <div>

                <label
                  htmlFor={`edit-description-${expense.id}`}
                  className="text-sm font-semibold text-[#183B2A]"
                >
                  Description
                </label>

                <textarea
                  id={`edit-description-${expense.id}`}
                  value={description}
                  onChange={(e) =>
                    setDescription(
                      e.target.value
                    )
                  }
                  rows={3}
                  className="mt-2 w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#668172] focus:ring-2 focus:ring-[#E8F0E8]"
                />

              </div>

              {/* Date */}
              <div>

                <label
                  htmlFor={`edit-date-${expense.id}`}
                  className="text-sm font-semibold text-[#183B2A]"
                >
                  Expense Date
                </label>

                <input
                  id={`edit-date-${expense.id}`}
                  type="date"
                  value={expenseDate}
                  onChange={(e) =>
                    setExpenseDate(
                      e.target.value
                    )
                  }
                  className="mt-2 w-full cursor-pointer rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-[#668172] focus:ring-2 focus:ring-[#E8F0E8]"
                />

              </div>

              {/* Error */}
              {error && (
                <p className="text-sm font-medium leading-5 text-red-600">
                  {error}
                </p>
              )}

              {/* Buttons */}
              <div className="flex flex-col gap-3 pt-2 sm:flex-row">

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="flex-1 cursor-pointer rounded-xl border border-gray-200 py-3 font-semibold text-[#526158] transition hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 cursor-pointer rounded-xl bg-[#183B2A] py-3 font-semibold text-white transition hover:bg-[#24553D] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "Updating..."
                    : "Update Expense"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}
    </>
  );
}