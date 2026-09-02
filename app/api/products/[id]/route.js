import db from "@/lib/db";
import { NextResponse } from "next/server";

// GET /api/products/1
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const [products] = await db.query("SELECT * FROM products WHERE id = ?", [id]);

    if (products.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(products[0]);
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

// PATCH /api/products/1
export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const { name, price, quantity } = body;

    const [result] = await db.query(
      `UPDATE products
       SET name = ?, price = ?, quantity = ?
       WHERE id = ?`,
      [name, price, quantity, id],
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const [products] = await db.query("SELECT * FROM products WHERE id = ?", [id]);

    return NextResponse.json(products[0]);
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

// DELETE /api/products/1
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const [result] = await db.query("DELETE FROM products WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
