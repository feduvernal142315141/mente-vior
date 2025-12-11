import type React from "react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Topbar } from "@/components/ui/layout/topbar"
import { Sidebar } from "@/components/ui/layout/sidebar/Sidebar"

export default async function BackofficeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const token = cookieStore.get("mv_token")?.value

  if (!token) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-bg-soft">
      <Sidebar />
      <div className="pl-[72px] transition-all duration-100">
        <Topbar />
        <main className="min-h-[calc(100vh-54px)]">{children}</main>
      </div>
    </div>
  )
}
