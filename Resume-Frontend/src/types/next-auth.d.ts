import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      firstName?: string
      lastName?: string
      isAdmin: boolean
      isActive: boolean
      backendToken: string
    }
  }

  interface User {
    id: string
    email: string
    name: string
    firstName?: string
    lastName?: string
    isAdmin: boolean
    isActive: boolean
    backendToken: string
  }
} 