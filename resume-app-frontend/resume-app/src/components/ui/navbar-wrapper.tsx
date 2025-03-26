"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./navbar";

export function NavbarWrapper() {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith("/sign-in") || pathname?.startsWith("/sign-up");

  if (isAuthPage) {
    return null;
  }

  return <Navbar />;
} 