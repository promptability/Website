import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/admin/beta"],
};

export function middleware(req: NextRequest) {
  const user = process.env.BETA_DASH_USER || "admin";
  const pass = process.env.BETA_DASH_PASS || "password";

  const header = req.headers.get("authorization");
  if (!header?.startsWith("Basic ")) return unauthorized();

  const [u, p] = Buffer.from(header.split(" ")[1], "base64").toString().split(":");
  if (u !== user || p !== pass) return unauthorized();

  return NextResponse.next();

  function unauthorized() {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: { 
        "WWW-Authenticate": 'Basic realm="Beta Dashboard"',
        "Content-Type": "text/plain"
      },
    });
  }
}