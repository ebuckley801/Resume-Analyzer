"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import toast from 'react-hot-toast';
import { AlertTriangle } from "lucide-react";

export default function DeleteUser() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const checkUserPassword = async () => {
        try {
            setIsLoading(true);
            const response = await fetch("/api/auth/check-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password }),
            });

            if (!response.ok) {
                throw new Error('Incorrect password');
            }

            await deleteUser();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to verify password');
        } finally {
            setIsLoading(false);
        }
    };

    const deleteUser = async () => {
        try {
            const response = await fetch("/api/auth/delete-user", {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error('Failed to delete account');
            }

            toast.success('Account deleted successfully');
            await signOut();
            router.push('/');
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to delete account');
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive" className="w-full md:w-auto h-11 rounded-lg">Delete Account</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-destructive/10">
                            <AlertTriangle className="h-6 w-6 text-destructive" />
                        </div>
                        <div>
                            <DialogTitle className="text-xl font-semibold">Delete Account</DialogTitle>
                            <DialogDescription className="text-base mt-2">
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>
                <div className="space-y-6 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium">
                            Enter your password to confirm
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="h-11 rounded-lg"
                        />
                    </div>
                    <div className="flex justify-end gap-4">
                        <DialogClose asChild>
                            <Button variant="outline" className="min-w-[100px] h-11 rounded-lg">Cancel</Button>
                        </DialogClose>
                        <Button 
                            variant="destructive" 
                            onClick={checkUserPassword}
                            disabled={isLoading}
                            className="min-w-[100px] h-11 rounded-lg"
                        >
                            {isLoading ? "Deleting..." : "Delete"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}