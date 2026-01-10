'use server';

import { editItem } from '../utils/itemService';

export async function handleEditItem(
  tableName: string,
  id: number,
  data: {
    nama_barang: string;
    stock: number;
    harga: number;
  }
) {
  try {
    const result = await editItem(tableName, id, data);
    return { success: true, data: result };
  } catch (error) {
    console.error('EDIT ITEM ERROR:', error);
    return { success: false };
  }
}
