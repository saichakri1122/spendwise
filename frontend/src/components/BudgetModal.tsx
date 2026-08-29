"use client";

import { useState } from "react";

type BudgetModalProps = {
  onClose: () => void;
  onBudgetSaved: (amount: number) => void;
};

export default function BudgetModal({
  onClose,
  onBudgetSaved,
}: BudgetModalProps) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid budget amount.");
      return;
    }

    try {
      setLoading(true);

      const savedUser =
        localStorage.getItem("spendwiseUser");

      if (!savedUser) {
        setError(
          "User session not found. Please login again."
        );
        return;
      }

      const user = JSON.parse(savedUser);

      const currentDate = new Date();

      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/budgets`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user.id,
            amount: Number(amount),
            month,
            year,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || "Failed to save budget."
        );
        return;
      }

      onBudgetSaved(
        Number(data.budget.amount)
      );

      setSuccess("Budget saved successfully!");

      setTimeout(() => {
        onClose();
      }, 1000);

    } catch (error) {
      console.error(
        "Budget save failed:",
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6 sm:px-6">

      <div className="max-h-[calc(100vh-48px)] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-6 shadow-xl sm:p-8">

        {/* Header */}
        <div className="flex items-start justify-between gap-4">

          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#668172] sm:text-sm">
              Monthly Budget
            </p>

            <h2 className="mt-2 text-xl font-bold text-[#183B2A] sm:text-2xl">
              Set your budget
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#526158]">
              Choose how much you want to spend this month.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="shrink-0 cursor-pointer text-xl text-gray-400 transition hover:text-[#183B2A]"
            aria-label="Close"
          >
            ×
          </button>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-6 sm:mt-7"
        >

          <label
            htmlFor="budgetAmount"
            className="text-sm font-semibold text-[#183B2A]"
          >
            Monthly Budget
          </label>

          <div className="relative mt-2">

            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-[#668172]">
              ₹
            </span>

            <input
              id="budgetAmount"
              type="number"
              min="1"
              step="0.01"
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value)
              }
              placeholder="20000"
              disabled={loading}
              className="w-full rounded-xl border border-gray-200 py-3 pl-9 pr-4 outline-none transition focus:border-[#668172] focus:ring-2 focus:ring-[#E8F0E8] disabled:bg-gray-100"
            />

          </div>

          {/* Error */}
          {error && (
            <p className="mt-3 text-sm font-medium leading-5 text-red-600">
              {error}
            </p>
          )}

          {/* Success */}
          {success && (
            <p className="mt-3 text-sm font-medium leading-5 text-green-700">
              ✓ {success}
            </p>
          )}

          {/* Set Budget */}
          <button
            type="submit"
            disabled={loading || !!success}
            className="mt-6 w-full cursor-pointer rounded-xl bg-[#183B2A] py-3.5 font-semibold text-white transition hover:bg-[#24553D] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Saving budget..."
              : success
              ? "Budget Saved"
              : "Set Budget"}
          </button>

          {/* Cancel */}
          {!success && (
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="mt-3 w-full cursor-pointer rounded-xl border border-[#D5DED6] py-3.5 font-semibold text-[#526158] transition hover:bg-[#F7F8F3] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>
          )}

        </form>

      </div>

    </div>
  );
}