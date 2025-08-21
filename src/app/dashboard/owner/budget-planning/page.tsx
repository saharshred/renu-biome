"use client";

import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Pencil, Trash2 } from "lucide-react";

export default function BudgetPlanningPage() {
  const [mockBudgets, setMockBudgets] = useState([
    { id: 1, category: "Marketing", allocated: 10000, spent: 4500 },
    { id: 2, category: "Operations", allocated: 15000, spent: 8000 },
    { id: 3, category: "Development", allocated: 25000, spent: 12000 },
    { id: 4, category: "HR", allocated: 8000, spent: 3000 },
    { id: 5, category: "Miscellaneous", allocated: 5000, spent: 2000 },
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ category: "", allocated: 0, spent: 0 });

  const handleEdit = (budget: typeof mockBudgets[0]) => {
    setEditingId(budget.id);
    setEditForm({ category: budget.category, allocated: budget.allocated, spent: budget.spent });
  };

  const handleSave = (id: number) => {
    setMockBudgets(
      mockBudgets.map((budget) =>
        budget.id === id ? { ...budget, ...editForm } : budget
      )
    );
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: name === "allocated" || name === "spent" ? Number(value) : value,
    }));
  };

  const handleDelete = (id: number) => {
    setMockBudgets(mockBudgets.filter((b) => b.id !== id));
  };

  const handleAddCategory = () => {
    setMockBudgets([
      ...mockBudgets,
      {
        id: Date.now(),
        category: "New Category",
        allocated: 0,
        spent: 0,
      },
    ]);
  };

  const totalAllocated = mockBudgets.reduce((sum, b) => sum + b.allocated, 0);
  const totalSpent = mockBudgets.reduce((sum, b) => sum + b.spent, 0);
  const totalRemaining = totalAllocated - totalSpent;

  const COLORS = ["#208A84", "#F6B93B", "#EB2F06", "#60A3BC", "#6D214F"];
  const chartData = mockBudgets.map(({ category, allocated }) => ({
    name: category,
    value: allocated,
  }));

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-[#208A84]">Budget Planning</h1>
      <p className="mt-4 text-lg text-gray-600">Plan and track your budget allocations here.</p>

      {/* Summary Cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Allocated", value: totalAllocated },
          { label: "Total Spent", value: totalSpent },
          { label: "Total Remaining", value: totalRemaining },
        ].map((card, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{card.label}</h2>
            <p className={`text-2xl font-bold ${i === 2 && card.value < 0 ? "text-red-500" : "text-[#208A84]"}`}>
              ${card.value.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Budget Table */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Budget Breakdown</h2>
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Category", "Allocated", "Spent", "Remaining"].map((title) => (
                  <th key={title} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockBudgets.map((budget) => {
                const remaining = budget.allocated - budget.spent;
                const colorClass =
                  remaining < 0 ? "text-red-500" : remaining < 1000 ? "text-yellow-600" : "text-gray-900";

                return (
                  <tr key={budget.id}>
                    {editingId === budget.id ? (
                      <>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            name="category"
                            value={editForm.category}
                            onChange={handleChange}
                            className="w-full px-2 py-1 border rounded"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="number"
                            name="allocated"
                            value={editForm.allocated}
                            onChange={handleChange}
                            className="w-full px-2 py-1 border rounded"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="number"
                            name="spent"
                            value={editForm.spent}
                            onChange={handleChange}
                            className="w-full px-2 py-1 border rounded"
                          />
                        </td>
                        <td className={`px-6 py-4 text-sm ${colorClass}`}>
                          ${(editForm.allocated - editForm.spent).toLocaleString()}
                          <div className="mt-2 flex space-x-3">
                            <button onClick={() => handleSave(budget.id)} className="text-green-600 hover:text-green-800">
                              Save
                            </button>
                            <button onClick={handleCancel} className="text-red-600 hover:text-red-800">
                              Cancel
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4 text-sm">{budget.category}</td>
                        <td className="px-6 py-4 text-sm">${budget.allocated.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm">${budget.spent.toLocaleString()}</td>
                        <td className={`px-6 py-4 text-sm font-medium ${colorClass}`}>
                          <div className="flex items-center justify-between">
                            ${remaining.toLocaleString()}
                            <div className="flex space-x-4 ml-4">
                              <button
                                onClick={() => handleEdit(budget)}
                                title="Edit"
                                className="text-gray-500 hover:text-[#208A84]"
                              >
                                <Pencil size={16}/>
                              </button>
                              <button
                                onClick={() => handleDelete(budget.id)}
                                title="Delete"
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Add New Row Button */}
        <button
          onClick={handleAddCategory}
          className="mt-4 px-4 py-2 text-white bg-[#208A84] rounded hover:bg-[#1a6e68]"
        >
          + Add Category
        </button>
      </div>

      {/* Pie Chart */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Budget Allocation Chart</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={100}>
                {chartData.map((_, i) => (
                  <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
