import { createClient } from "@/lib/supabase-client";



export const getIntegritasEvidenceCount = async (kategori?: string): Promise<number> => {
  const supabase = await createClient();
  try {
    let query = supabase.from('tb_integritas_evidence').select('*', { count: 'exact' });

    // Jika kategori diberikan, filter berdasarkan kategori
    if (kategori) {
      query = query.eq('kategori', kategori);
    }

    const { count, error } = await query;

    if (error) {
      console.error('Error fetching count:', error.message);
      return 0;
    }

    return count || 0;
  } catch (error) {
    console.error('Unexpected error fetching count:', error);
    return 0;
  }
};

export const getIntegritasEvidenceList = async (kategori?: string): Promise<any[]> => {
  const supabase = await createClient();
  try {
    let query = supabase.from('tb_integritas_evidence').select('*');

    // Jika kategori diberikan, filter berdasarkan kategori
    if (kategori) {
      query = query.eq('kategori', kategori);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching count:', error.message);
      return [];
    }

    return data || null;
  } catch (error) {
    console.error('Unexpected error fetching count:', error);
    return [];
  }
}