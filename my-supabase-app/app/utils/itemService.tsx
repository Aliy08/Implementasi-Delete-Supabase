import { supabase } from './supabase';

export async function deleteItem(
  tableName: string,
  id: number
) {
  const { error } = await supabase
    .from(tableName)
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }
}

export async function addItem(
  tableName: string,
  data: {
    nama_barang: string;
    stock: number;
    harga: number;
  }
) {
  const { data: insertedData, error } = await supabase
    .from(tableName)
    .insert([data])
    .select()      // ⬅️ INI KUNCI NYA
    .single();     // ⬅️ karena cuma 1 item

  console.log("INSERT RESULT:", insertedData, error);

  if (error) {
    throw error;
  }

  return insertedData;
}