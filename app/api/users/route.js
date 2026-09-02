import db from "@/lib/db";
import { NextResponse } from "next/server";

// GET /api/users
// Get customers only
export async function GET() {
  try {
    const [users] = await db.query(`
      SELECT
        id,
        name,
        email,
        phone,
        address,
        role,
        isActive,
        createdAt,
        updatedAt
      FROM users
      WHERE role = 'customer'
      ORDER BY id DESC
    `);

    return NextResponse.json(users);
  } catch (error) {
    console.error("GET users error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch customers",
        details: error.message,
      },
      { status: 500 },
    );
  }
}

// POST /api/users
// Create customer
export async function POST(request) {
  try {
    const body = await request.json();

    const { name, email, phone, address, password, isActive = true } = body;

    // Validation
    if (!name?.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (!email?.trim()) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!password?.trim()) {
      return NextResponse.json({ error: "Password is required" }, { status: 400 });
    }

    // Check duplicate email
    const [existing] = await db.query("SELECT id FROM users WHERE email = ? LIMIT 1", [email.trim()]);

    if (existing.length > 0) {
      return NextResponse.json({ error: "A user with this email already exists" }, { status: 409 });
    }

    const [result] = await db.query(
      `
      INSERT INTO users
        (
          name,
          email,
          phone,
          address,
          password,
          role,
          isActive
        )
      VALUES
        (?, ?, ?, ?, ?, 'customer', ?)
      `,
      [name.trim(), email.trim(), phone?.trim() || null, address?.trim() || null, password.trim(), isActive !== false],
    );

    const [users] = await db.query(
      `
      SELECT
        id,
        name,
        email,
        phone,
        address,
        role,
        isActive,
        createdAt,
        updatedAt
      FROM users
      WHERE id = ?
      `,
      [result.insertId],
    );

    return NextResponse.json(users[0], { status: 201 });
  } catch (error) {
    console.error("POST user error:", error);

    return NextResponse.json(
      {
        error: "Failed to create customer",
        details: error.message,
      },
      { status: 500 },
    );
  }
}
