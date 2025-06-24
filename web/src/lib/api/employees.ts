import { supabase } from '@/lib/supabaseClient';

export interface Employee {
  id: number;
  name: string;
  role: string;
  status: 'Active' | 'Inactive';
  email: string;
  joined: string;
}

export const fetchEmployees = async (): Promise<Employee[]> => {
  const { data, error } = await supabase
    .from('employees')
    .select('id, name, role, status, email, joined');
  
  if (error) {
    console.error('Error fetching employees:', error.message);
    // Returning mock data as a fallback, as seen in the original component
    return [
        { id: 1, name: "Alice Johnson", role: "Manager", status: "Active", email: "alice@renubiome.com", joined: "2023-01-15" },
        { id: 2, name: "Bob Smith", role: "Field Tech", status: "Inactive", email: "bob@renubiome.com", joined: "2022-11-10" },
    ];
  }

  return data || [];
};

export const addEmployee = async (employee: Omit<Employee, 'id' | 'joined'>): Promise<any> => {
  const { data, error } = await supabase.from('employees').insert([
    {
      ...employee,
      joined: new Date().toISOString().split('T')[0],
    },
  ]).select();

  if (error) {
    console.error('Error adding employee:', error.message);
    throw new Error('Failed to add employee');
  }

  return data;
};

export const updateEmployee = async (id: number, employee: Partial<Omit<Employee, 'id'>>): Promise<any> => {
    const { data, error } = await supabase.from('employees').update({
      name: employee.name,
      role: employee.role,
      status: employee.status,
      email: employee.email,
    }).eq('id', id);

    if (error) {
        console.error('Error updating employee:', error.message);
        throw new Error('Could not update employee.');
    }
    return data;
} 