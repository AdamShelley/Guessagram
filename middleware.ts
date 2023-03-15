// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const { pathname } = url;



  if (pathname.startsWith(`/api/highscore`)) {
    if (!req.headers.get("referer")?.includes(process.env.APP_URL_PROD as string)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/highscore/postScore"],
};
