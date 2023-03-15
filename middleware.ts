// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const { pathname } = url;


  if (pathname.startsWith(`/api/highscore`)) {
    console.log(req.headers.get("host"))
    if (!req.headers.get("host")?.includes(process.env.APP_URL_PROD as string)) {
      console.log('uh oh!')
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!_next|fonts|examples|svg|[\\w-]+\\.\\w+).*)"],
};
