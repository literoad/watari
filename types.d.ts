import type { DefaultUser } from "next-auth";

declare type WatariUser = DefaultUser & {
  subscription: {
    expires: string;
    trial: boolean;
  };
  active: boolean;
  rebill: boolean;
};

declare module "next-auth" {
  interface Session {
    user?: WatariUser;
  }
}
