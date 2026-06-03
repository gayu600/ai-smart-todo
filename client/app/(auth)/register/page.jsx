"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { registerUser } from "@/store/features/auth/authSlice"
import { useRouter } from "next/navigation"

export default function RegisterPage(){

  const dispatch = useDispatch()
  const router = useRouter()

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const handleSubmit = (e)=>{
    e.preventDefault()

    dispatch(registerUser({name,email,password}))
      .unwrap()
      .then(()=>{
        router.push("/login")
      })
  }

  return(
    <div className="w-full max-w-md bg-[#111] border border-gray-800 p-8 rounded-xl">

      <div className="text-center mb-6">

        <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
          ✨
        </div>

        <h1 className="text-2xl font-semibold">
          Create an account
        </h1>

        <p className="text-gray-400 text-sm">
          Get started with AI-powered productivity
        </p>

      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="text-sm text-gray-300">Name</label>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="w-full mt-1 p-3 rounded-lg bg-[#1a1a1a] border border-gray-700"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Email</label>
          <input
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full mt-1 p-3 rounded-lg bg-[#1a1a1a] border border-gray-700"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Password</label>
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full mt-1 p-3 rounded-lg bg-[#1a1a1a] border border-gray-700"
          />
        </div>

        <button className="w-full bg-white text-black py-3 rounded-lg font-medium">
          Create Account
        </button>

      </form>

      <p className="text-center text-gray-400 mt-6 text-sm">
        Already have an account?
        <a href="/login" className="text-white ml-1">
          Sign in
        </a>
      </p>

    </div>
  )
}