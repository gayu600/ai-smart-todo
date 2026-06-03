"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`,
        { email }
      );

      alert(response.data.message);
      router.push("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to send reset link"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <form
        onSubmit={handleForgotPassword}
        className="w-full max-w-md bg-[#111] border border-gray-800 p-8 rounded-xl"
      >
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
            🔐
          </div>

          <h1 className="text-2xl font-semibold">
            Forgot Password
          </h1>

          <p className="text-gray-400 text-sm mt-2">
            Enter your email and we’ll send you a reset link.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-300">
              Email Address
            </label>

            <input
              required
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-3 rounded-lg bg-[#1a1a1a] border border-gray-700 focus:outline-none"
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-white text-black py-3 rounded-lg font-medium disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Reset Link"}
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