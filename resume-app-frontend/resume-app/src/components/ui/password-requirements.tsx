import { Check } from "lucide-react"
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
            <Check
              className={cn(
                "h-4 w-4",
                regex.test(password)
                  ? "text-green-500"
                  : "text-gray-400 dark:text-gray-500"
              )}
            />
            <span className="text-muted-foreground">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
} 