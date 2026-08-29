"use client";

import DashboardButton from "@/components/DashboardButton";

export default function Navbar() {
  return (
    <nav className="bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 sm:py-6">

        {/* Logo */}
        <a href="/" className="flex shrink-0 items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#183B2A] text-sm font-bold text-white">
            ₹
          </div>

          <span className="text-lg font-bold tracking-tight text-[#183B2A] sm:text-xl">
            SpendWise
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-5 md:flex">

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

          <DashboardButton />

          <a
            href="/register"
            className="rounded-full bg-[#183B2A] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#24553D]"
          >
            Get Started
          </a>

        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 md:hidden">

          <a
            href="/login"
            className="rounded-lg px-3 py-2 text-sm font-medium text-[#526158] transition hover:bg-[#F7F8F3] hover:text-[#183B2A]"
          >
            Sign In
          </a>

          <a
            href="/register"
            className="rounded-full bg-[#183B2A] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#24553D]"
          >
            Get Started
          </a>

        </div>

      </div>
    </nav>
  );
}