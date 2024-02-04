import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: 'Username', type: 'text' },
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        console.log('req: ', req)
        
        const user = { id: 1, name: credentials.username, email: credentials.email };
        if (user) {
          return Promise.resolve(user);
        } else {
          return Promise.resolve(null);
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/login', // Change this to your sign-in page path
    signOut: '/auth/logout', // Change this to your sign-out page path
    error: '/auth/error', // Change this to your error page path
    verifyRequest: '/auth/verify-request', // Change this to your verification request page path
  },
  session: {
    jwt: true,
  },
});
