import prisma from "../../../prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

if (!process.env.API_KEY) {
  throw new Error("Please add an api key");
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { userName, score, highestScoreWord } = req.body.data;

      console.log(highestScoreWord.word)

      const user = await prisma.score.create({
        data: {
          userName,
          score,
          highestScore: highestScoreWord.word,
        },
      });

      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Error creating a score and user" });
    }
  }
}
