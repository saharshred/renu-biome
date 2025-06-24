import { supabase } from '@/lib/supabaseClient';

export interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  last_updated: string;
  created_at: string;
}

export const fetchInventory = async (): Promise<InventoryItem[]> => {
  const { data, error } = await supabase
    .from('inventory')
    .select('id, name, quantity, last_updated, created_at');
  
  if (error) {
    console.error('Error fetching inventory:', error.message);
    throw new Error('Failed to fetch inventory');
  }

  return data || [];
};

export const addInventoryItem = async (item: { name: string; quantity: number }): Promise<null> => {
  const { data, error } = await supabase.from('inventory').insert([
    {
      name: item.name,
      quantity: item.quantity,
      last_updated: new Date().toISOString().split('T')[0],
    },
  ]);

  if (error) {
    console.error('Error adding inventory item:', error.message);
    throw new Error('Failed to add item');
  }

  return data;
}; 