import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/authOptions';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !session?.backendToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get analysis results from backend
    const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:5001';
    const backendResponse = await fetch(`${backendUrl}/analyze/results`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${session.backendToken}`
      }
    });

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json();
      return NextResponse.json(
        { error: errorData.error || 'Failed to fetch analysis results' },
        { status: backendResponse.status }
      );
    }

    const backendData = await backendResponse.json();
    
    // Ensure we always return an array
    const results = Array.isArray(backendData) ? backendData : [];
    
    return NextResponse.json(results);

  } catch (error) {
    console.error('Error fetching analysis results:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analysis results' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !session?.backendToken) {
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
    const backendResponse = await fetch(`${backendUrl}/analyze/results/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${session.backendToken}`
      }
    });

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json();
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