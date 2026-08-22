export default function Footer() {
  return (
    <footer className="bg-[#183B2A] px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">

        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">

          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8F0E8] text-sm font-bold text-[#183B2A]">
                ₹
              </div>

              <span className="text-xl font-bold">
                SpendWise
              </span>
            </div>

            <p className="mt-3 max-w-md text-sm leading-6 text-[#B7C9BD]">
              A simpler way to track your expenses, understand your
              spending, and make better financial decisions.
            </p>
          </div>

          <div className="text-sm text-[#B7C9BD]">
            <p>Built for smarter financial habits.</p>
            <p className="mt-2">© 2026 SpendWise. All rights reserved.</p>
          </div>

        </div>

        <div className="mt-8 border-t border-[#315441] pt-6">
          <div className="flex flex-col justify-between gap-3 text-xs text-[#91A99A] sm:flex-row">
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