import { generateLetters } from "./../../../app/utils/letterGenerator";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      // Generate new letters
      // IF API KEY does not match body dont generate new letters
      // TBC
      const generatedLetters = generateLetters({ vowels: 2 });
      await prisma.letters.deleteMany();

      const letters = await prisma.letters.create({
        data: {
          letter: generatedLetters,
        },
      });

      res.status(200).json(letters);
    } catch (err) {
      console.log(err);
      res
        .status(403)
        .json({ message: "There has been an issue getting the scores." });
    }
  }
}
