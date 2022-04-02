import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";

const printSessionInfo: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (session && process.env.NODE_ENV === "development") {
    console.log("Session", JSON.stringify(session, null, 2));
  } else {
    res.status(401);
  }
  res.end();
};

export default printSessionInfo;
