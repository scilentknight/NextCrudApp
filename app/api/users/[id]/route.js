import db from "@/lib/db";
import { NextResponse } from "next/server";

// GET /api/users/:id
export async function GET(request, { params }) {
  try {
    const { id } = await params;

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
        AND role = 'customer'
      `,
      [id],
    );

    if (users.length === 0) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }

    return NextResponse.json(users[0]);
  } catch (error) {
    console.error("GET user error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch customer",
        details: error.message,
      },
      { status: 500 },
    );
  }
}

// PUT /api/users/:id
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const { name, email, phone, address, password, isActive } = body;

    if (!name?.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (!email?.trim()) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!password?.trim()) {
      return NextResponse.json({ error: "Password is required" }, { status: 400 });
    }

    // Check customer
    const [existing] = await db.query(
      `
      SELECT id
      FROM users
      WHERE id = ?
        AND role = 'customer'
      `,
      [id],
    );

    if (existing.length === 0) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }

    // Check duplicate email
    const [duplicate] = await db.query(
      `
      SELECT id
      FROM users
      WHERE email = ?
        AND id != ?
      LIMIT 1
      `,
      [email.trim(), id],
    );

    if (duplicate.length > 0) {
      return NextResponse.json({ error: "Another user already uses this email" }, { status: 409 });
    }

    await db.query(
      `
      UPDATE users
      SET
        name = ?,
        email = ?,
        phone = ?,
        address = ?,
        password = ?,
        isActive = ?
      WHERE id = ?
        AND role = 'customer'
      `,
      [name.trim(), email.trim(), phone?.trim() || null, address?.trim() || null, password.trim(), isActive !== false, id],
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
      [id],
    );

    return NextResponse.json(users[0]);
  } catch (error) {
    console.error("PUT user error:", error);

    return NextResponse.json(
      {
        error: "Failed to update customer",
        details: error.message,
      },
      { status: 500 },
    );
  }
}

// PATCH /api/users/:id
export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Get existing customer
    const [existing] = await db.query(
      `
      SELECT *
      FROM users
      WHERE id = ?
        AND role = 'customer'
      `,
      [id],
    );

    if (existing.length === 0) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }

    const current = existing[0];

    const name = body.name !== undefined ? body.name.trim() : current.name;

    const email = body.email !== undefined ? body.email.trim() : current.email;

    const phone = body.phone !== undefined ? body.phone?.trim() || null : current.phone;

    const address = body.address !== undefined ? body.address?.trim() || null : current.address;

    const password = body.password !== undefined ? body.password.trim() : current.password;

    const isActive = body.isActive !== undefined ? body.isActive !== false : current.isActive;

    if (!name) {
      return NextResponse.json({ error: "Name cannot be empty" }, { status: 400 });
    }

    if (!email) {
      return NextResponse.json({ error: "Email cannot be empty" }, { status: 400 });
    }

    if (!password) {
      return NextResponse.json({ error: "Password cannot be empty" }, { status: 400 });
    }

    // Check duplicate email
    const [duplicate] = await db.query(
      `
      SELECT id
      FROM users
      WHERE email = ?
        AND id != ?
      LIMIT 1
      `,
      [email, id],
    );

    if (duplicate.length > 0) {
      return NextResponse.json({ error: "Another user already uses this email" }, { status: 409 });
    }

    await db.query(
      `
      UPDATE users
      SET
        name = ?,
        email = ?,
        phone = ?,
        address = ?,
        password = ?,
        isActive = ?
      WHERE id = ?
        AND role = 'customer'
      `,
      [name, email, phone, address, password, isActive, id],
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
      [id],
    );

    return NextResponse.json(users[0]);
  } catch (error) {
    console.error("PATCH user error:", error);

    return NextResponse.json(
      {
        error: "Failed to update customer",
        details: error.message,
      },
      { status: 500 },
    );
  }
}

// DELETE /api/users/:id
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    // Check customer
    const [existing] = await db.query(
      `
      SELECT id
      FROM users
      WHERE id = ?
        AND role = 'customer'
      `,
      [id],
    );

    if (existing.length === 0) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }

    await db.query(
      `
      DELETE FROM users
      WHERE id = ?
        AND role = 'customer'
      `,
      [id],
    );

    return NextResponse.json({
      message: "Customer deleted successfully",
    });
  } catch (error) {
    console.error("DELETE user error:", error);

    return NextResponse.json(
      {
        error: "Failed to delete customer",
        details: error.message,
      },
      { status: 500 },
    );
  }
}
