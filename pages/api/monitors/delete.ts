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

  const userId = user.id;
  const { id } = req.body;

  if (!id) {
    return res.status(400).send('Bad "id"');
  }
  if (!id.startsWith(userId + "~")) {
    return res.status(401).send("Unauthorized");
  }

  await fetch(`${process.env.YAGAMI_URL}/monitors/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Api-Key ${process.env.SERVICE_KEY}`,
    },
  });

  const client = await clientPromise;
  await client
    .db("watari")
    .collection("users")
    .updateOne(
      {
        _id: new ObjectId(userId),
      },
      {
        $pull: {
          monitors: {
            _id: id,
          },
        },
      }
    );

  res.status(204).send("No Content");
};

export default addMonitor;
