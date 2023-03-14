import prisma from "../../../prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    try {
      
      const {api_key} = req.body;
      
      if (api_key !== process.env.API_KEY) {
        return res.status(401).json({message: 'Not allowed here'})
      }

      const deleteAllScores = await prisma.score.deleteMany();

      res.status(200).json(deleteAllScores);
    } catch (err) {
      console.log(err);
    }
  }
}
