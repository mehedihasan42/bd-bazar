import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export const middleware = async (request) => {
  const { pathname } = request.nextUrl;
  const isPath = (path) => pathname.startsWith(path);
  try {
    let cookie = request.cookies.get("jwt-token")?.value;
    console.log(cookie);
    if (!cookie || !cookie.startsWith("bearer ")) {
      throw new Error("Invalied access");
    }
    const secret = new TextEncoder().encode(process.env.JWT_Secret);
    await jwtVerify(cookie.split("bearer ")[1], secret);
    if (isPath("/login") || isPath("/signup")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  } catch (error) {
    if (isPath("/login") || isPath("/signup")) {
      return NextResponse.next();
    }
    return NextResponse.redirect(
      new URL(`/login?redirectUrl=${pathname}`, request.url)
    );
  }
};

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/about/:path*",
    "/dashboard/:path*",
    "/login/:path*",
    "/signup/:path*",
  ],
};