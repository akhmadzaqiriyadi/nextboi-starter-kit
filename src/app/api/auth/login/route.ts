import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    let user = null;
    if (email === "user@example.com" && password === "password123") {
      user = {
        id: "1",
        name: "Jekz Dev",
        email: "user@example.com",
        role: "admin",
      };
    } else if (email === "guest@example.com" && password === "password123") {
      user = {
        id: "2",
        name: "Guest User",
        email: "guest@example.com",
        role: "user",
      };
    }

    if (user) {
      const response = NextResponse.json({
        accessToken: "mock-access-token-initial",
        user,
      });

      const host = request.headers.get("host") || "";
      const isSecure =
        process.env.NODE_ENV === "production" && !host.includes("localhost");

      // Set HttpOnly refresh token cookie
      response.cookies.set("refresh_token", "mock-refresh-token-active", {
        httpOnly: true,
        secure: isSecure,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      // Set non-HttpOnly session active indicator for middleware visibility
      response.cookies.set("session_active", "true", {
        secure: isSecure,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
    }

    return NextResponse.json(
      { message: "Email atau password salah" },
      { status: 401 },
    );
  } catch (_error) {
    return NextResponse.json(
      { message: "Terjadi kesalahan internal" },
      { status: 500 },
    );
  }
}
