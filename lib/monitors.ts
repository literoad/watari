import { ObjectId } from "mongodb";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import clientPromise from "./mongodb";
import fetch from "node-fetch";

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

  if (!userDoc || !userDoc.monitors || userDoc.monitors.length === 0) {
    return [];
  }

  const { monitors } = userDoc;
  const ids = monitors.map((m: any) => m._id);
  const measurementsRq = await fetch(
    `${process.env.YAGAMI_URL}/aggregator/latest`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids }),
    }
  );
  const measurements = (await measurementsRq.json()) as any;

  return monitors.map((m: any) => ({
    ...m,
    lastResult: measurements[m._id]?.lastResult ?? null,
  }));
}
