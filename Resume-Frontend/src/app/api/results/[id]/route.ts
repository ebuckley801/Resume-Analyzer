import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/authOptions';
import { PrismaClient } from '@prisma/client';

// Initialize Prisma client
const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized - Please sign in' }, { status: 401 });
    }

    // Check if we have a valid user ID
    if (!session.user.id) {
      return NextResponse.json({ error: 'Invalid user session' }, { status: 401 });
    }

    const id = params.id;
    if (!id) {
      return NextResponse.json({ error: 'Analysis result ID is required' }, { status: 400 });
    }

    // Validate user ID
    const userId = parseInt(session.user.id);
    if (isNaN(userId)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    try {
      // Get analysis result from database
      const analysis = await prisma.analysisResult.findFirst({
        where: { 
          id: parseInt(id),
          userId: userId // Ensure we only get results for the current user
        },
        include: {
          job: true,
          upload: true
        }
      });

      if (!analysis) {
        return NextResponse.json({ error: 'Analysis result not found' }, { status: 404 });
      }

      // Extract the analysis data from the JSON field
      const analysisData = analysis.analysisData as any;

      // Format the response to match what the frontend expects
      const formattedResponse = {
        score: parseFloat(analysisData.job_match?.match_score?.replace('%', '') || '0') / 100,
        matchingStrengths: Array.isArray(analysisData.feedback?.strengths) 
          ? analysisData.feedback.strengths.join('\n')
          : '',
        areasForImprovement: Array.isArray(analysisData.feedback?.improvements)
          ? analysisData.feedback.improvements.join('\n')
          : '',
        missingRequirements: Array.isArray(analysisData.job_match?.requirements_match?.missing)
          ? analysisData.job_match.requirements_match.missing.join('\n')
          : '',
        recommendations: Array.isArray(analysisData.feedback?.recommendations)
          ? analysisData.feedback.recommendations.join('\n')
          : ''
      };

      return NextResponse.json(formattedResponse);
    } catch (error: any) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch analysis result', details: error.message },
        { status: 500 }
      );
    } finally {
      // Disconnect Prisma client
      await prisma.$disconnect();
    }

  } catch (error: any) {
    console.error('Error fetching analysis result:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
} 