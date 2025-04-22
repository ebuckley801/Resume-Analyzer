import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        firstName: { label: "First Name", type: "text", optional: true },
        lastName: { label: "Last Name", type: "text", optional: true }
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        // Force the backend URL to use port 5001
        const backendUrl = process.env.BACKEND_API_URL;
        console.log('Attempting to connect to backend at:', backendUrl);
        
        // Check if this is a registration request
        const isRegistration = credentials.firstName && credentials.lastName;
        const endpoint = isRegistration ? '/auth/register' : '/auth/login';
        console.log('Using endpoint:', endpoint);

        try {
          const requestBody = {
            email: credentials.email,
            password: credentials.password,
            ...(isRegistration && {
              first_name: credentials.firstName,
              last_name: credentials.lastName
            })
          };
          console.log('Sending request body:', JSON.stringify(requestBody, null, 2));

          const backendResponse = await fetch(`${backendUrl}${endpoint}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify(requestBody)
          });

          console.log('Backend response status:', backendResponse.status);
          console.log('Backend response headers:', JSON.stringify(Object.fromEntries(backendResponse.headers.entries()), null, 2));

          // Log the response for debugging
          const responseText = await backendResponse.text();
          console.log('Raw backend response:', responseText);

          if (!backendResponse.ok) {
            let errorMessage = "Authentication failed";
            try {
              const errorData = JSON.parse(responseText);
              errorMessage = errorData.error || errorMessage;
            } catch (e) {
              console.error('Failed to parse error response:', e);
              errorMessage = `Server returned status ${backendResponse.status} with empty response. Please ensure the backend server is running at ${backendUrl}`;
            }
            throw new Error(errorMessage);
          }

          let backendData;
          try {
            backendData = JSON.parse(responseText);
          } catch (e) {
            console.error('Failed to parse success response:', e);
            throw new Error('Invalid response from server');
          }

          if (!backendData.user) {
            throw new Error('Invalid user data received');
          }

          return {
            id: backendData.user.id.toString(),
            email: backendData.user.email,
            name: `${backendData.user.first_name} ${backendData.user.last_name}`,
            firstName: backendData.user.first_name,
            lastName: backendData.user.last_name,
            isAdmin: backendData.user.is_admin,
            isActive: backendData.user.is_active,
            backendToken: backendData.token
          };
        } catch (error) {
          console.error("Authentication error:", error);
          throw error;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.isAdmin = user.isAdmin;
        token.isActive = user.isActive;
        token.backendToken = user.backendToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.isAdmin = token.isAdmin;
        session.user.isActive = token.isActive;
        session.user.backendToken = token.backendToken;
      }
      return session;
    }
  },
  pages: {
    signIn: '/sign-in',
    signUp: '/sign-up',
    error: '/auth/error',
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development'
};
