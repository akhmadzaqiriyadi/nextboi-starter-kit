import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (refreshToken === "mock-refresh-token-active") {
    return NextResponse.json({
      accessToken: `mock-access-token-refreshed-${Date.now()}`,
    });
  }

  return NextResponse.json(
    { message: "Sesi telah berakhir atau tidak valid" },
    { status: 401 },
  );
}
