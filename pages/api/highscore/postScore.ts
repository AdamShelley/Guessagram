import prisma from "../../../prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log("Posting");
    const { userName, score } = req.body.data;

    try {
      // Create user
      const user = await prisma.score.create({
        data: {
          userName,
          score,
        },
      });

      res.status(200).json(user);
    } catch (err) {
      console.log(err);
    }
  }
}
