import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/authOptions';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get all analysis results for the user
    const analysisResults = await prisma.analysisResult.findMany({
      where: { userId: user.id },
      include: {
        upload: true,
        jobDescription: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Format the results
    const formattedResults = analysisResults.map(result => ({
      id: result.id,
      score: result.score,
      industry: result.industry,
      createdAt: result.createdAt,
      resumeName: result.upload.filename,
      jobDescriptionPreview: result.jobDescription.rawText.substring(0, 100) + '...',
      status: result.analysisData ? 'completed' : 'processing'
    }));

    return NextResponse.json(formattedResults);

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
    if (!session?.user?.email) {
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

    // Get the analysis result
    const analysisResult = await prisma.analysisResult.findUnique({
      where: { id },
      include: { user: true }
    });

    if (!analysisResult) {
      return NextResponse.json(
        { error: 'Analysis result not found' },
        { status: 404 }
      );
    }

    // Verify the user has access to this result
    if (analysisResult.user.email !== session.user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Delete the analysis result and related records
    await prisma.analysisResult.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Analysis result deleted successfully' });

  } catch (error) {
    console.error('Error deleting analysis result:', error);
    return NextResponse.json(
      { error: 'Failed to delete analysis result' },
      { status: 500 }
    );
  }
} 