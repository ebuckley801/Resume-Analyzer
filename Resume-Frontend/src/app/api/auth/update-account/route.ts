import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/authOptions';
import { z } from 'zod';

const updateAccountSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().optional(),
  confirmPassword: z.string().optional(),
});

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !session?.user?.backendToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = updateAccountSchema.parse(body);

    // Update account with backend
    const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:5001';
    const backendResponse = await fetch(`${backendUrl}/auth/update-account`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.user.backendToken}`
      },
      body: JSON.stringify({
        first_name: validatedData.firstName,
        last_name: validatedData.lastName,
        email: validatedData.email,
        current_password: validatedData.currentPassword,
        new_password: validatedData.newPassword
      })
    });

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json();
      return NextResponse.json(
        { error: errorData.error || 'Failed to update account' },
        { status: backendResponse.status }
      );
    }

    const backendData = await backendResponse.json();
    return NextResponse.json({
      message: 'Account updated successfully',
      user: {
        id: backendData.user.id,
        email: backendData.user.email,
        firstName: backendData.user.first_name,
        lastName: backendData.user.last_name
      }
    });

  } catch (error) {
    console.error('Error updating account:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update account' },
      { status: 500 }
    );
  }
} 