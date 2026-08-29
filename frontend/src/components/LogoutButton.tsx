"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("spendwiseUser");
    router.push("/login");
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="w-full cursor-pointer rounded-xl bg-[#183B2A] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#24553D] sm:w-auto"
    >
      Logout
    </button>
  );
}