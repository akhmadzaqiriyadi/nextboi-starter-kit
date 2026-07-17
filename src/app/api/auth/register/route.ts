import { NextResponse } from "next/server";

// In-memory "database" — resets on server restart (mock template behaviour)
const registeredEmails = new Set<string>([
  "user@example.com",
  "guest@example.com",
]);

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Semua field wajib diisi" },
        { status: 400 },
      );
    }

    if (registeredEmails.has(email.toLowerCase())) {
      return NextResponse.json(
        { message: "Email sudah terdaftar" },
        { status: 409 },
      );
    }

    // Simulate slight processing delay (realistic UX)
    await new Promise((resolve) => setTimeout(resolve, 500));

    registeredEmails.add(email.toLowerCase());

    return NextResponse.json(
      { message: "Registrasi berhasil" },
      { status: 201 },
    );
  } catch (_error) {
    return NextResponse.json(
      { message: "Terjadi kesalahan internal" },
      { status: 500 },
    );
  }
}
