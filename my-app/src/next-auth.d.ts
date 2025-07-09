import "next-auth";

declare module "next-auth" {
  interface Session {  // eslint-disable-line
    accessToken?: string;
    userId?: string;
  }

  interface JWT { // eslint-disable-line
    backendAccessToken?: string;
    userId?: string;
  }
}