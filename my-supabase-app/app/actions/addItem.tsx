"use client";

import { addItem } from "../utils/itemService";

export async function handleAddItem(
  tableName: string,
  data: {
    nama_barang: string;
    stock: number;
    harga: number;
  }
) {
  try {
    const result = await addItem(tableName, data);
    return { success: true, data: result };
  } catch (error) {
    console.error("ADD ITEM ERROR:", error);
    return { success: false };
  }
}
