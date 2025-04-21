import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      isAdmin: boolean
      isActive: boolean
      backendToken: string
    }
  }

  interface User {
    id: number
    email: string
    name: string
    isAdmin: boolean
    isActive: boolean
    backendToken: string
  }
} 