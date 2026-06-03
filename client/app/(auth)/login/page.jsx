"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/features/auth/authSlice";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberEmail");

    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    setLoading(true);

    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        if (rememberMe) {
          localStorage.setItem("rememberEmail", email);
        } else {
          localStorage.removeItem("rememberEmail");
        }

        router.push("/dashboard");
      })
      .catch((error) => {
        alert(error || "Login failed");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="w-full max-w-md bg-[#111] border border-gray-800 p-8 rounded-xl">
      <div className="text-center mb-6">
        <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
          ✨
        </div>

        <h1 className="text-2xl font-semibold">
          Welcome back
        </h1>

        <p className="text-gray-400 text-sm">
          Sign in to your account to continue
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm text-gray-300">
            Email
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

        <div>
          <label className="text-sm text-gray-300">
            Password
          </label>

          <div className="relative">
            <input
              required
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-3 pr-16 rounded-lg bg-[#1a1a1a] border border-gray-700 focus:outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-4 text-sm text-gray-400 hover:text-white"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-400">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />

            Remember Me
          </label>

        <button
  type="button"
  onClick={() => router.push("/forgot-password")}
  className="text-purple-400 hover:text-purple-300"
>
  Forgot Password?
</button>
        </div>

        <button
          disabled={loading}
          className="w-full bg-white text-black py-3 rounded-lg font-medium disabled:opacity-60"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <p className="text-center text-gray-400 mt-6 text-sm">
        Don't have an account?
        <a href="/register" className="text-white ml-1">
          Sign up
        </a>
      </p>
    </div>
  );
}