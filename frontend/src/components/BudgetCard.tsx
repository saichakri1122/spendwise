type BudgetCardProps = {
  monthlyBudget: number;
  budgetSpent: number;
};

export default function BudgetCard({
  monthlyBudget,
  budgetSpent,
}: BudgetCardProps) {
  const budgetRemaining = monthlyBudget - budgetSpent;

  const budgetPercentage =
    monthlyBudget > 0
      ? Math.min((budgetSpent / monthlyBudget) * 100, 100)
      : 0;

  return (
    <div className="mt-5 rounded-3xl bg-white p-7">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm font-semibold text-[#668172]">
            Monthly Budget
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#183B2A]">
            ₹{monthlyBudget.toFixed(2)}
          </h2>
        </div>

        <span className="text-sm font-semibold text-[#668172]">
          {budgetPercentage.toFixed(0)}% used
        </span>

      </div>

      <div className="mt-6 h-3 overflow-hidden rounded-full bg-[#E8F0E8]">

        <div
          className="h-full rounded-full bg-[#668172] transition-all"
          style={{
            width: `${budgetPercentage}%`,
          }}
        />

      </div>

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
            : `₹${Math.abs(budgetRemaining).toFixed(2)} over budget`}
        </span>

      </div>

    </div>
  );
}