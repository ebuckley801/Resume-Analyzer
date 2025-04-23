import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/authOptions';
import { callBackendApi } from '@/app/lib/backendApi';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.isAdmin) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

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
  } catch (error) {
    console.error('Error fetching users:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 