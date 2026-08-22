export default function Hero() {
  return (
    <section className="bg-[#F7F8F3] px-6 pb-24 pt-16">
      <div className="mx-auto max-w-7xl">

        <div className="mx-auto max-w-4xl text-center">

          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#668172]">
            Personal finance, without the confusion
          </p>

          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-[#183B2A] sm:text-6xl lg:text-7xl">
            Know where your money goes.
            <span className="mt-2 block text-[#6A806F]">
              Make every rupee count.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-[#526158]">
            SpendWise gives you a simple way to track expenses, plan budgets,
            understand your spending habits, and make better financial decisions.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">

            <a
              href="/register"
              className="rounded-full bg-[#183B2A] px-8 py-4 text-sm font-bold text-white transition hover:bg-[#24553D]"
            >
              Start Tracking Every Rupee
              <span className="ml-2">→</span>
            </a>

            <a
              href="#features"
              className="rounded-full border border-[#CBD5CC] bg-white px-8 py-4 text-sm font-semibold text-[#183B2A] transition hover:bg-[#F0F3ED]"
            >
              See how it works
            </a>

          </div>

        </div>

        {/* Product introduction */}
        <div className="mx-auto mt-20 max-w-5xl">

          <div className="rounded-[2rem] bg-[#183B2A] p-3 shadow-2xl shadow-[#183B2A]/15">

            <div className="rounded-[1.5rem] bg-[#E8F0E8] px-8 py-12 sm:px-12">

              <div className="grid items-center gap-10 md:grid-cols-2">

                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-[#668172]">
                    One place for your finances
                  </p>

                  <h2 className="mt-4 text-3xl font-bold leading-tight text-[#183B2A] sm:text-4xl">
                    From everyday expenses to long-term habits.
                  </h2>

                  <p className="mt-5 leading-7 text-[#526158]">
                    Track your spending, organize your finances, and discover
                    patterns that help you make better choices.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">

                  <div className="rounded-2xl bg-white p-5 shadow-sm">
                    <span className="text-2xl">₹</span>
                    <h3 className="mt-4 font-bold text-[#183B2A]">
                      Expenses
                    </h3>
                    <p className="mt-2 text-sm text-[#718078]">
                      Track every transaction.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#D4E7D8] p-5">
                    <span className="text-2xl">◷</span>
                    <h3 className="mt-4 font-bold text-[#183B2A]">
                      Calendar
                    </h3>
                    <p className="mt-2 text-sm text-[#526158]">
                      Understand spending by date.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#DCE8E0] p-5">
                    <span className="text-2xl">↗</span>
                    <h3 className="mt-4 font-bold text-[#183B2A]">
                      Analytics
                    </h3>
                    <p className="mt-2 text-sm text-[#526158]">
                      Find meaningful patterns.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white p-5 shadow-sm">
                    <span className="text-2xl">✦</span>
                    <h3 className="mt-4 font-bold text-[#183B2A]">
                      AI Assistant
                    </h3>
                    <p className="mt-2 text-sm text-[#718078]">
                      Ask about your spending.
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}