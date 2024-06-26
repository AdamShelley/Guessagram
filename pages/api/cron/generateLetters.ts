import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET() {
  try {
    const response = await fetch(
      "https://guessagram.vercel.app/api/highscore/generateLetters",
      {
        method: "POST",
      }
    );
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({ ok: true });
}
