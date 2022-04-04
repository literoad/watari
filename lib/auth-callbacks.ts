import { Session, User } from "next-auth";
import fetch from "node-fetch";

export async function session({
  session,
  user,
}: {
  session: Session;
  user: User;
}) {
  const userStatus = await fetch(`${process.env.SHINGO_URL}/users/${user.id}`, {
    headers: {
      Authorization: `Api-Key ${process.env.SERVICE_KEY}`,
    },
  });
  const userStatusJson = (await userStatus.json()) as any;

  const sessUser = session.user;
  if (sessUser) {
    sessUser.id = user.id;
    sessUser.subscription = userStatusJson.subscription;
    sessUser.active = userStatusJson.active;
    sessUser.rebill = userStatusJson.rebill;
  }

  return session;
}
