import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const authHeader = request.headers.get("Authorization");

  if (authHeader === "Bearer mock-access-token-admin") {
    return NextResponse.json({
      id: "1",
      name: "Jekz Dev",
      email: "user@example.com",
      role: "admin",
    });
  }

  if (authHeader === "Bearer mock-access-token-user") {
    return NextResponse.json({
      id: "2",
      name: "Guest User",
      email: "guest@example.com",
      role: "user",
    });
  }

  if (authHeader?.startsWith("Bearer mock-access-token")) {
    return NextResponse.json({
      id: "1",
      name: "Jekz Dev",
      email: "user@example.com",
      role: "admin",
    });
  }

  return NextResponse.json(
    { message: "Token tidak valid atau kadaluarsa" },
    { status: 401 },
  );
}
