import supabase from "@/lib/supabase-client";

export const getIntegritasEvidence = async (kategori?: string): Promise<number> => {
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
    console.log(count)

    return count || 0;
  } catch (error) {
    console.error('Unexpected error fetching count:', error);
    return 0;
  }
};