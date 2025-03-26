"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card } from "@/components/ui/card";

const formSchema = z
  .object({
    firstName: z.string().refine(value => !/\d/.test(value), {
      message: "First name must not contain numbers",
    }),
    lastName: z.string().refine(value => !/\d/.test(value), {
      message: "Last name must not contain numbers",
    }),
    email: z.string().email("Invalid email address"),
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string()
      .min(8, "Password must be at least 8 characters")
      .refine(value => /[A-Z]/.test(value), {
        message: "Password must contain at least one capital letter",
      })
      .refine(value => /[0-9]/.test(value), {
        message: "Password must contain at least one number",
      })
      .refine(value => /[^a-zA-Z0-9]/.test(value), {
        message: "Password must contain at least one special character",
      })
      .optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.newPassword) {
        return data.newPassword === data.confirmPassword;
      }
      return true;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export default function UpdateAccount() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/auth/update-account', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update account');
      }

      toast.success('Account updated successfully!');
      form.reset();
      router.refresh();
    } catch (error) {
      console.error('Error updating account:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Toaster />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">First Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="First Name" 
                      type="text" 
                      className="h-11 rounded-lg" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Last Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Last Name" 
                      type="text" 
                      className="h-11 rounded-lg" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Email" 
                    type="email" 
                    className="h-11 rounded-lg" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Card className="p-6 bg-muted/50 border-0 backdrop-blur-sm">
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-3">Change Password</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Update your password to keep your account secure
                </p>
              </div>

              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Current Password</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter current password" 
                        type="password" 
                        className="h-11 rounded-lg" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">New Password</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter new password" 
                          type="password" 
                          className="h-11 rounded-lg" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Confirm Password</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Confirm new password" 
                          type="password" 
                          className="h-11 rounded-lg" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </Card>

          <div className="flex justify-end">
            <Button 
              type="submit" 
              className="w-full md:w-auto min-w-[200px] h-11 rounded-lg" 
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}