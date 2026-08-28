"use client";

import { useState } from "react";

type DeleteExpenseProps = {
  expenseId: number;
  onDeleted: (expenseId: number) => void;
};

export default function DeleteExpense({
  expenseId,
  onDeleted,
}: DeleteExpenseProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmed) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/expenses/${expenseId}`,
        {
          method: "DELETE",
        }
      );

      const responseText = await response.text();

      let data;

      try {
        data = JSON.parse(responseText);
      } catch {
        console.error(
          "Backend returned non-JSON response:",
          responseText
        );

        alert(
          "Server returned an unexpected response."
        );

        return;
      }

      if (!response.ok) {
        alert(
          data.message ||
            "Failed to delete expense."
        );

        return;
      }

      onDeleted(expenseId);

    } catch (error) {
      console.error(
        "Delete expense error:",
        error
      );

      alert(
        "Unable to connect to the server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="cursor-pointer rounded-lg px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}