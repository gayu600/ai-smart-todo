"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { User, LogOut, Settings } from "lucide-react";

export default function Topbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [showMenu, setShowMenu] = useState(false);

  let title = "Dashboard";

  if (pathname.includes("/dashboard/todos")) {
    title = "Todos";
  } else if (pathname.includes("/dashboard/analytics")) {
    title = "Analytics";
  } else if (pathname.includes("/dashboard/profile")) {
    title = "Profile";
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    router.push("/login");
  };

  return (
    <div className="flex justify-between items-center border-b border-gray-800 px-8 py-4 relative">
      <h1 className="text-xl font-semibold">
        {title}
      </h1>

      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center hover:scale-105 transition"
        >
          <User size={18} className="text-white" />
        </button>

        {showMenu && (
          <div className="absolute right-0 mt-3 w-52 bg-[#111] border border-gray-800 rounded-xl shadow-xl overflow-hidden z-50">
            <div className="px-4 py-3 border-b border-gray-800">
              <p className="font-medium">
                User Account
              </p>

              <p className="text-xs text-gray-400">
                Manage your account
              </p>
            </div>

            <button
              onClick={() => {
                router.push("/dashboard/profile");
                setShowMenu(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-800 transition"
            >
              <Settings size={16} />
              Profile Settings
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-500/20 text-red-400 transition"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}