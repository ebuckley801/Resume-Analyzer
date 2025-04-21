import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/authOptions';
import { PrismaClient } from '@prisma/client';

// Initialize Prisma client
const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !session?.user?.backendToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the raw request body
    const rawBody = await request.text();
    console.log('Raw request body:', rawBody);

    let data;
    try {
      data = JSON.parse(rawBody);
      console.log('Parsed request data:', data);
    } catch (error) {
      const parseError = error as Error;
      console.error('Error parsing request body:', parseError);
      return NextResponse.json(
        { error: 'Invalid JSON in request body', details: parseError.message },
        { status: 400 }
      );
    }

    const { job_id, resume_text, analysis_data } = data;

    if (!job_id || !resume_text || !analysis_data) {
      console.log('Missing fields:', { job_id, resume_text, analysis_data });
      return NextResponse.json(
        { error: 'Missing required fields: job_id, resume_text, and analysis_data are required' },
        { status: 400 }
      );
    }

    try {
      // Store the analysis result in the database
      const analysis = await prisma.analysisResult.create({
        data: {
          jobId: parseInt(job_id),
          resumeText: resume_text,
          analysisData: analysis_data,
          userId: parseInt(session.user.id)
        }
      });

      // Format the response to match what the frontend expects
      const formattedResponse = {
        id: analysis.id.toString(),
        score: analysis_data.score || 0,
        industry: analysis_data.industry || null,
        createdAt: analysis.createdAt.toISOString(),
        resumeName: 'Uploaded Resume', // You might want to get this from the upload
        jobDescriptionPreview: resume_text.substring(0, 100) + '...',
        status: 'completed',
        matchingStrengths: analysis_data.matchingStrengths || '',
        areasForImprovement: analysis_data.areasForImprovement || '',
        missingRequirements: analysis_data.missingRequirements || '',
        recommendations: analysis_data.recommendations || ''
      };

      // Return a valid JSON response with the formatted data
      return NextResponse.json(formattedResponse);
    } catch (error: any) {
      console.error('Analysis error:', error);
      return NextResponse.json(
        { error: 'Failed to save analysis', details: error.message },
        { status: 500 }
      );
    } finally {
      // Disconnect Prisma client
      await prisma.$disconnect();
    }

  } catch (error: any) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
} 