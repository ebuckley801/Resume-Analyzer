"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { User, Upload, BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  {
    title: "Upload",
    href: "/upload",
    icon: Upload,
  },
  {
    title: "Results",
    href: "/results",
    icon: BarChart,
  },
  {
    title: "Account",
    href: "/account",
    icon: User,
  },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-start justify-between px-6 pt-2">
        <div className="flex items-center gap-6">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-lg font-semibold tracking-tight"
          >
            <Image
              src="/case.png"
              alt="Resume Analyzer Logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span>Resume Analyzer</span>
          </Link>

          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.href}
                  variant={pathname === item.href ? "default" : "outline"}
                  size="sm"
                  asChild
                >
                  <Link href={item.href}>
                    <Icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </Link>
                </Button>
              )
            })}
          </div>
        </div>

        <ModeToggle />
      </div>
    </nav>
  )
} 