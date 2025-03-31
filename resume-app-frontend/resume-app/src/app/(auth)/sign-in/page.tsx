"use client"

import { ImageSection } from "@/components/auth/image-section"
import { LoginForm } from "@/components/auth/login-form"
import { Separator } from "@/components/ui/separator"
import { ModeToggle } from "@/components/ui/theme-toggle"

export default function SignInPage() {
  return (
    <div className="grid min-h-screen md:grid-cols-2 lg:grid-cols-[1fr,1px,1fr]">
      <div className="flex flex-col relative">
        <div className="absolute top-4 right-4 z-10">
          <ModeToggle />
        </div>
        <ImageSection />
      </div>
      <Separator orientation="vertical" className="hidden lg:block" />
      <div className="flex items-center justify-center p-4">
        <LoginForm />
      </div>
    </div>
  )
} 