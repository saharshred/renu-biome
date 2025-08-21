"use client";

import { useState, useEffect } from "react";
import { Plus, Search, UserCheck, UserX, Pencil, Save, X, Mail, Calendar, FileText, Download, Phone, MapPin } from "lucide-react";
import {
  fetchEmployees,
  addEmployee,
  updateEmployee,
  Employee,
} from "@/lib/api/employees";

const statusColors: Record<string, string> = {
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-red-100 text-red-700",
};

const statusIcons: Record<string, React.ReactNode> = {
  Active: <UserCheck className="inline mr-1 text-green-500" size={16} />,
  Inactive: <UserX className="inline mr-1 text-red-500" size={16} />,
};

// Mock employee details - in a real app, this would come from the database
const getEmployeeDetails = (employeeId: number) => {
  const details = {
    1: {
      phone: "+1 (555) 123-4567",
      address: "123 Main St, Anytown, CA 90210",
      department: "Operations",
      supervisor: "John Smith",
      salary: "$65,000",
      emergencyContact: "Sarah Johnson (+1 555-987-6543)",
      documents: [
        { name: "Employment Contract", type: "PDF", size: "245 KB", date: "2023-01-15" },
        { name: "W-4 Form", type: "PDF", size: "89 KB", date: "2023-01-15" },
        { name: "I-9 Verification", type: "PDF", size: "156 KB", date: "2023-01-15" },
        { name: "Performance Review 2023", type: "PDF", size: "312 KB", date: "2023-12-15" },
      ],
      notes: "Alice has been instrumental in improving our field operations efficiency. She consistently exceeds performance targets and has taken on additional responsibilities for team training."
    },
    2: {
      phone: "+1 (555) 234-5678",
      address: "456 Oak Ave, Somewhere, CA 90211",
      department: "Field Services",
      supervisor: "Alice Johnson",
      salary: "$52,000",
      emergencyContact: "Mary Smith (+1 555-876-5432)",
      documents: [
        { name: "Employment Contract", type: "PDF", size: "245 KB", date: "2022-11-10" },
        { name: "W-4 Form", type: "PDF", size: "89 KB", date: "2022-11-10" },
        { name: "I-9 Verification", type: "PDF", size: "156 KB", date: "2022-11-10" },
        { name: "Termination Notice", type: "PDF", size: "98 KB", date: "2024-01-15" },
      ],
      notes: "Bob was a reliable field technician who specialized in soil testing and crop monitoring. Left the company for personal reasons."
    }
  };
  return details[employeeId as keyof typeof details] || {
    phone: "N/A",
    address: "N/A",
    department: "N/A",
    supervisor: "N/A",
    salary: "N/A",
    emergencyContact: "N/A",
    documents: [],
    notes: "No additional information available."
  };
};

export default function EmployeesPage() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Omit<Employee, 'id'>>({ name: "", role: "", status: "Active", email: "", joined: "" });
  const [form, setForm] = useState<Omit<Employee, 'id' | 'joined'>>({ name: "", role: "", status: "Active", email: "" });

  useEffect(() => {
    loadEmployees();
  }, []);

  async function loadEmployees() {
    try {
      setLoading(true);
      setError("");
      const data = await fetchEmployees();
      setEmployees(data);
    } catch (err) {
      setError("Could not load employees data.");
      console.error(err);
      setEmployees([]); // Don't show mock data on error in prod
    } finally {
      setLoading(false);
    }
  }

  const filtered = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.role.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase())
  );

  async function handleAddEmployee(e: React.FormEvent) {
    e.preventDefault();
    setAdding(true);
    setError("");
    try {
      await addEmployee(form);
      setShowModal(false);
      setForm({ name: "", role: "", status: "Active", email: "" });
      loadEmployees();
    } catch (err) {
      setError("Could not add employee.");
      console.error(err);
    } finally {
      setAdding(false);
    }
  }

  function handleEdit(emp: Employee) {
    setEditId(emp.id);
    setEditForm({ ...emp });
  }

  function handleEditChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSaveEdit(id: number) {
    setError("");
    try {
      await updateEmployee(id, editForm);
      setEditId(null);
      loadEmployees();
    } catch (err) {
      setError("Could not update employee.");
      console.error(err);
    }
  }

  function handleCancelEdit() {
    setEditId(null);
  }

  function handleEmployeeClick(emp: Employee) {
    setSelectedEmployee(emp);
    setShowDetailModal(true);
  }

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#208A84] tracking-tight">Employees</h1>
          <p className="text-gray-500 mt-2 text-lg">Manage your team members and their roles.</p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm w-full md:w-80">
          <Search className="text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search employees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      {error && <div className="mb-4 text-red-600">{error}</div>}

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Joined</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-400 text-lg">Loading...</td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-400 text-lg">No employees found.</td>
              </tr>
            ) : (
              filtered.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50 transition">
                  {editId === emp.id ? (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <input
                          type="text"
                          name="name"
                          value={editForm.name}
                          onChange={handleEditChange}
                          className="w-full border border-gray-300 rounded px-2 py-1"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <input
                          type="text"
                          name="role"
                          value={editForm.role}
                          onChange={handleEditChange}
                          className="w-full border border-gray-300 rounded px-2 py-1"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <select
                          name="status"
                          value={editForm.status}
                          onChange={handleEditChange}
                          className="w-full border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <input
                          type="email"
                          name="email"
                          value={editForm.email}
                          onChange={handleEditChange}
                          className="w-full border border-gray-300 rounded px-2 py-1"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{emp.joined}</td>
                      <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                        <button
                          onClick={() => handleSaveEdit(emp.id)}
                          className="text-green-600 hover:text-green-800 p-1"
                          title="Save"
                        >
                          <Save size={18} />
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="text-gray-400 hover:text-red-600 p-1"
                          title="Cancel"
                        >
                          <X size={18} />
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <button
                          onClick={() => handleEmployeeClick(emp)}
                          className="text-[#208A84] hover:text-[#1a6e68] hover:underline cursor-pointer font-medium"
                        >
                          {emp.name}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{emp.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${statusColors[emp.status]}`}>
                          {statusIcons[emp.status]}{emp.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{emp.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{emp.joined}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleEdit(emp)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Floating Action Button */}
      <button
        className="fixed bottom-8 right-8 z-50 bg-[#208A84] hover:bg-[#1a6e68] text-white rounded-full p-5 shadow-2xl flex items-center gap-2 text-lg font-semibold transition"
        title="Add Employee"
        onClick={() => setShowModal(true)}
      >
        <Plus size={24} />
        <span className="hidden md:inline">Add Employee</span>
      </button>

      {/* Add Employee Modal */}
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
            <h2 className="text-2xl font-bold mb-4 text-[#208A84]">Add Employee</h2>
            <form onSubmit={handleAddEmployee} className="space-y-4">
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <input
                  type="text"
                  required
                  value={form.role}
                  onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-[#208A84] focus:border-[#208A84]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, status: e.target.value as "Active" | "Inactive" }))
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-[#208A84] focus:border-[#208A84]"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-[#208A84] focus:border-[#208A84]"
                />
              </div>
              <button
                type="submit"
                disabled={adding}
                className="w-full bg-[#208A84] text-white py-2 rounded font-semibold hover:bg-[#1a6e68] transition"
              >
                {adding ? "Adding..." : "Add Employee"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Employee Detail Modal */}
      {showDetailModal && selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl z-10"
              onClick={() => setShowDetailModal(false)}
              aria-label="Close"
            >
              ×
            </button>
            
            <div className="p-8">
              {/* Header */}
              <div className="border-b border-gray-200 pb-6 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#208A84] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {selectedEmployee.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">{selectedEmployee.name}</h2>
                    <p className="text-xl text-gray-600">{selectedEmployee.role}</p>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold mt-2 ${statusColors[selectedEmployee.status]}`}>
                      {statusIcons[selectedEmployee.status]}{selectedEmployee.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Employee Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">Contact Information</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="text-[#208A84]" size={20} />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="text-gray-900">{selectedEmployee.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Phone className="text-[#208A84]" size={20} />
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="text-gray-900">{getEmployeeDetails(selectedEmployee.id).phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <MapPin className="text-[#208A84]" size={20} />
                      <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="text-gray-900">{getEmployeeDetails(selectedEmployee.id).address}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-3">
                      <Calendar className="text-[#208A84]" size={20} />
                      <div>
                        <p className="text-sm text-gray-500">Joined Date</p>
                        <p className="text-gray-900">{selectedEmployee.joined}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Department</p>
                      <p className="text-gray-900">{getEmployeeDetails(selectedEmployee.id).department}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Supervisor</p>
                      <p className="text-gray-900">{getEmployeeDetails(selectedEmployee.id).supervisor}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Salary</p>
                      <p className="text-gray-900">{getEmployeeDetails(selectedEmployee.id).salary}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Emergency Contact</p>
                      <p className="text-gray-900">{getEmployeeDetails(selectedEmployee.id).emergencyContact}</p>
                    </div>
                  </div>
                </div>

                {/* Documents and Notes */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">Documents & Files</h3>
                  
                  <div className="space-y-3">
                    {getEmployeeDetails(selectedEmployee.id).documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                        <div className="flex items-center gap-3">
                          <FileText className="text-[#208A84]" size={20} />
                          <div>
                            <p className="font-medium text-gray-900">{doc.name}</p>
                            <p className="text-sm text-gray-500">{doc.type} • {doc.size} • {doc.date}</p>
                          </div>
                        </div>
                        <button className="text-[#208A84] hover:text-[#1a6e68] p-1">
                          <Download size={18} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Notes</h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {getEmployeeDetails(selectedEmployee.id).notes}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    handleEdit(selectedEmployee);
                  }}
                  className="flex items-center gap-2 bg-[#208A84] text-white px-4 py-2 rounded-lg hover:bg-[#1a6e68] transition"
                >
                  <Pencil size={16} />
                  Edit Employee
                </button>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 