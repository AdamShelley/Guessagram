import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://guessagram.vercel.app/api/highscore/deleteScores",
      {
        method: "DELETE",
      }
    );
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({ ok: true });
}
