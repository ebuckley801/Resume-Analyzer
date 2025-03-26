"use client";
import { useRouter } from "next/navigation";
import { ModeToggle } from "@/components/ui/theme-toggle";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, BarChart2, User } from "lucide-react";
import { usePathname } from "next/navigation";

export function Nav() {
  const pathname = usePathname();

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
      href: "/dashboard/settings/account",
      icon: User
    }
  ];

  return (
    <nav className="bg-white shadow-sm dark:shadow-none dark:bg-background dark:border-b dark:border-zinc-700 md:sticky top-0 z-50">
      <div className="mx-auto px-4">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0 pr-3">
              <Image
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
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
