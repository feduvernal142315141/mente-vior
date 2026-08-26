"use client"

import { useAuth } from "@/lib/hooks/use-auth"

/**
 * `useAuth().logout()` ya limpia el estado local, borra la cookie del servidor
 * y navega a /login. Este hook sólo existe para no acoplar la UI al contexto.
 */
export function useLogout() {
  const { logout } = useAuth()

  return { logout }
}
