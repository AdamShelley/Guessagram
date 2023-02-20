import prisma from "../../../prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log("Posting");
    const { userName, score } = req.body.data;

    console.log("Name is: " + req.body.name);

    console.log("Score is: " + req.body.score);

    try {
      // Create user
      const user = await prisma.score.create({
        data: {
          userName,
          score,
        },
      });

      console.log(user);

      res.status(200).json(user);
    } catch (err) {
      console.log(err);
    }
  }
}
