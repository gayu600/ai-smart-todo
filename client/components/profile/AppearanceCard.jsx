"use client";

import { useEffect, useState } from "react";

export default function AppearanceCard() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");

    if (saved !== null) {
      setDarkMode(saved === "true");
    }
  }, []);

  const handleToggle = () => {
    const newValue = !darkMode;

    setDarkMode(newValue);
    localStorage.setItem("darkMode", String(newValue));
    window.location.reload();

    alert(
      newValue
        ? "Dark mode enabled"
        : "Light mode preference saved. Full light theme can be added later."
    );
  };

  return (
    <div className="bg-[#111] border border-gray-800 rounded-xl p-6">
      <h3 className="text-lg font-semibold">
        Appearance
      </h3>

      <p className="text-gray-400 text-sm mb-4">
        Customize your app appearance
      </p>

      <div className="flex justify-between items-center">
        <div>
          <p>Dark Mode</p>
          <p className="text-sm text-gray-400">
            Use dark theme across the app
          </p>
        </div>

        <input
          type="checkbox"
          checked={darkMode}
          onChange={handleToggle}
          className="w-4 h-4"
        />
      </div>
    </div>
  );
}