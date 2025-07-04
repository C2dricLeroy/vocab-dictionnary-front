import "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    userId?: string;
  }

  interface JWT {
    backendAccessToken?: string;
    backendRefreshToken?: string;
    userId?: string;
  }
}