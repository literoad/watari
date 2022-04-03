import type { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      subscription: {
        expires: string;
        trial: boolean;
      };
      active: boolean;
      willRebill: boolean;
    };
  }
}
