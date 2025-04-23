import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/authOptions';
import { callBackendApi } from '@/app/lib/backendApi';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    // Check for session and required properties
    if (!session?.user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    if (!session.user.isAdmin) {
      return NextResponse.json({ error: 'Admin privileges required' }, { status: 403 });
    }

    if (!session.user.backendToken) {
      return NextResponse.json({ error: 'No backend token found. Please sign in again.' }, { status: 401 });
    }

    try {
      const response = await callBackendApi('/admin/users', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${session.user.backendToken}`
        }
      });

      // Transform the response to include counts and formatted dates
      const users = (response.users || []).map((user: any) => ({
        ...user,
        isActive: Boolean(user.is_active),
        isAdmin: Boolean(user.is_admin),
        createdAt: user.created_at,
        lastLogin: user.last_login,
        uploads: user.uploads?.length || 0,
        analyses: user.analyses?.length || 0,
        jobDescriptions: user.jobDescriptions?.length || 0
      }));

      return NextResponse.json(users);
    } catch (error: any) {
      console.error('Backend API error:', error);
      // Check for specific error types
      if (error.message.includes('Authentication failed')) {
        return NextResponse.json({ error: 'Backend authentication failed. Please sign in again.' }, { status: 401 });
      }
      throw error; // Re-throw for general error handling
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
} 