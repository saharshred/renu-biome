"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Package, CheckCircle, AlertTriangle } from "lucide-react";
import { fetchInventory, addInventoryItem, InventoryItem } from "@/lib/api/inventory";

const statusColors: Record<string, string> = {
  "In Stock": "bg-green-100 text-green-700",
  "Low Stock": "bg-yellow-100 text-yellow-800",
  "Out of Stock": "bg-red-100 text-red-700",
};

const statusIcons: Record<string, React.ReactNode> = {
  "In Stock": <CheckCircle className="inline mr-1 text-green-500" size={16} />,
  "Low Stock": <AlertTriangle className="inline mr-1 text-yellow-500" size={16} />,
  "Out of Stock": <Package className="inline mr-1 text-red-500" size={16} />,
};

function getStatus(quantity: number) {
  if (quantity === 0) return "Out of Stock";
  if (quantity < 10) return "Low Stock";
  return "In Stock";
}

export default function InventoryManagementPage() {
  const [search, setSearch] = useState("");
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", quantity: 0 });
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadInventory();
  }, []);

  async function loadInventory() {
    try {
      setLoading(true);
      setError('');
      const data = await fetchInventory();
      setInventory(data);
    } catch (err) {
      setError("Failed to fetch inventory");
      console.error(err);
      setInventory([]);
    } finally {
      setLoading(false);
    }
  }

  const filtered = inventory.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
  );

  async function handleAddItem(e: React.FormEvent) {
    e.preventDefault();
    setAdding(true);
    setError("");
    try {
      await addInventoryItem(form);
      setShowModal(false);
      setForm({ name: "", quantity: 0 });
      loadInventory(); // Refresh inventory list
    } catch (err) {
      setError("Failed to add item");
      console.error(err);
    } finally {
      setAdding(false);
    }
  }

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#208A84] tracking-tight">Inventory Management</h1>
          <p className="text-gray-500 mt-2 text-lg">Track, search, and manage your inventory in real time.</p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm w-full md:w-80">
          <Search className="text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search inventory..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      {error && <div className="mb-4 text-red-600">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center text-gray-400 py-16 text-xl">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 py-16 text-xl">No inventory items found.</div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="relative bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col transition-transform hover:scale-[1.02] hover:shadow-xl"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[getStatus(item.quantity)]}`}>{statusIcons[getStatus(item.quantity)]}{getStatus(item.quantity)}</span>
                <span className="ml-auto text-xs text-gray-400">Last updated: {item.last_updated}</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-1 flex items-center gap-2">
                {item.name}
              </h2>
              <div className="flex items-end gap-2 mt-auto">
                <span className="text-3xl font-bold text-[#208A84]">{item.quantity}</span>
                <span className="text-sm text-gray-500 mb-1">units</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Floating Action Button */}
      <button
        className="fixed bottom-8 right-8 z-50 bg-[#208A84] hover:bg-[#1a6e68] text-white rounded-full p-5 shadow-2xl flex items-center gap-2 text-lg font-semibold transition"
        title="Add Inventory Item"
        onClick={() => setShowModal(true)}
      >
        <Plus size={24} />
        <span className="hidden md:inline">Add Item</span>
      </button>

      {/* Add Item Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-4 text-[#208A84]">Add Inventory Item</h2>
            <form onSubmit={handleAddItem} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-[#208A84] focus:border-[#208A84]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <input
                  type="number"
                  min={0}
                  required
                  value={form.quantity}
                  onChange={(e) => setForm((f) => ({ ...f, quantity: Number(e.target.value) }))}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-[#208A84] focus:border-[#208A84]"
                />
              </div>
              <button
                type="submit"
                disabled={adding}
                className="w-full bg-[#208A84] text-white py-2 rounded font-semibold hover:bg-[#1a6e68] transition"
              >
                {adding ? "Adding..." : "Add Item"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
