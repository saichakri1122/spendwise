"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed.");
        return;
      }

      setMessage("Account created successfully!");

      setTimeout(() => {
        router.push("/login");
      }, 1200);
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-3xl bg-white p-8 shadow-sm"
        >

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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 pr-12 outline-none transition focus:border-[#668172] focus:ring-2 focus:ring-[#E8F0E8]"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 mt-1 -translate-y-1/2 cursor-pointer rounded-lg p-2 text-gray-500 transition hover:text-[#183B2A]"
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
              >
                {showPassword ? "◉" : "◌"}
              </button>
            </div>
          </div>

          {error && (
            <p className="mt-4 text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          {message && (
            <p className="mt-4 text-sm font-medium text-green-700">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-7 w-full cursor-pointer rounded-xl bg-[#183B2A] py-3.5 font-semibold text-white transition hover:bg-[#24553D] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create Account"}
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