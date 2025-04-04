import { cn } from "@/lib/utils"

interface PasswordStrengthProps {
  password: string
  className?: string
}

export function PasswordStrength({ password, className }: PasswordStrengthProps) {
  const calculateStrength = (password: string) => {
    let strength = 0
    const checks = [
      { regex: /.{8,}/, points: 1 }, // Length
      { regex: /[A-Z]/, points: 1 }, // Uppercase
      { regex: /[a-z]/, points: 1 }, // Lowercase
      { regex: /[0-9]/, points: 1 }, // Numbers
      { regex: /[^a-zA-Z0-9]/, points: 1 }, // Special characters
    ]

    checks.forEach(({ regex, points }) => {
      if (regex.test(password)) {
        strength += points
      }
    })

    return strength
  }

  const strength = calculateStrength(password)
  const strengthLabels = {
    0: { label: "Very Weak", color: "bg-red-500" },
    1: { label: "Weak", color: "bg-orange-500" },
    2: { label: "Fair", color: "bg-yellow-500" },
    3: { label: "Good", color: "bg-blue-500" },
    4: { label: "Strong", color: "bg-green-500" },
    5: { label: "Very Strong", color: "bg-green-600" },
  }

  const { label, color } = strengthLabels[strength as keyof typeof strengthLabels]

  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex items-center gap-2">
        <div className="h-1.5 flex-1 rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className={cn("h-full rounded-full transition-all", color)}
            style={{ width: `${(strength / 5) * 100}%` }}
          />
        </div>
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <div className="grid grid-cols-5 gap-1">
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className={cn(
              "h-1 rounded-full",
              index < strength ? color : "bg-gray-200 dark:bg-gray-700"
            )}
          />
        ))}
      </div>
    </div>
  )
} 