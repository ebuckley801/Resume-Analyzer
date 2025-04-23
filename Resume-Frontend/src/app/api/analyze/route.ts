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

    const { jobId, resumeText, analysisData, uploadId } = data;

    // Validate each field individually with detailed logging
    const validationErrors = [];
    
    if (!jobId) validationErrors.push('jobId is missing');
    if (!resumeText) validationErrors.push('resumeText is missing');
    if (!analysisData) validationErrors.push('analysisData is missing');
    if (!uploadId) validationErrors.push('uploadId is missing');

    console.log('Field validation:', {
      hasJobId: !!jobId,
      jobIdType: typeof jobId,
      jobIdValue: jobId,
      hasResumeText: !!resumeText,
      resumeTextLength: resumeText?.length,
      hasAnalysisData: !!analysisData,
      analysisDataType: typeof analysisData,
      hasUploadId: !!uploadId,
      uploadIdType: typeof uploadId,
      uploadIdValue: uploadId
    });

    if (validationErrors.length > 0) {
      console.log('Validation errors:', validationErrors);
      return NextResponse.json(
        { error: `Missing required fields: ${validationErrors.join(', ')}` },
        { status: 400 }
      );
    }

    try {
      // Store the analysis result in the database
      const analysis = await prisma.analysisResult.create({
        data: {
          job: {
            connect: {
              id: parseInt(jobId)
            }
          },
          resumeText: resumeText,
          analysisData: analysisData,
          user: {
            connect: {
              id: parseInt(session.user.id)
            }
          },
          upload: {
            connect: {
              id: parseInt(uploadId)
            }
          }
        },
        include: {
          job: true,
          upload: true
        }
      });

      // Get the upload to get the filename
      const upload = await prisma.upload.findUnique({
        where: { id: parseInt(uploadId) }
      });

      // Format the response to match what the frontend expects
      const formattedResponse = {
        id: analysis.id.toString(),
        score: analysisData.score || 0,
        industry: analysisData.industry || null,
        createdAt: analysis.createdAt.toISOString(),
        resumeName: upload?.filename || 'Uploaded Resume',
        jobDescriptionPreview: resumeText.substring(0, 100) + '...',
        status: 'completed',
        matchingStrengths: analysisData.matchingStrengths || '',
        areasForImprovement: analysisData.areasForImprovement || '',
        missingRequirements: analysisData.missingRequirements || '',
        recommendations: analysisData.recommendations || ''
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