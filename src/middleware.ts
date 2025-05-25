import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process?.env?.NEXTAUTH_SECRET,
  });

  if (!token) {
    console.log("No token found, redirecting to sign-in");
    const currentPath = request.nextUrl.pathname;
    if (!/\/(sign-in|sign-up)/.test(currentPath)) {
      return NextResponse.redirect(new URL("/sign-in", request.nextUrl.origin));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
