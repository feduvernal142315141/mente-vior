"use client"

import { useState } from "react"
import { useLogin } from "@/modules/auth/hooks/use-login"
import { Button } from "@/components/ui/button"
import { ArrowRight, Eye, EyeOff } from "lucide-react"
import Link from "next/link";

export default function LoginForm() {
  const { onSubmit, isSubmitting, error } = useLogin()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(email, password); }} className="space-y-6">
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-white/90">
          Email <span className="text-[#2563EB]">*</span>
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="login-input w-full h-12 px-4 bg-white/[0.07] border border-white/[0.14] rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-4 focus:ring-[#2563EB]/30 focus:border-[#2563EB] transition-all duration-200 backdrop-blur-sm"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-white/90">
          Password <span className="text-[#2563EB]">*</span>
        </label>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
           className="login-input w-full h-12 px-4 bg-white/[0.07] border border-white/[0.14] rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-4 focus:ring-[#2563EB]/30 focus:border-[#2563EB] transition-all duration-200 backdrop-blur-sm"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
          >
            {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
          <p className="text-sm text-red-400 font-medium">{error}</p>
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-[50px] bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white rounded-xl font-semibold shadow-lg"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Signing in...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            Sign In
            <ArrowRight className="w-5 h-5" />
          </span>
        )}
      </Button>

      <div className="text-center">
        <Link
          href="/forgot-password"
          className="text-[13px] text-white/50 hover:text-[#2563EB] transition-colors duration-200"
        >
          Forgot password
        </Link>
      </div>
    </form>
  )
}
