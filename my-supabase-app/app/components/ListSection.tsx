'use client';

import { useState } from 'react';
import { supabase } from '../utils/supabase';

type Item = {
  id: number;
  nama: string;
  nama_barang: string;
  stock: number;
  harga: number;
};

export default function ListSection({
  title,
  tableName,
  initialData,
}: {
  title: string;
  tableName: string;
  initialData: Item[];
}) {
  const [items, setItems] = useState<Item[]>(initialData);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  async function handleDelete(id: number) {
    const confirmDelete = confirm('Yakin ingin menghapus item ini?');
    if (!confirmDelete) return;

    setLoadingId(id);

    // 🔥 Hapus di Supabase
    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq('id', id);

    if (error) {
      alert('Gagal menghapus data: ' + error.message);
      setLoadingId(null);
      return;
    }

    // 🔥 Hapus di UI (tanpa reload)
    setItems(prev => prev.filter(item => item.id !== id));

    setLoadingId(null);
  }

  return (
    <div className="flex flex-col items-center bg-white/5 backdrop-blur-sm border border-blue-300/30 rounded-xl p-6 shadow-[0_0_15px_rgba(59,130,246,0.3)] w-full">
      <h2 className="text-2xl font-semibold text-[var(--accent)] mb-4 text-center">
        {title}
      </h2>

      <ul className="w-full space-y-4">
        {items.map(item => (
          <li
            key={item.id}
            className="relative border border-blue-300/30 rounded-lg p-4 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:bg-blue-50/10 transition-all"
          >
            <h3 className="font-bold text-lg">{item.nama}</h3>
            <p>Nama Barang: {item.nama_barang}</p>
            <p>Stock: {item.stock}</p>
            <p>Harga: Rp{item.harga.toLocaleString('id-ID')}</p>

            {/* 🔻 Tombol Delete (titik tiga) */}
            <button
              onClick={() => handleDelete(item.id)}
              disabled={loadingId === item.id}
              className="absolute top-3 right-3 text-white-400 hover:text-red-600"
            >
              {loadingId === item.id ? '...' : '⋮'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
