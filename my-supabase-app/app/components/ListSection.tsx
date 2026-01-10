'use client';

import { useState } from 'react';
import { handleDeleteItem } from '../actions/deleteItem';
import { handleAddItem } from '../actions/addItem';

type Item = {
  id: number;
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
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<{
    nama_barang: string;
    stock: string;
    harga: string;
  }>({
    nama_barang: '',
    stock: '',
    harga: '',
  });

  /* ================= DELETE ================= */
  async function handleDelete(id: number) {
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

  /* ================= ADD ================= */
  function startAdd() {
    setIsAdding(true);
    setOpenMenuId(null);
    setFormData({
      nama_barang: '',
      stock: '',
      harga: '',
    });
  }

  function cancelAdd() {
    setIsAdding(false);
    setFormData({
      nama_barang: '',
      stock: '',
      harga: '',
    });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSaveAdd() {
    if (!formData.nama_barang || !formData.stock || !formData.harga) {
      alert('Semua field wajib diisi');
      return;
    }

    const result = await handleAddItem(tableName, {
      nama_barang: formData.nama_barang,
      stock: Number(formData.stock),
      harga: Number(formData.harga),
    });

    if (!result.success || !result.data) {
      alert('Gagal menambah item');
      return;
    }

    setItems(prev => [...prev, result.data]);
    cancelAdd();
  }

  /* ================= UI ================= */
  return (
    <div className="flex flex-col bg-white/5 backdrop-blur-sm border border-blue-300/30 rounded-xl p-6 shadow-[0_0_15px_rgba(59,130,246,0.3)] w-full">
      <h2 className="text-2xl font-semibold text-[var(--accent)] mb-4 text-center">
        {title}
      </h2>

      {/* ===== ADD FORM ===== */}
      {isAdding && (
        <div className="border border-blue-300/30 rounded-lg p-4 mb-4 space-y-3">
          <div>
            <label className="block text-sm mb-1">Nama Barang</label>
            <input
              name="nama_barang"
              value={formData.nama_barang}
              onChange={handleChange}
              className="w-full p-2 rounded bg-black/20"
              placeholder="Contoh: Paracetamol"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Stock</label>
            <input
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              className="w-full p-2 rounded bg-black/20"
              placeholder="Masukkan stock"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Harga</label>
            <input
              name="harga"
              type="number"
              value={formData.harga}
              onChange={handleChange}
              className="w-full p-2 rounded bg-black/20"
              placeholder="Masukkan harga"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={handleSaveAdd}
              className="px-4 py-1 bg-green-600 rounded hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={cancelAdd}
              className="px-4 py-1 bg-gray-500 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ===== LIST ===== */}
      <ul className="space-y-4">
        {items.map(item => (
          <li
            key={item.id}
            className="relative border border-blue-300/30 rounded-lg p-4 hover:bg-blue-50/10 transition"
          >
            <h3 className="font-bold text-lg">{item.nama_barang}</h3>
            <p>Stock: {item.stock}</p>
            <p>Harga: Rp{item.harga.toLocaleString('id-ID')}</p>

            {/* TITIK 3 */}
            <button
              onClick={() =>
                setOpenMenuId(openMenuId === item.id ? null : item.id)
              }
              className="absolute top-3 right-3"
            >
              {loadingId === item.id ? '...' : '⋮'}
            </button>

            {/* DROPDOWN */}
            {openMenuId === item.id && (
              <div className="absolute right-3 top-10 bg-black/80 border rounded shadow w-32 z-10">
                <button
                  onClick={startAdd}
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
