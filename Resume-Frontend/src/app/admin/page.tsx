'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { PageContainer } from "@/components/layout/page-container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { toast } from "react-hot-toast";
import { Shield, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface User {
  id: number;
  email: string;
  firstName: string | null;
  lastName: string | null;
  isAdmin: boolean;
  isActive: boolean;
}

export default function AdminPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;

    if (status === 'unauthenticated' || !session?.user?.isAdmin) {
      router.push('/');
      return;
    }

    fetchUsers();
  }, [status, session, router]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${session?.backendToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      // Ensure isAdmin is a boolean
      const usersWithBooleanAdmin = data.map((user: any) => ({
        ...user,
        isAdmin: Boolean(user.isAdmin)
      }));
      setUsers(usersWithBooleanAdmin);
    } catch (error) {
      toast.error('Failed to load users');
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAdminStatus = async (userId: number, currentStatus: boolean) => {
    try {
      // Optimistically update the UI
      setUsers(prevUsers => prevUsers.map(user => 
        user.id === userId ? { ...user, isAdmin: !currentStatus } : user
      ));

      const response = await fetch(`/api/admin/users/${userId}/admin`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.backendToken}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update admin status');
      }

      if (!data || typeof data.isAdmin === 'undefined') {
        throw new Error('Invalid response from server');
      }

      // Update the UI with the confirmed state
      setUsers(prevUsers => prevUsers.map(user => 
        user.id === userId ? { ...user, isAdmin: data.isAdmin } : user
      ));
      
      toast.success(`Admin status ${data.isAdmin ? 'granted' : 'revoked'}`);
    } catch (error) {
      // Revert the UI on error
      setUsers(prevUsers => prevUsers.map(user => 
        user.id === userId ? { ...user, isAdmin: currentStatus } : user
      ));
      
      toast.error(error instanceof Error ? error.message : 'Failed to update admin status');
      console.error('Error updating admin status:', error);
    }
  };

  const deleteUser = async (userId: number) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session?.backendToken}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete user');
      }

      if (!data || typeof data.message === 'undefined') {
        throw new Error('Invalid response from server');
      }

      // Remove the user from the list
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      toast.success(data.message);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete user');
      console.error('Error deleting user:', error);
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="w-full max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Manage user accounts and permissions
          </p>
        </div>

        <Card className="bg-background/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl">User Management</CardTitle>
            <CardDescription>
              View and manage user accounts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Admin</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      {user.firstName} {user.lastName}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Switch
                        checked={Boolean(user.isAdmin)}
                        onCheckedChange={(checked) => toggleAdminStatus(user.id, Boolean(user.isAdmin))}
                        disabled={user.id === session?.user?.id}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteUser(user.id)}
                        disabled={user.id === session?.user?.id}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
} 