import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/authOptions';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const resume = formData.get('resume') as File;
    const jobDescription = formData.get('jobDescription') as string;

    if (!resume || !jobDescription) {
      return NextResponse.json(
        { error: 'Resume and job description are required' },
        { status: 400 }
      );
    }

    // Get the user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Create upload record
    const upload = await prisma.upload.create({
      data: {
        filename: resume.name,
        processedText: 'Resume text will be processed here', // This will be replaced with actual text processing
        userId: user.id
      }
    });

    // Create job description record
    const jobDesc = await prisma.jobDescription.create({
      data: {
        rawText: jobDescription,
        analysisData: '{}', // This will be replaced with actual analysis data
        contentHash: 'hash' // This will be replaced with actual hash
      }
    });

    // Create analysis result
    const analysisResult = await prisma.analysisResult.create({
      data: {
        analysisData: JSON.stringify({
          score: 85,
          strengths: [
            'Strong technical background',
            'Relevant work experience',
            'Good education credentials'
          ],
          improvements: [
            'Could highlight more leadership experience',
            'Consider adding more project management skills'
          ],
          missing: [
            'Specific certification mentioned in job description',
            'Experience with certain tools'
          ],
          recommendations: [
            'Add more details about leadership roles',
            'Include relevant certifications',
            'Highlight specific technical skills'
          ]
        }),
        resumeText: 'Resume text will be processed here',
        jobDescriptionText: jobDescription,
        score: 85,
        industry: 'Technology',
        analysisVersion: '1.0',
        userId: user.id,
        uploadId: upload.id,
        jobDescriptionId: jobDesc.id
      }
    });

    return NextResponse.json({ id: analysisResult.id });

  } catch (error) {
    console.error('Error analyzing resume:', error);
    return NextResponse.json(
      { error: 'Failed to analyze resume' },
      { status: 500 }
    );
  }
} 