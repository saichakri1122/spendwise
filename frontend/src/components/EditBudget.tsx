"use client";

import { useState } from "react";

type EditBudgetProps = {
  currentAmount: number;
  month: number;
  year: number;
  userId: number;
  onUpdated: (amount: number) => void;
  onClose: () => void;
};

export default function EditBudget({
  currentAmount,
  month,
  year,
  userId,
  onUpdated,
  onClose,
}: EditBudgetProps) {
  const [amount, setAmount] = useState(
    currentAmount.toString()
  );

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    if (!amount || Number(amount) <= 0) {
      setError(
        "Please enter a valid budget amount."
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/budgets",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            amount: Number(amount),
            month,
            year,
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
            "Failed to update budget."
        );

        return;
      }

      onUpdated(
        Number(data.budget.amount)
      );

      onClose();

    } catch (error) {
      console.error(
        "Update budget error:",
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">

      <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between">

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#668172]">
              Monthly Budget
            </p>

            <h2 className="mt-1 text-2xl font-bold text-[#183B2A]">
              Edit Budget
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer text-2xl text-[#668172] hover:text-[#183B2A]"
          >
            ×
          </button>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-6"
        >

          <label
            htmlFor="edit-budget"
            className="text-sm font-semibold text-[#183B2A]"
          >
            Budget Amount
          </label>

          <div className="relative mt-2">

            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-[#668172]">
              ₹
            </span>

            <input
              id="edit-budget"
              type="number"
              min="1"
              step="0.01"
              value={amount}
              onChange={(e) =>
                setAmount(
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-gray-200 py-3 pl-9 pr-4 outline-none transition focus:border-[#668172] focus:ring-2 focus:ring-[#E8F0E8]"
            />

          </div>

          {error && (
            <p className="mt-3 text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          {/* Buttons */}
          <div className="mt-6 flex gap-3">

            <button
              type="button"
              onClick={onClose}
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
                : "Update Budget"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}