import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        if (!res.ok) throw new Error("Invalid credentials");
        const user = await res.json();

        return {
          id: user.user_id,
          name: user.username,
          email: user.email,
          accessToken: user.access_token,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, profile, user, trigger, session }) {
      if (account && profile) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/social/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              provider: account.provider,
              access_token: account.access_token,
            }),
          });

          if (!res.ok) throw new Error("Failed to login with backend");

          const data = await res.json();

          token.backendAccessToken = data.access_token;
          token.userId = data.user_id;

        } catch (err) {
          console.error("Social login error:", err);
        }
      }

      return { ...token, accessToken: token.backendAccessToken };
    },

    async redirect({ url, baseUrl }) {
    return `${baseUrl}/dashboard`;
  },

  async session({ session, token }) {
    session.accessToken = token.accessToken as string | undefined
    return session;
}
  }
});