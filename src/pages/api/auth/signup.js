import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign-in form (e.g., 'Sign in with...')
      name: 'Credentials',
      credentials: {
        username: { label: 'Email', type: 'email' },
        password: {  label: 'Password',  type: 'password' },
      },
      async authorize(credentials, req) {
        // Add your authentication logic here
        const user = { id: 1, name: 'John Doe', email: credentials.username };
        if (user) {
          return Promise.resolve(user);
        } else {
          return Promise.resolve(null);
        }
      },
    }),
  ],
  pages: {
    // signIn: '/auth/signin', // Change this to your sign-in page path
  },
  session: {
    jwt: true,
  },
});
