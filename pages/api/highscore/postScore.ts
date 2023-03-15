import prisma from "../../../prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {


    

    try {
      const { userName, score, highestScoreWord, api_key} = req.body.data;

      if (!api_key || api_key !== process.env.API_KEY) {
        return res.status(401).json({message: 'Not authorized'})
      }

      if (score > 250) {
        return res.status(401).json({message: 'I just dont believe you.. '})
      }

      const user = await prisma.score.create({
        data: {
          userName,
          score,
          highestScore: `${highestScoreWord.word} (${highestScoreWord.score})`,
        },
      });

      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Error creating a score and user" });
    }
  }
}
