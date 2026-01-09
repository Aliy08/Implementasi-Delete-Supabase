import { supabase } from "./supabase";

export async function deleteItem(
  tableName: string,
  id: number
) {
  const { error } = await supabase
    .from(tableName)
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
