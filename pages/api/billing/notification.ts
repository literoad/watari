import { NextApiHandler } from "next";
import fetch from "node-fetch";

const passthroughNotification: NextApiHandler = async (req, res) => {
  const notifRq = await fetch(
    `${process.env.SHINGO_URL}/payments/notification`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    }
  );
  res.status(notifRq.status).send(await notifRq.text());
};

export default passthroughNotification;
