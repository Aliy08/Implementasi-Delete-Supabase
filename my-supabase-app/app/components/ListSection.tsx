'use client';

import { useState } from 'react';
import { handleDeleteItem } from '../actions/deleteItem';

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
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const [formData, setFormData] = useState<Partial<Item>>({});

  /* ================= DELETE ================= */
  async function handleDelete(id: number) {
    alert("TOMBOL DELETE DIKLIK");
    
    const confirmDelete = confirm('Yakin ingin menghapus item ini?');
    if (!confirmDelete) return;

    setLoadingId(id);

    const result = await handleDeleteItem(tableName, id);

    if (!result.success) {
      alert('Gagal menghapus data');
      setLoadingId(null);
      return;
    }

    setItems(prev => prev.filter(item => item.id !== id));
    setLoadingId(null);
  }

  

  /* ================= EDIT ================= */
  function startEdit(item: Item) {
    setEditId(item.id);
    setFormData(item);
    setOpenMenuId(null);
  }

  function cancelEdit() {
    setEditId(null);
    setFormData({});
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]:
        name === 'stock' || name === 'harga'
          ? Number(value)
          : value,
    }));
  }

  function handleSave() {
    // 🔜 NANTI: sambungkan ke Supabase (UPDATE)
    console.log('SAVE DATA:', formData);

    setItems(prev =>
      prev.map(item =>
        item.id === editId
          ? { ...item, ...(formData as Item) }
          : item
      )
    );

    setEditId(null);
    setFormData({});
  }

  /* ================= UI ================= */
  return (
    <div className="flex flex-col bg-white/5 backdrop-blur-sm border border-blue-300/30 rounded-xl p-6 shadow-[0_0_15px_rgba(59,130,246,0.3)] w-full">
      <h2 className="text-2xl font-semibold text-[var(--accent)] mb-4 text-center">
        {title}
      </h2>

      <ul className="space-y-4">
        {items.map(item => (
          <li
            key={item.id}
            className="relative border border-blue-300/30 rounded-lg p-4 hover:bg-blue-50/10 transition"
          >
            {/* ===== CONTENT ===== */}
            {editId === item.id ? (
              <div className="space-y-2">
                <input
                  name="nama"
                  value={formData.nama ?? ''}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-black/20"
                  placeholder="Nama"
                />
                <input
                  name="nama_barang"
                  value={formData.nama_barang ?? ''}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-black/20"
                  placeholder="Nama Barang"
                />
                <input
                  name="stock"
                  type="number"
                  value={formData.stock ?? 0}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-black/20"
                  placeholder="Stock"
                />
                <input
                  name="harga"
                  type="number"
                  value={formData.harga ?? 0}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-black/20"
                  placeholder="Harga"
                />

                {/* SAVE / CANCEL */}
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={handleSave}
                    className="px-4 py-1 bg-green-600 rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-4 py-1 bg-gray-500 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="font-bold text-lg">{item.nama}</h3>
                <p>Nama Barang: {item.nama_barang}</p>
                <p>Stock: {item.stock}</p>
                <p>Harga: Rp{item.harga.toLocaleString('id-ID')}</p>
              </>
            )}

            {/* ===== TITIK 3 ===== */}
            <button
              onClick={() =>
                setOpenMenuId(
                  openMenuId === item.id ? null : item.id
                )
              }
              className="absolute top-3 right-3"
            >
              {loadingId === item.id ? '...' : '⋮'}
            </button>

            {/* ===== DROPDOWN ===== */}
            {openMenuId === item.id && (
              <div className="absolute right-3 top-10 bg-black/80 border rounded shadow w-32 z-10">
                <button
                  onClick={() => startEdit(item)}
                  className="block w-full text-left px-3 py-2 hover:bg-white/10"
                >
                  Update
                </button>

                <button
                  onClick={() => alert('Add nanti ya 😄')}
                  className="block w-full text-left px-3 py-2 hover:bg-white/10"
                >
                  Add
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="block w-full text-left px-3 py-2 text-red-500 hover:bg-red-500/10"
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
