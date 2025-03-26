"use client";

import { useState } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { User, Mail, Lock, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function AccountPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Add your account update logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      toast.success("Account updated successfully");
    } catch (error) {
      toast.error("Failed to update account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Account Settings</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your account information and preferences
          </p>
        </div>

        <Card className="bg-background/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Profile Information</CardTitle>
            <CardDescription>
              Update your personal information and account settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  <Label htmlFor="name">Full Name</Label>
                </div>
                <Input
                  id="name"
                  placeholder="John Doe"
                  className="bg-muted/50 border-border/50"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <Label htmlFor="email">Email</Label>
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className="bg-muted/50 border-border/50"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-primary" />
                  <Label htmlFor="password">New Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="bg-muted/50 border-border/50"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="mt-6 bg-background/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Sign Out</CardTitle>
            <CardDescription>
              Sign out of your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
} 