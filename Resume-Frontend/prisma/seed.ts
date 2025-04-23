import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create a test user
  const passwordHash = await bcryptjs.hash('password123', 10);
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      passwordHash,
      firstName: 'Test',
      lastName: 'User',
      isActive: true,
      isAdmin: true,
    },
  });

  // Create a test job description
  const jobDescription = await prisma.jobDescription.create({
    data: {
      rawText: 'Software Engineer position at Tech Corp',
      analysisData: {
        skills: ['JavaScript', 'Python', 'React'],
        industry: 'Technology',
        jobTitle: 'Software Engineer',
        experience: '3+ years',
        requirements: ['Bachelor\'s degree', 'Strong problem-solving skills'],
      },
      contentHash: 'abc123',
      userId: user.id,
    },
  });

  // Create a test upload
  const upload = await prisma.upload.create({
    data: {
      filename: 'test-resume.pdf',
      processedText: 'This is a test resume',
      userId: user.id,
    },
  });

  // Create a test analysis result
  await prisma.analysisResult.create({
    data: {
      job: {
        connect: {
          id: jobDescription.id
        }
      },
      resumeText: 'This is a test resume',
      analysisData: {
        score: 0.8,
        matchingStrengths: ['Strong problem-solving skills'],
        areasForImprovement: ['More experience with React'],
        missingRequirements: ['Bachelor\'s degree'],
        recommendations: ['Consider getting a degree in Computer Science']
      },
      user: {
        connect: {
          id: user.id
        }
      },
      upload: {
        connect: {
          id: upload.id
        }
      }
    }
  });

  console.log('Database has been seeded. 🌱');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 