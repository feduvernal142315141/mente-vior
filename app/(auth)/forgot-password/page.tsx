"use client"

import { KWButton } from "@/components/ui/kw-button"
import { PageHeader } from "./components/PageHeader"
import { useRouter } from "next/navigation";
import { FloatingInput } from "@/components/ui/floating-input";
import { useForgotPassword } from "@/modules/auth/hooks/use-forgot-password";

// Función para validar email


export default function ForgotPasswordPage() {
  const {
      onSubmit,
      isLoading,
      error,
      email,
      setEmail,
      touched,
      setTouched,
      isValidEmail,
      isSuccess} = useForgotPassword()

  const router = useRouter()


  return (
    <div
      className="
        min-h-screen flex relative overflow-hidden
        bg-[#F8FAFC] dark:bg-[#020617]
        transition-colors duration-300
      "
    >

      <div
        className="
          absolute inset-0 opacity-40
          bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]
          dark:opacity-40
        "
      />

      <div
        className="
          absolute top-1/4 left-1/3 w-[500px] h-[500px]
          bg-blue-600/20 dark:bg-[#2563EB]/20
          rounded-full blur-[120px] animate-pulse
        "
        style={{ animationDuration: "4s" }}
      />

      <div
        className="
          absolute bottom-1/4 right-1/4 w-[400px] h-[400px]
          bg-cyan-400/20 dark:bg-[#06B6D4]/15
          rounded-full blur-[100px] animate-pulse
        "
        style={{ animationDuration: "5s", animationDelay: "1s" }}
      />

      <div className="flex-1 flex justify-center items-center p-8 lg:p-12 relative">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">

          <PageHeader />

          <div
            className="
              relative rounded-3xl p-10 backdrop-blur-[20px] shadow-2xl
              bg-white/70 border border-gray-300 shadow-slate-300
              dark:bg-white/[0.04] dark:border-white/[0.14] dark:shadow-black/20
              transition-colors duration-300
            "
          >
            <form onSubmit={onSubmit} className="space-y-6">

              <FloatingInput
                label="Email"
                type="email"
                value={email}
                required={true}
                onChange={setEmail}
                onBlur={() => setTouched(t => ({ ...t, email: true }))}
                hasError={touched.email && email.length > 0 && !isValidEmail}
                error={touched.email && email.length > 0 && !isValidEmail ? "Please enter a valid email address" : undefined}
              />

              {isSuccess && (
                <div
                  className="
                    rounded-xl p-4
                    bg-green-100/40 text-green-700 border border-green-300
                    dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/30
                  "
                >
                  <p className="text-sm font-medium">
                    We have sent a link to reset your password.
                      <br/>
                      Please check your email and follow the instructions to complete the process.
                  </p>
                </div>
              )}

              {error && (
                <div
                  className="
                    rounded-xl p-4
                    bg-red-100/40 text-red-700 border border-red-300
                    dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/30
                  "
                >
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}

              <div className="flex gap-3">
                  <KWButton
                      variant="secondary"
                      type="button"
                      onClick={() => router.push("/login")}
                      disabled={isLoading}
                      className="flex-1"
                  >
                      Back
                  </KWButton>
                <KWButton
                  variant="primary"
                  type="submit"
                  disabled={isLoading || !isValidEmail || isSuccess}
                  loading={isLoading}
                  className="flex-1"
                >
                  Send Reset Link
                </KWButton>
              </div>
            </form>
          </div>

          <p className="text-center text-xs mt-6 leading-relaxed 
            text-gray-600 dark:text-white/40 
          ">
            Your password will be encrypted
            <br />
            <span className="text-gray-500 dark:text-white/50">
              using industry-standard protocols
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
