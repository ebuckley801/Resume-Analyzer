import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import prisma from '@/app/lib/prisma';
import { getUserData } from '@/app/lib/data';

export async function POST(request: Request) {
   const body = await request.json();
   const { firstName, lastName, emailAddress, password } = body;

   // Validate the input (e.g., check if email is already in use)
   const existingUser = await prisma.user.findUnique({
      where: { email: emailAddress },
   });

   if (existingUser) {
      return new NextResponse(JSON.stringify({ error: 'Email already in use' }), { status: 400 });
   }

   // Send registration request to backend
   const backendUrl = process.env.BACKEND_API_URL;
   const backendResponse = await fetch(`${backendUrl}/auth/register`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         email: emailAddress,
         password: password,
         first_name: firstName,
         last_name: lastName,
      }),
   });

   if (!backendResponse.ok) {
      const error = await backendResponse.json();
      return new NextResponse(JSON.stringify({ error: error.message || 'Registration failed' }), { status: backendResponse.status });
   }

   const backendData = await backendResponse.json();

   // Create the user in the local database with the hashed password from backend
   const user = await prisma.user.create({
      data: {
         firstName,
         lastName,
         email: emailAddress,
         passwordHash: backendData.user.password_hash, // Use the hash from backend
      },
   });

   return new NextResponse(JSON.stringify({ message: 'User created successfully', user }), { status: 200 });
}

export async function GET() {
   const session = await getServerSession(authOptions);
   if (!session) {
      return new NextResponse(JSON.stringify({ error: 'No session found' }), { status: 400 });
   }

   const data = await prisma.user.findMany();
   console.log(data)
   return NextResponse.json(data);
}

// update user info
export async function PUT(request: Request) {
   const session = await getServerSession(authOptions);
   if (!session) {
      return new NextResponse(JSON.stringify({ error: 'No session found' }), { status: 400 });
   }
   const user = await getUserData();

   const body = await request.json();
   const { firstName, lastName, emailAddress, password } = body;

   // Send password update request to backend
   const backendUrl = process.env.BACKEND_API_URL;
   const backendResponse = await fetch(`${backendUrl}/auth/update`, {
      method: 'PUT',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         email: emailAddress,
         password: password,
         first_name: firstName,
         last_name: lastName,
      }),
   });

   if (!backendResponse.ok) {
      const error = await backendResponse.json();
      return new NextResponse(JSON.stringify({ error: error.message || 'Update failed' }), { status: backendResponse.status });
   }

   const backendData = await backendResponse.json();

   // Update the user in the local database with the new hashed password from backend
   const updateUser = await prisma.user.update({
      where: { email: user?.email },
      data: {
         firstName,
         lastName,
         email: emailAddress,
         passwordHash: backendData.user.password_hash, // Use the hash from backend
      },
   });

   return new NextResponse(JSON.stringify({ message: 'User updated successfully', updateUser }), { status: 200 });
}