export default function Howitwork() {
  return (
    <section
      id="About"
      className="bg-[#E8F0E8] px-5 py-16 sm:px-6 sm:py-20 md:py-24"
    >
      <div className="mx-auto max-w-7xl">

        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#668172]">
            How It Works
          </p>

          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-[#183B2A] sm:text-4xl md:text-5xl">
            A simpler way to understand your money.
          </h2>

          <p className="mt-5 text-base leading-7 text-[#526158] sm:text-lg sm:leading-8">
            SpendWise turns your everyday expenses into useful information
            that helps you make better financial decisions.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-5 md:mt-14 md:grid-cols-3 md:gap-6">

          {/* Track */}
          <div className="rounded-3xl bg-white p-6 sm:p-7 md:p-8">
            <span className="text-sm font-bold text-[#668172]">
              01
            </span>

            <h3 className="mt-5 text-xl font-bold text-[#183B2A] sm:mt-6 sm:text-2xl">
              Track
            </h3>

            <p className="mt-3 leading-7 text-[#526158]">
              Add your everyday expenses and keep all your spending
              organized in one place.
            </p>
          </div>

          {/* Analyze */}
          <div className="rounded-3xl bg-white p-6 sm:p-7 md:p-8">
            <span className="text-sm font-bold text-[#668172]">
              02
            </span>

            <h3 className="mt-5 text-xl font-bold text-[#183B2A] sm:mt-6 sm:text-2xl">
              Analyze
            </h3>

            <p className="mt-3 leading-7 text-[#526158]">
              Explore your spending through dates, categories, budgets,
              and meaningful financial insights.
            </p>
          </div>

          {/* Improve */}
          <div className="rounded-3xl bg-white p-6 sm:p-7 md:p-8">
            <span className="text-sm font-bold text-[#668172]">
              03
            </span>

            <h3 className="mt-5 text-xl font-bold text-[#183B2A] sm:mt-6 sm:text-2xl">
              Improve
            </h3>

            <p className="mt-3 leading-7 text-[#526158]">
              Use what you learn about your spending to build better
              financial habits and make smarter decisions.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}