export default function Footer() {
  return (
    <footer className="bg-[#183B2A] px-5 py-8 text-white sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl">

        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-center md:gap-8">

          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E8F0E8] text-sm font-bold text-[#183B2A]">
                ₹
              </div>

              <span className="text-lg font-bold sm:text-xl">
                SpendWise
              </span>
            </div>

            <p className="mt-3 max-w-md text-sm leading-6 text-[#B7C9BD]">
              A simpler way to track your expenses, understand your
              spending, and make better financial decisions.
            </p>
          </div>

          <div className="text-sm leading-6 text-[#B7C9BD] md:text-right">
            <p>Built for smarter financial habits.</p>
            <p className="mt-1 md:mt-2">
              © 2026 SpendWise. All rights reserved.
            </p>
          </div>

        </div>

        <div className="mt-7 border-t border-[#315441] pt-5 sm:mt-8 sm:pt-6">
          <div className="flex flex-col justify-between gap-3 text-xs text-[#91A99A] sm:flex-row sm:items-center">

            <p>Your money. Your control.</p>

            <div className="flex gap-5">
              <span>Privacy</span>
              <span>Terms</span>
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
}