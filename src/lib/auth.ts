import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from '@/lib/db';

// Extend the built-in session type
declare module 'next-auth' {
  interface Session {
    accessToken?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account"
        }
      }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('Sign in callback:', { user, account, profile });
      if (!user.email) {
        console.error('No email provided');
        return false;
      }

      try {
        // Create or update user in database
        const dbUser = await prisma.user.upsert({
          where: { email: user.email },
          create: {
            email: user.email,
            name: user.name,
            image: user.image,
          },
          update: {
            name: user.name,
            image: user.image,
          },
        });
        console.log('User upserted:', dbUser);
        return true;
      } catch (error) {
        console.error('Error during sign in:', error);
        return false;
      }
    },
    async session({ session, token }) {
      console.log('Session callback:', { session, token });
      if (token.accessToken) {
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
    async jwt({ token, account, profile }) {
      console.log('JWT callback:', { token, account, profile });
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.profile = profile;
      }
      return token;
    }
  },
  debug: true // Enable debug logs
}; 