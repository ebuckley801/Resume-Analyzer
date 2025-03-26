// app/dashboard/page.tsx
import { Nav } from "@/app/dashboard/components/nav/Nav";
import { UserNav } from "@/app/dashboard/components/nav/ProfileAvatar";
import { Suspense } from 'react';
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your dashboard overview.",
};

function LoadingState() {
  return (
    <div className="flex h-[400px] items-center justify-center">
      <div className="text-center">
        <div className="text-lg font-medium">Loading...</div>
        <div className="text-sm text-muted-foreground">
          Please wait while we fetch your data.
        </div>
      </div>
    </div>
  );
}

export default async function DashboardPage() {
  return (
    <>
      <div>
        <Nav desktopProfile={<UserNav />} mobileNav={<UserNav />} />
      </div>
      <div className="flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-4">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          </div>
          <Suspense fallback={<LoadingState />}>
            <div className="space-y-8">
              {/* Add your new dashboard components here */}
            </div>
          </Suspense>
        </div>
      </div>
    </>
  );
}