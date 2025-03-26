import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Settings",
  description: "",
}

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="space-y-4 p-8 pb-16">
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </>
  )
}
