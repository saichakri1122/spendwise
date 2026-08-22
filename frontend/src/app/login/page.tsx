export default function Login() {
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
            Welcome back
          </h1>

          <p className="mt-3 text-[#526158]">
            Sign in to continue managing your finances.
          </p>
        </div>

        <form className="mt-8 rounded-3xl bg-white p-8 shadow-sm">

          <div>
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
              placeholder="Enter your password"
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#668172] focus:ring-2 focus:ring-[#E8F0E8]"
            />
          </div>

          <div className="mt-3 text-right">
            <a
              href="#"
              className="text-sm font-medium text-[#668172] hover:text-[#183B2A]"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="mt-7 w-full rounded-xl bg-[#183B2A] py-3.5 font-semibold text-white transition hover:bg-[#24553D]"
          >
            Sign In
          </button>

          <p className="mt-6 text-center text-sm text-[#526158]">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-semibold text-[#183B2A] hover:underline"
            >
              Create an account
            </a>
          </p>

        </form>

      </div>
    </main>
  );
}