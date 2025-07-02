import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async jwt({ token, account, profile, user, trigger, session }) {
      if (account && profile) {
        console.log("begin jwt callback");
        console.log(account.provider);
        console.log(account.access_token);
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
          console.log(res);

          if (!res.ok) throw new Error("Failed to login with backend");

          const data = await res.json();

          token.backendAccessToken = data.access_token;
          token.backendRefreshToken = data.refresh_token;
          token.userId = data.user_id;

        } catch (err) {
          console.error("Social login error:", err);
        }
      }

      return token;
    },

    async redirect({ url, baseUrl }) {
    return `${baseUrl}/dashboard`;
  },
  }
});