"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const router = useRouter();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password/${token}`,
        { newPassword }
      );

      alert(response.data.message);
      router.push("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to reset password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <form
        onSubmit={handleResetPassword}
        className="w-full max-w-md bg-[#111] border border-gray-800 p-8 rounded-xl"
      >
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
            🔑
          </div>

          <h1 className="text-2xl font-semibold">
            Reset Password
          </h1>

          <p className="text-gray-400 text-sm mt-2">
            Create a new password for your account.
          </p>
        </div>

        <div className="space-y-4">
          <input
            required
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-gray-700 focus:outline-none"
          />

          <input
            required
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-gray-700 focus:outline-none"
          />

          <button
            disabled={loading}
            className="w-full bg-white text-black py-3 rounded-lg font-medium disabled:opacity-60"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/login")}
            className="w-full text-gray-400 hover:text-white text-sm"
          >
            Back to Login
          </button>
        </div>
      </form>
    </div>
  );
}