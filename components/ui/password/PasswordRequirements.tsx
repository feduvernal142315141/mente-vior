import { CheckCircle2, XCircle } from "lucide-react"

interface Props {
  show: boolean
  rules: {
    hasMinLength: boolean
    hasUpperCase: boolean
    hasLowerCase: boolean
    hasNumber: boolean
    hasSymbol: boolean
  }
}

export function PasswordRequirements({ show, rules }: Props) {
  if (!show) return null

  const items = [
    { label: "At least 8 characters", valid: rules.hasMinLength },
    { label: "Uppercase letter", valid: rules.hasUpperCase },
    { label: "Lowercase letter", valid: rules.hasLowerCase },
    { label: "Number", valid: rules.hasNumber },
    { label: "Special character", valid: rules.hasSymbol },
  ]

  return (
    <div
      className="
      space-y-3 mt-3 p-4 rounded-xl border 
      bg-gray-50/60 border-gray-200 
      dark:bg-white/[0.03] dark:border-white/[0.08]
      transition-colors
    "
    >
      <p
        className="
        text-xs font-semibold 
        text-gray-600 
        dark:text-white/60
      "
      >
        Password must contain:
      </p>

      <div className="space-y-2">
        {items.map((req, i) => (
          <div key={i} className="flex items-center gap-2">
            {req.valid ? (
              <CheckCircle2 className="w-4 h-4 text-green-500 dark:text-green-400" />
            ) : (
              <XCircle className="w-4 h-4 text-gray-300 dark:text-white/20" />
            )}

            <span
              className={`
              text-xs 
              ${req.valid 
                ? "text-green-600 dark:text-green-400" 
                : "text-gray-500 dark:text-white/40"
              }
            `}
            >
              {req.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
