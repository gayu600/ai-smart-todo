"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function DashboardLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    router.replace("/login");
  }
}, []);

  return (
    <div className="min-h-screen bg-black text-white md:flex">
  <div className="hidden md:block">
    <Sidebar />
  </div>

  <div className="flex-1">
    <Topbar />

    <main className="p-4 md:p-8">
      {children}
    </main>
  </div>
</div>
  );
}