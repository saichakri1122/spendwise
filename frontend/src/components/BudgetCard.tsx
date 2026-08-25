type BudgetCardProps = {
  monthlyBudget: number;
  budgetSpent: number;
};

export default function BudgetCard({
  monthlyBudget,
  budgetSpent,
}: BudgetCardProps) {
  const budgetRemaining =
    monthlyBudget - budgetSpent;

  const budgetPercentage =
    monthlyBudget > 0
      ? (budgetSpent / monthlyBudget) * 100
      : 0;

  const progressWidth = Math.min(
    budgetPercentage,
    100
  );

  const isOverBudget =
    budgetPercentage >= 100;

  const isNearBudget =
    budgetPercentage >= 80 &&
    budgetPercentage < 100;

  return (
    <div className="mt-5 rounded-3xl bg-white p-7">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm font-semibold text-[#668172]">
            Monthly Budget
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#183B2A]">
            ₹{monthlyBudget.toFixed(2)}
          </h2>
        </div>

        <span
          className={
            isOverBudget
              ? "text-sm font-semibold text-red-600"
              : isNearBudget
              ? "text-sm font-semibold text-orange-600"
              : "text-sm font-semibold text-[#668172]"
          }
        >
          {budgetPercentage.toFixed(0)}% used
        </span>

      </div>

      {/* Progress Bar */}
      <div className="mt-6 h-3 overflow-hidden rounded-full bg-[#E8F0E8]">

        <div
          className={
            isOverBudget
              ? "h-full rounded-full bg-red-500 transition-all"
              : isNearBudget
              ? "h-full rounded-full bg-orange-400 transition-all"
              : "h-full rounded-full bg-[#668172] transition-all"
          }
          style={{
            width: `${progressWidth}%`,
          }}
        />

      </div>

      {/* Warning */}
      {isOverBudget && (
        <div className="mt-5 rounded-2xl bg-red-50 px-4 py-3">

          <p className="text-sm font-semibold text-red-700">
            ⚠️ You've exceeded your monthly budget.
          </p>

          <p className="mt-1 text-xs text-red-600">
            Try reducing your spending for the rest of the month.
          </p>

        </div>
      )}

      {isNearBudget && (
        <div className="mt-5 rounded-2xl bg-orange-50 px-4 py-3">

          <p className="text-sm font-semibold text-orange-700">
            ⚠️ You're getting close to your budget.
          </p>

          <p className="mt-1 text-xs text-orange-600">
            Consider keeping an eye on your spending.
          </p>

        </div>
      )}

      {/* Spending Information */}
      <div className="mt-4 flex justify-between text-sm">

        <span className="text-[#526158]">
          Spent: ₹{budgetSpent.toFixed(2)}
        </span>

        <span
          className={
            budgetRemaining < 0
              ? "font-semibold text-red-600"
              : "font-semibold text-[#183B2A]"
          }
        >
          {budgetRemaining >= 0
            ? `₹${budgetRemaining.toFixed(2)} remaining`
            : `₹${Math.abs(
                budgetRemaining
              ).toFixed(2)} over budget`}
        </span>

      </div>

    </div>
  );
}