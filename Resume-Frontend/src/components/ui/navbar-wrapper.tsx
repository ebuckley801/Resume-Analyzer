"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, BarChart2, User, Shield } from "lucide-react";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { signOut, useSession } from "next-auth/react";

export function NavbarWrapper() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isAuthPage = pathname?.startsWith("/sign-in") || pathname?.startsWith("/sign-up");

  if (isAuthPage) {
    return null;
  }

  const navItems = [
    {
      title: "Upload",
      href: "/upload",
      icon: FileText
    },
    {
      title: "Analysis",
      href: "/analysis",
      icon: BarChart2
    },
    {
      title: "Account",
      href: "/account",
      icon: User
    }
  ];

  // Add admin link if user is admin
  if (session?.user?.isAdmin) {
    navItems.push({
      title: "Admin",
      href: "/admin",
      icon: Shield
    });
  }

  return (
    <nav className="bg-white shadow-sm dark:shadow-none dark:bg-background dark:border-b dark:border-zinc-700 md:sticky top-0 z-50">
      <div className="mx-auto px-4">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0 pr-3">
              <img
                src="/case.png"
                alt="case.png"
                height={30}
                width={30}
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={pathname === item.href ? "default" : "ghost"}
                    className="flex items-center gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {item.title}
                  </Button>
                </Link>
              );
            })}
            <Button variant="ghost" onClick={() => signOut()}>
              Sign Out
            </Button>
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
} 