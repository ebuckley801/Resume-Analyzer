import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface PasswordRequirementsProps {
  password: string
  className?: string
}

export function PasswordRequirements({ password, className }: PasswordRequirementsProps) {
  const requirements = [
    { regex: /.{8,}/, label: "At least 8 characters" },
    { regex: /[A-Z]/, label: "One uppercase letter" },
    { regex: /[a-z]/, label: "One lowercase letter" },
    { regex: /[0-9]/, label: "One number" },
    { regex: /[^a-zA-Z0-9]/, label: "One special character" },
  ]

  return (
    <div className={className}>
      <ul className="space-y-1 text-sm">
        {requirements.map(({ regex, label }, index) => (
          <li key={index} className="flex items-center gap-2">
            {regex.test(password) ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <X className="h-4 w-4 text-red-500" />
            )}
            <span className="text-muted-foreground">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
} 