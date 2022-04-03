import { ObjectId } from "mongodb";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import clientPromise from "./mongodb";

export async function getMonitorsForCurrentUser(context: NextPageContext) {
  const session = await getSession(context);
  const user = session?.user;

  if (!user) {
    return [];
  }

  const client = await clientPromise;
  const userDoc = await client
    .db()
    .collection("users")
    .findOne({
      _id: new ObjectId(user.id),
    });

  if (!userDoc) {
    return [];
  }

  return userDoc.monitors || [];
}
