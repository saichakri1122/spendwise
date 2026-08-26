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
        className="cursor-pointer rounded-xl bg-[#183B2A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#24553D]"
      >
        Dashboard
      </button>

      {/* Login Required Popup */}
      {showLoginMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">

          <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">

            <h2 className="text-2xl font-bold text-[#183B2A]">
              Login Required
            </h2>

            <p className="mt-3 text-[#526158]">
              Please login to access your SpendWise dashboard.
            </p>

            <div className="mt-7 flex justify-end gap-3">

              <button
                type="button"
                onClick={() =>
                  setShowLoginMessage(false)
                }
                className="cursor-pointer rounded-xl border border-[#D5DED6] px-4 py-2 text-sm font-semibold text-[#526158] transition hover:bg-[#F7F8F3]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() =>
                  router.push("/login")
                }
                className="cursor-pointer rounded-xl bg-[#183B2A] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#24553D]"
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