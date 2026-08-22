export default function Navbar() {
  return (
    <nav className="bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">

        <a href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#183B2A] text-sm font-bold text-white">
            ₹
          </div>

          <span className="text-xl font-bold tracking-tight text-[#183B2A]">
            SpendWise
          </span>
        </a>

<div className="flex items-center gap-3">

  <a
    href="#About"
    className="text-base font-medium text-[#526158] transition hover:text-[#183B2A]"
  >
    About
  </a>

  <a
    href="/login"
    className="text-base font-medium text-[#526158] transition hover:text-[#183B2A]"
  >
    Sign In
  </a>

  <a
    href="/register"
    className="rounded-full bg-[#183B2A] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#24553D]"
  >
    Get Started
  </a>

</div>

      </div>
    </nav>
  );
}