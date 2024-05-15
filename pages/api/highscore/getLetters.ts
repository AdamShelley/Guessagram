import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    console.log("Getting letters");
    try {
      const data = await prisma.letters.findFirst();

      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res
        .status(403)
        .json({ message: "There has been an issue getting the letters." });
    }
  }
}
