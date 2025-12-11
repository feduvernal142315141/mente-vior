import { AlertCircle } from "lucide-react"

export function PasswordMismatchMessage() {
  return (
    <div
      className="
        flex items-center gap-2 text-xs mt-2
        text-red-600 dark:text-red-400
      "
    >
      <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
      <span>Passwords do not match</span>
    </div>
  )
}
