import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const data = await prisma.score.findMany({
        orderBy: {
          score: "desc",
        },
        take: 10,
      });

      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res
        .status(403)
        .json({ message: "There has been an issue getting the scores." });
    }
  }
}
