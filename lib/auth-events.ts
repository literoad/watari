import { User } from "next-auth";
import fetch from "node-fetch";

export async function onCreateUser({ user }: { user: User }) {
  await fetch(`${process.env.SHINGO_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user }),
  });
}
