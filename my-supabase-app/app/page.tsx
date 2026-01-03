import { supabase } from "./utils/supabase";
import ListSection from "./components/ListSection";

export default async function Home() {
  const [
    { data: Halodoc, error: error1 },
    { data: Halodoc2, error: error2 },
  ] = await Promise.all([
    supabase.from("Halodoc").select("*"),
    supabase.from("Halodoc2").select("*"),
  ]);

  if (error1 || error2) {
    console.error("Error fetching data:", error1?.message || error2?.message);
    return (
      <div className="text-center text-red-500 mt-6">
        Gagal memuat data barang.
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-[var(--background)] text-[var(--foreground)]">
      <h1 className="text-3xl font-bold mb-10 text-[var(--accent)] drop-shadow-[var(--glow)]">
        Daftar Barang
      </h1>

      {/* === Container 2 Kolom === */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {/* Kolom 1 — Obat */}
        <ListSection title="Obat (Halodoc)"
          tableName="Halodoc"
          initialData={Halodoc}
        />

        {/* Kolom 2 — Kecantikan */}
        <ListSection title="Kecantikan (Halodoc2)"
          tableName="Halodoc2" 
          initialData={Halodoc2}
        />
      </div>
    </main>
  );
}
