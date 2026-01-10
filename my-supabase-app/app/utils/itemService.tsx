import { supabase } from './supabase';

/* ================= DELETE ================= */
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

/* ================= ADD ================= */
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
    .select()
    .single(); // karena cuma 1 row

  if (error) {
    throw error;
  }

  return insertedData;
}

/* ================= EDIT / UPDATE ================= */
export async function editItem(
  tableName: string,
  id: number,
  data: {
    nama_barang: string;
    stock: number;
    harga: number;
  }
) {
  const { data: updatedData, error } = await supabase
    .from(tableName)
    .update({
      nama_barang: data.nama_barang,
      stock: data.stock,
      harga: data.harga,
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return updatedData;
}
