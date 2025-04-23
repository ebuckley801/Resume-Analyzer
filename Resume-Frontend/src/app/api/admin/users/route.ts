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

    // The backend returns users in a 'users' property
    return NextResponse.json(response.users || []);
  } catch (error) {
    console.error('Error fetching users:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 