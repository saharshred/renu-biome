import { supabase } from '@/lib/supabaseClient';

export type Sale = {
  id: number;
  product: string;
  units_sold: number;
  revenue: number;
  date: string;
};

export const fetchSales = async (): Promise<Sale[]> => {
  const { data, error } = await supabase
    .from('sales')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching sales:', error.message);
    throw new Error('Failed to fetch sales data.');
  }

  return data as Sale[];
}; 