import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
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
          token.backendRefreshToken = data.refresh_token;
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