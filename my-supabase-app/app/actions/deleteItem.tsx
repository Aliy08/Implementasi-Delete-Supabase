"use client";

import { deleteItem } from "../utils/itemService";

export async function handleDeleteItem(
  tableName: string,
  id: number
) {
  try {
    await deleteItem(tableName, id);
    return { success: true };
  } catch (error) {
    console.error("Delete error:", error);
    return { success: false };
  }
}
