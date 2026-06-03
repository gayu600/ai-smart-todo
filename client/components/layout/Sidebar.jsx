"use client";

import { useRouter, usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/store/features/auth/authSlice";

import {
  LayoutDashboard,
  CheckSquare,
  BarChart3,
  Sparkles,
  User,
} from "lucide-react";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Todos",
      path: "/dashboard/todos",
      icon: CheckSquare,
    },
    {
      name: "Analytics",
      path: "/dashboard/analytics",
      icon: BarChart3,
    },
    {
      name: "Profile",
      path: "/dashboard/profile",
      icon: User,
    },
  ];

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <aside className="w-64 bg-[#0f0f0f] border-r border-gray-800 flex flex-col justify-between">
      <div>
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
            <Sparkles size={18} />
          </div>

          <div>
            <h2 className="text-lg font-semibold">TaskAI</h2>
            <p className="text-gray-400 text-xs">Productivity Suite</p>
          </div>
        </div>

        <nav className="space-y-2 px-4">
          {menu.map((item) => {
            const Icon = item.icon;

            const active =
              item.path === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.path);

            return (
              <button
                key={item.name}
                onClick={() => router.push(item.path)}
                className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg transition ${
                  active
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {item.name}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}