export default function Register() {
  return (
    <main className="min-h-screen bg-[#F7F8F3] px-6 py-12">
      <div className="mx-auto max-w-md">

        <div className="text-center">
          <a
            href="/"
            className="text-2xl font-bold text-[#183B2A]"
          >
            SpendWise
          </a>

          <h1 className="mt-8 text-3xl font-bold text-[#183B2A]">
            Create your account
          </h1>

          <p className="mt-3 text-[#526158]">
            Start taking control of your spending today.
          </p>
        </div>

        <form className="mt-8 rounded-3xl bg-white p-8 shadow-sm">

          <div>
            <label
              htmlFor="name"
              className="text-sm font-semibold text-[#183B2A]"
            >
              Full Name
            </label>

            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#668172] focus:ring-2 focus:ring-[#E8F0E8]"
            />
          </div>

          <div className="mt-5">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-[#183B2A]"
            >
              Email Address
            </label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#668172] focus:ring-2 focus:ring-[#E8F0E8]"
            />
          </div>

          <div className="mt-5">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-[#183B2A]"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Create a password"
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#668172] focus:ring-2 focus:ring-[#E8F0E8]"
            />
          </div>

          <button
            type="submit"
            className="mt-7 w-full rounded-xl bg-[#183B2A] py-3.5 font-semibold text-white transition hover:bg-[#24553D]"
          >
            Create Account
          </button>

          <p className="mt-6 text-center text-sm text-[#526158]">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-semibold text-[#183B2A] hover:underline"
            >
              Sign In
            </a>
          </p>

        </form>

        <p className="mt-6 text-center text-xs text-gray-400">
          Your financial information will be protected with secure
          authentication.
        </p>

      </div>
    </main>
  );
}