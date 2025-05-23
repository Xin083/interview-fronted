"use client"
import { useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setMessage("")
    setLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) setError(error.message)
    else setMessage("Password reset instructions have been sent to your email.")
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <h2 className="text-2xl font-bold mb-4 text-white">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <input
          type="email"
          className="w-full px-4 py-3 rounded bg-[#1A1A1A] text-white"
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full py-3 rounded bg-yellow-400 text-black font-bold"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
        {message && <p className="text-green-500">{message}</p>}
        {error && <p className="text-red-500">{error}</p>}
      </form>
      <button
        className="mt-4 text-[#989898] hover:text-white"
        onClick={() => router.push("/signin")}
      >
        Back to Sign In
      </button>
    </div>
  )
}