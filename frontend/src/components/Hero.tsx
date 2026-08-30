export default function Hero() {
  return (
    <section className="bg-[#F7F8F3] px-5 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-14 lg:pb-24 lg:pt-16">
      <div className="mx-auto max-w-7xl">

        <div className="mx-auto max-w-4xl text-center">

          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-[#668172] sm:mb-6 sm:text-sm sm:tracking-[0.2em]">
            Personal finance, without the confusion
          </p>

          <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-[#183B2A] sm:text-6xl lg:text-7xl">
            Know where your money goes.
            <span className="mt-2 block text-[#6A806F]">
              Make every rupee count.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#526158] sm:mt-7 sm:text-lg sm:leading-8">
            SpendWise gives you a simple way to track expenses, plan budgets,
            understand your spending habits, and make better financial decisions.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-9 sm:flex-row">

            <a
              href="/register"
              className="w-full rounded-full bg-[#183B2A] px-8 py-4 text-center text-sm font-bold text-white transition hover:bg-[#24553D] sm:w-auto"
            >
              Start Tracking Every Rupee
              <span className="ml-2">→</span>
            </a>

            <a
              href="#About"
              className="w-full rounded-full border border-[#CBD5CC] bg-white px-8 py-4 text-center text-sm font-semibold text-[#183B2A] transition hover:bg-[#F0F3ED] sm:w-auto"
            >
              See how it works
            </a>

          </div>

        </div>

        {/* Product introduction */}
        <div className="mx-auto mt-14 max-w-5xl sm:mt-16 lg:mt-20">

          <div className="rounded-[1.5rem] bg-[#183B2A] p-2.5 shadow-2xl shadow-[#183B2A]/15 sm:rounded-[2rem] sm:p-3">

            <div className="rounded-[1.25rem] bg-[#E8F0E8] px-5 py-8 sm:rounded-[1.5rem] sm:px-12 sm:py-12">

              <div className="grid items-center gap-7 sm:gap-10 md:grid-cols-2">

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#668172] sm:text-sm">
                    One place for your finances
                  </p>

                  <h2 className="mt-3 text-2xl font-bold leading-tight text-[#183B2A] sm:mt-4 sm:text-4xl">
                    From everyday expenses to long-term habits.
                  </h2>

                  <p className="mt-4 text-sm leading-6 text-[#526158] sm:mt-5 sm:text-base sm:leading-7">
                    Track your spending, organize your finances, and discover
                    patterns that help you make better choices.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2">

                  <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-5">
                    <span className="text-2xl">₹</span>
                    <h3 className="mt-3 font-bold text-[#183B2A] sm:mt-4">
                      Expenses
                    </h3>
                    <p className="mt-2 text-sm text-[#718078]">
                      Track every transaction.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#D4E7D8] p-4 sm:p-5">
                    <span className="text-2xl">◷</span>
                    <h3 className="mt-3 font-bold text-[#183B2A] sm:mt-4">
                      Calendar
                    </h3>
                    <p className="mt-2 text-sm text-[#526158]">
                      Understand spending by date.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#DCE8E0] p-4 sm:p-5">
                    <span className="text-2xl">↗</span>
                    <h3 className="mt-3 font-bold text-[#183B2A] sm:mt-4">
                      Analytics
                    </h3>
                    <p className="mt-2 text-sm text-[#526158]">
                      Find meaningful patterns.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-5">
                    <span className="text-2xl">✦</span>
                    <h3 className="mt-3 font-bold text-[#183B2A] sm:mt-4">
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