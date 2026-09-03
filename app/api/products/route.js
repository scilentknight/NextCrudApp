import db from "@/lib/db";
import { NextResponse } from "next/server";

// GET /api/products
export async function GET() {
  try {
    const [products] = await db.query("SELECT * FROM products");

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}

// POST /api/products
export async function POST(request) {
  try {
    const body = await request.json();

    const { name, price, quantity } = body;

    const [result] = await db.query(
      "INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)",
      [name, price, quantity],
    );

    return NextResponse.json(
      {
        id: result.insertId,
        name,
        price,
        quantity,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 },
    );
  }
}
