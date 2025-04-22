import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/authOptions';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    console.log('Session in /api/results/latest:', {
      hasSession: !!session,
      hasUser: !!session?.user,
      hasEmail: !!session?.user?.email,
      hasBackendToken: !!session?.user?.backendToken,
      tokenPreview: session?.user?.backendToken ? `${session.user.backendToken.substring(0, 10)}...` : 'none'
    });

    if (!session?.user?.email || !session?.user?.backendToken) {
      console.error('Unauthorized: Missing session data', {
        hasEmail: !!session?.user?.email,
        hasBackendToken: !!session?.user?.backendToken
      });
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get latest analysis result from backend
    const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:5001';
    console.log('Fetching from backend:', `${backendUrl}/results/latest`);

    const backendResponse = await fetch(`${backendUrl}/results/latest`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${session.user.backendToken}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Backend response status:', backendResponse.status);

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json().catch(() => ({}));
      console.error('Backend error:', {
        status: backendResponse.status,
        statusText: backendResponse.statusText,
        error: errorData
      });
      return NextResponse.json(
        { error: errorData.error || 'Failed to fetch analysis results' },
        { status: backendResponse.status }
      );
    }

    const backendData = await backendResponse.json();
    console.log('Backend data received:', backendData);
    
    return NextResponse.json(backendData);

  } catch (error) {
    console.error('Error in /api/results/latest:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analysis results', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 