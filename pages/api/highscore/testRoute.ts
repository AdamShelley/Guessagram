import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
        
    const data = req.body;
    console.log(data)
    

      res.status(200).json({message: 'okay'});
    } catch (err) {
      console.log(err);
      res
        .status(403)
        .json({ message: "There has been an issue getting the letters." });
    }
  }
}
