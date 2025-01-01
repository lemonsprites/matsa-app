import supabase from '@/lib/supabase-client';
import { Surat, SuratQueryParams, SuratListResponse, SuratData } from '@/lib/type/surat-type';

export const fetchSuratList = async (params: SuratQueryParams): Promise<SuratListResponse> => {
  try {
    const { tahun, bulan, jenis_id, limit = 10, offset = 0, search } = params;

    let query = supabase.from('surat').select('*');

    if (tahun) query = query.eq('tahun', tahun);
    if (bulan) query = query.eq('bulan', bulan);
    if (jenis_id) query = query.eq('jenis_id', jenis_id);
    if (search) query = query.ilike('kode_surat', `%${search}%`);

    // Gunakan range untuk paginasi
    query = query.range(offset, offset + limit - 1);

    const { data, error } = await query;

    if (error) throw new Error(error.message);

    return {
      success: true, // Jika ini tidak diperlukan, hapus properti `success`
      data: data as Surat[],
      count: data?.length || 0,
    };
  } catch (error: any) {
    return {
      success: false, // Jika ini tidak diperlukan, hapus properti `success`
      data: [],
      count: 0,
    };
  }
};




export const fetchSuratData = async (): Promise<SuratData[]> => {
  try {
    const { data, error } = await supabase
      .from('tb_surat')
      .select(`
        id,
        nomor_urut,
        bulan,
        tahun,
        jenis_id,
        sifat_id,
        institusi_id,
        klasifikasi_id,
        created_at,
        nama_surat,
        tb_surat_jenis(nama_jenis),  -- Fetch kategori from jenis_surat
        tb_surat_sifat(kode_sifat),
        tb_surat_institusi(kode_institusi),
        tb_surat_klasifikasi(kode_surat)
      `);

    if (error) {
      throw new Error(error.message);
    }

    // Construct the final nomor_surat with conditional values for kode_institusi, kode_surat, kode_sifat, bulan, and tanggal
    const suratDataWithNomor = data.map((surat: any) => {
      // Set kode_institusi, kode_surat, kode_sifat, and bulan to null if jenis_id is 1 (SK)
      const kode_institusi = surat.jenis_id === 1 ? null : surat.tb_surat_institusi.kode_institusi;
      const kode_surat = surat.jenis_id === 1 ? null : surat.tb_surat_klasifikasi.kode_surat;
      const kode_sifat = surat.jenis_id === 1 ? null : surat.tb_surat_sifat.kode_sifat;
      const bulan = surat.jenis_id === 1 ? null : surat.bulan; // Set bulan to null if jenis_id is 1

      // Construct the nomor_surat using the relevant fields, ensuring proper handling of nulls
      const nomor_surat = `${String(surat.nomor_urut).padStart(3, '0')}/` +
        `${kode_institusi || ''}/` +  // Use empty string for null value
        `${kode_surat || ''}/` +      // Use empty string for null value
        `${bulan ? String(bulan).padStart(2, '0') + '/' : ''}` +  // Add bulan if it's not null
        `${surat.tahun}`;

      // Extract tanggal from created_at and format it as needed
      const tanggal = surat.created_at ? new Date(surat.created_at).toLocaleDateString() : null;

      // Adding kategori (from jenis_surat) and judul (from nama_surat)
      const kategori = surat.tb_surat_jenis.nama_jenis;  // kategori is nama_jenis from jenis_surat
      const judul = surat.nama_surat;  // judul is nama_surat from surat table

      return {
        ...surat,
        nomor_surat,
        kode_institusi,
        kode_surat,
        kode_sifat,
        bulan,
        tanggal,
        kategori,
        judul
      };
    });

    return suratDataWithNomor || [];
  } catch (error) {
    console.error('Error fetching surat data:', error);
    return [];
  }
};
