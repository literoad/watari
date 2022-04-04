import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import fetch from "node-fetch";

const stopAutoBilling: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  const user = session?.user;

  if (!user) {
    return res.status(401).send("Unauthorized");
  }

  await fetch(`${process.env.SHINGO_URL}/payments/disable-rebill`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user,
    }),
  });

  res.status(200).send("OK");
};

export default stopAutoBilling;
