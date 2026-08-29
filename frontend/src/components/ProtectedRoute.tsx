"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const savedUser =
      localStorage.getItem("spendwiseUser");

    if (!savedUser) {
      router.replace("/login");
      return;
    }

    setChecking(false);
  }, [router]);

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F8F3] px-5">
        <p className="text-center text-sm font-medium text-[#526158]">
          Checking your session...
        </p>
      </main>
    );
  }

  return <>{children}</>;
}