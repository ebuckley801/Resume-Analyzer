const { PrismaClient } = require('@prisma/client')
const { hash } = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  // Create a test user
  const testUser = await prisma.user.create({
    data: {
      email: 'test@example.com',
      passwordHash: await hash('password123', 12),
      firstName: 'Test',
      lastName: 'User',
    },
  })

  // Create a test upload
  const testUpload = await prisma.upload.create({
    data: {
      filename: 'test-resume.pdf',
      processedText: 'Sample resume content...',
      userId: testUser.id,
    },
  })

  // Create a test job description
  const testJobDescription = await prisma.jobDescription.create({
    data: {
      rawText: 'Sample job description...',
      analysisData: JSON.stringify({
        requiredSkills: ['JavaScript', 'React', 'Node.js'],
        preferredSkills: ['TypeScript', 'AWS'],
        experience: '3+ years',
      }),
      contentHash: 'test-hash-123',
    },
  })

  // Create a test analysis result
  await prisma.analysisResult.create({
    data: {
      analysisData: JSON.stringify({
        matchingStrengths: 'Strong JavaScript and React experience',
        areasForImprovement: 'Could improve AWS knowledge',
        missingRequirements: 'None',
        recommendations: 'Consider getting AWS certification',
      }),
      resumeText: 'Sample resume text...',
      jobDescriptionText: 'Sample job description text...',
      score: 0.85,
      industry: 'Technology',
      analysisVersion: '1.0',
      userId: testUser.id,
      uploadId: testUpload.id,
      jobDescriptionId: testJobDescription.id,
    },
  })

  console.log('Database has been seeded. 🌱')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 