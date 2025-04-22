import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/authOptions';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    console.log('Session in /api/results:', {
      hasSession: !!session,
      hasUser: !!session?.user,
      hasEmail: !!session?.user?.email,
      hasBackendToken: !!session?.user?.backendToken,
      tokenPreview: session?.user?.backendToken ? `${session.user.backendToken.substring(0, 10)}...` : 'none',
      userEmail: session?.user?.email,
      tokenLength: session?.user?.backendToken?.length
    });

    if (!session?.user?.email || !session?.user?.backendToken) {
      console.error('Unauthorized: Missing session data', {
        hasEmail: !!session?.user?.email,
        hasBackendToken: !!session?.user?.backendToken,
        sessionData: session
      });
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get analysis results from backend
    const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:5001';
    console.log('Fetching from backend:', `${backendUrl}/results`, {
      headers: {
        'Authorization': `Bearer ${session.user.backendToken.substring(0, 10)}...`,
        'Content-Type': 'application/json'
      }
    });

    try {
      const backendResponse = await fetch(`${backendUrl}/results`, {
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
        
        // If the token is invalid, return a 401
        if (backendResponse.status === 401) {
          return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
        }
        
        return NextResponse.json(
          { error: errorData.error || 'Failed to fetch analysis results' },
          { status: backendResponse.status }
        );
      }

      const backendData = await backendResponse.json();
      console.log('Backend data received:', {
        isArray: Array.isArray(backendData),
        length: Array.isArray(backendData) ? backendData.length : 'not an array'
      });
      
      // Ensure we always return an array
      const results = Array.isArray(backendData) ? backendData : [];
      
      return NextResponse.json(results);
    } catch (error) {
      console.error('Error in /api/results:', error);
      return NextResponse.json(
        { error: 'Failed to fetch analysis results', details: error instanceof Error ? error.message : 'Unknown error' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error in /api/results:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analysis results', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !session?.user?.backendToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Analysis result ID is required' },
        { status: 400 }
      );
    }

    // Delete analysis result from backend
    const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:5001';
    const backendResponse = await fetch(`${backendUrl}/results/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${session.user.backendToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.error || 'Failed to delete analysis result' },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json({ message: 'Analysis result deleted successfully' });

  } catch (error) {
    console.error('Error deleting analysis result:', error);
    return NextResponse.json(
      { error: 'Failed to delete analysis result' },
      { status: 500 }
    );
  }
} 