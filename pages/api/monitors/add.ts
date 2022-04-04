import { ObjectId } from "mongodb";
import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import fetch from "node-fetch";
import clientPromise from "../../../lib/mongodb";

const addMonitor: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  const user = session?.user;

  if (!user) {
    return res.status(401).send("Unauthorized");
  }
  if (!user.active) {
    return res.status(402).send("Payment Required");
  }

  const userId = user.id;
  const { url, hourZone } = req.body;

  if (hourZone < 0 || hourZone > 23) {
    return res.status(400).send('Bad "hourZone"');
  }

  const client = await clientPromise;
  const userDoc = await client
    .db("watari")
    .collection("users")
    .findOne({
      _id: new ObjectId(userId),
    });

  if (userDoc?.monitors?.length >= 10) {
    return res.status(403).send("Forbidden: too many monitors");
  }

  const addRq = await fetch(`${process.env.YAGAMI_URL}/monitors`, {
    method: "POST",
    headers: {
      Authorization: `Api-Key ${process.env.SERVICE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "tenant-id": userId,
      monitor: {
        url,
        "hour-zone": Math.trunc(hourZone).toString(10),
      },
    }),
  });
  const monitorId = await addRq.text();

  await client
    .db("watari")
    .collection("users")
    .updateOne(
      {
        _id: new ObjectId(userId),
      },
      {
        $push: {
          monitors: {
            _id: monitorId,
            url,
            hourZone,
          },
        },
      }
    );

  res.redirect("/dashboard").json({ url, hourZone });
};

export default addMonitor;
