import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter Admin Password",
        },
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.password) {
          return null;
        }
        try {
          const isPasswordCorrect = await bcrypt.compare(
            credentials?.password,
            process.env.ADMIN_PASSWORD_HASH!
          );
          if (isPasswordCorrect) {
            const user = { id: "1", name: "Admin", email: "admin@example.com" };
            return user;
          }
        } catch (err) {
          console.log("bycrpt error: ", err);
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async redirect() {
      return `/admin`;
    },
  },
};
