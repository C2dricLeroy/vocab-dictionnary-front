import "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    userId?: string;
  }

  interface JWT {
    backendAccessToken?: string;
    userId?: string;
  }
}