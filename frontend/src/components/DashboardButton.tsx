"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardButton() {
  const router = useRouter();

  const [showLoginMessage, setShowLoginMessage] =
    useState(false);

  const handleDashboardClick = () => {
    const savedUser =
      localStorage.getItem("spendwiseUser");

    if (savedUser) {
      router.push("/dashboard");
    } else {
      setShowLoginMessage(true);
    }
  };

  return (
    <>
      {/* Dashboard Button */}
      <button
        type="button"
        onClick={handleDashboardClick}
        className="w-full cursor-pointer rounded-xl bg-[#183B2A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#24553D] sm:w-auto"
      >
        Go To Dashboard
      </button>

      {/* Login Required Popup */}
      {showLoginMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6 sm:px-6">

          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl sm:p-8">

            <h2 className="text-xl font-bold text-[#183B2A] sm:text-2xl">
              Login Required
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#526158] sm:text-base">
              Please login to access your SpendWise dashboard.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:mt-7 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={() =>
                  setShowLoginMessage(false)
                }
                className="w-full cursor-pointer rounded-xl border border-[#D5DED6] px-4 py-3 text-sm font-semibold text-[#526158] transition hover:bg-[#F7F8F3] sm:w-auto sm:py-2"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() =>
                  router.push("/login")
                }
                className="w-full cursor-pointer rounded-xl bg-[#183B2A] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#24553D] sm:w-auto sm:py-2"
              >
                Go to Login
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}