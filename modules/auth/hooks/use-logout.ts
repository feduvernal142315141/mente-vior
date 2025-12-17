"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/hooks/use-auth"

export function useLogout() {

  const { logout: authLogout } = useAuth()

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { 
        method: "POST",
        credentials: "include",
      })
    } catch (error) {
      console.error("Logout API error:", error)
    }

    
    authLogout()

  }

  return { logout }
}
