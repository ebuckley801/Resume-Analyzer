import { NextResponse } from "next/server"
import { hash } from "bcryptjs"
import { PrismaClient, Prisma } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log("Received sign-up request:", body)
    const { firstName, lastName, email, password } = body

    // Validate input
    if (!firstName || !lastName || !email || !password) {
      console.log("Missing required fields:", { firstName, lastName, email, password: !!password })
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.log("Invalid email format:", email)
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      )
    }

    // Validate password strength
    if (password.length < 8) {
      console.log("Password too short")
      return NextResponse.json(
        { message: "Password must be at least 8 characters long" },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      console.log("User already exists:", email)
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      )
    }

    // Hash the password
    const hashedPassword = await hash(password, 12)

    // Create the user
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        passwordHash: hashedPassword,
      }
    })

    console.log("User created successfully:", user.id)

    // Return success without sensitive data
    return NextResponse.json({ 
      message: "Account created successfully",
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      }
    })
  } catch (error) {
    console.error("Sign up error:", error)
    // Check if it's a Prisma error
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          { message: "Email already exists" },
          { status: 400 }
        )
      }
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 