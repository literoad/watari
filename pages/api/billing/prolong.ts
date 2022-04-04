import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import fetch from "node-fetch";

const prolongSubscription: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  const user = session?.user;

  if (!user) {
    return res.status(401).send("Unauthorized");
  }

  const prolongRq = await fetch(`${process.env.SHINGO_URL}/payments`, {
    method: "POST",
    headers: {
      Authorization: `Api-Key ${process.env.SERVICE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user,
    }),
  });

  res.status(200).json(await prolongRq.json());
};

export default prolongSubscription;
