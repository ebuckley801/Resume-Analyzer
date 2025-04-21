import { authOptions } from "./authOptions";
import { getServerSession } from "next-auth";

const BACKEND_URL = process.env.BACKEND_API_URL || 'http://localhost:5001';

async function getServerSessionUserId() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    throw new Error("User session not found");
  }
  return session.user.id;
}

export async function getUserData() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.backendToken) {
      throw new Error("Not authenticated");
    }

    const response = await fetch(`${BACKEND_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${session.backendToken}`
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in getUserData:", error);
    throw error;
  }
}

export async function deleteUserData() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.backendToken) {
      throw new Error("Not authenticated");
    }

    const response = await fetch(`${BACKEND_URL}/auth/delete-account`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.backendToken}`
      }
    });

    if (!response.ok) {
      throw new Error("Failed to delete user data");
    }

    return { success: true };
  } catch (error) {
    console.error("Error in deleteUserData:", error);
    throw error;
  }
}

export async function CheckUserPassword(password: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.backendToken) {
      throw new Error("Not authenticated");
    }

    const response = await fetch(`${BACKEND_URL}/auth/verify-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.backendToken}`
      },
      body: JSON.stringify({ password })
    });

    if (!response.ok) {
      throw new Error("Password is incorrect");
    }

    return true;
  } catch (error) {
    console.error("Error in CheckUserPassword:", error);
    throw error;
  }
}