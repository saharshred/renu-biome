"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function ExpensesPage() {
  const [mockExpenses, setMockExpenses] = useState([
    { id: 1, description: "Office Supplies", amount: 1200, date: "2023-01-15", category: "Supplies" },
    { id: 2, description: "Rent", amount: 5000, date: "2023-01-01", category: "Rent" },
    { id: 3, description: "Utilities", amount: 800, date: "2023-01-10", category: "Utilities" },
    { id: 4, description: "Marketing", amount: 2000, date: "2023-01-20", category: "Marketing" },
    { id: 5, description: "Travel", amount: 1500, date: "2023-01-25", category: "Travel" },
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ description: "", amount: 0, date: "", category: "" });

  const handleEdit = (expense: typeof mockExpenses[0]) => {
    setEditingId(expense.id);
    setEditForm({ ...expense });
  };

  const handleSave = (id: number) => {
    setMockExpenses(mockExpenses.map(expense => expense.id === id ? { ...expense, ...editForm } : expense));
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: name === "amount" ? Number(value) : value }));
  };

  const handleDelete = (id: number) => {
    setMockExpenses(mockExpenses.filter(expense => expense.id !== id));
  };

  const handleAddExpense = () => {
    const newExpense = {
      id: Date.now(),
      description: "New Expense",
      amount: 0,
      date: new Date().toISOString().split("T")[0],
      category: "General",
    };
    setMockExpenses([...mockExpenses, newExpense]);
    setEditingId(newExpense.id);
    setEditForm({ ...newExpense });
  };

  const totalExpenses = mockExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  // Grouped totals by category for bar chart
  const chartData = Object.values(
    mockExpenses.reduce((acc, expense) => {
      if (!acc[expense.category]) {
        acc[expense.category] = { category: expense.category, amount: 0 };
      }
      acc[expense.category].amount += expense.amount;
      return acc;
    }, {} as Record<string, { category: string; amount: number }>)
  );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-[#208A84]">Expenses</h1>
      <p className="mt-4 text-lg text-gray-600">Manage and track your expenses here.</p>

      {/* Summary Card */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Total Expenses</h2>
        <p className="text-2xl font-bold text-[#208A84]">${totalExpenses.toLocaleString()}</p>
      </div>

      {/* Expenses Table */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Expenses</h2>
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Description", "Amount", "Date", "Category"].map((heading) => (
                  <th key={heading} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockExpenses.map((expense) => (
                <tr key={expense.id}>
                  {editingId === expense.id ? (
                    <>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          name="description"
                          value={editForm.description}
                          onChange={handleChange}
                          className="w-full px-2 py-1 border rounded"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          name="amount"
                          value={editForm.amount}
                          onChange={handleChange}
                          className="w-full px-2 py-1 border rounded"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="date"
                          name="date"
                          value={editForm.date}
                          onChange={handleChange}
                          className="w-full px-2 py-1 border rounded"
                        />
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <input
                          type="text"
                          name="category"
                          value={editForm.category}
                          onChange={handleChange}
                          className="w-full px-2 py-1 border rounded"
                        />
                        <div className="mt-2 flex space-x-3">
                          <button onClick={() => handleSave(expense.id)} className="text-green-600 hover:text-green-800">
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
                      <td className="px-6 py-4 text-sm">{expense.description}</td>
                      <td className="px-6 py-4 text-sm">${expense.amount.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm">{expense.date}</td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center justify-between">
                          {expense.category}
                          <div className="flex space-x-3 ml-4">
                            <button onClick={() => handleEdit(expense)} title="Edit" className="text-gray-500 hover:text-[#208A84]">
                              <Pencil size={16} />
                            </button>
                            <button onClick={() => handleDelete(expense.id)} title="Delete" className="text-red-500 hover:text-red-700">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Expense Button */}
        <button
          onClick={handleAddExpense}
          className="mt-4 px-4 py-2 text-white bg-[#208A84] rounded hover:bg-[#1a6e68]"
        >
          + Add Expense
        </button>
      </div>

      {/* Recharts Bar Chart */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Expense Chart</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
              <Bar dataKey="amount" fill="#208A84" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
