import prisma from "../../../prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    try {
      // Create user
      const deleteAllScores = await prisma.score.deleteMany();

      console.log(deleteAllScores);

      res.status(200).json(deleteAllScores);
    } catch (err) {
      console.log(err);
    }
  }
}
