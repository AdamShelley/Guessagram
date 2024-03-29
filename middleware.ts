// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const { pathname } = url;

  if (pathname.startsWith(`/api/highscore`)) {
    if (!req.headers.get("referer")?.includes(process.env.APP_URL as string)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}


export const config = {
  matcher: ["/api/highscore/postScore"],
};
