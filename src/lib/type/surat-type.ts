// Base type for Surat
export interface Surat {
  id: number;
  nomor_urut: number;
  jenis_id: string
  perihal: string
  kode_surat: string; // Kode Klasifikasi Surat (e.g., OT.00.1)
  kode_sifat?: string; // Opsional: Sifat Surat (e.g., S-001)
  kode_institusi?: string; // Institusi (e.g., Mts.10.38)
  bulan?: number; // Bulan transaksi surat
  tahun: number; // Tahun transaksi surat
  created_at: string; // Timestamp creation
  updated_at?: string; // Timestamp last update
}

// Response Type for Lists
export interface SuratListResponse {
  success: boolean; // Tambahkan ini
  data: Surat[];
  count: number;
  next?: string;
  prev?: string;
}


// Query Params Type
export interface SuratQueryParams {
  tahun?: number; // Filter by year
  bulan?: number; // Filter by month
  jenis_id?: number; // Filter by type of surat
  sifat_surat?: string; // Filter by sifat surat
  institusi?: string; // Filter by institusi
  limit?: number; // Pagination limit
  offset?: number; // Pagination offset
  search?: string; // Search query
}

// Insert Type
export interface InsertSurat {
  nomor_urut: number;
  kode_surat: string;
  kode_sifat?: string;
  kode_institusi?: string;
  bulan?: number;
  tahun: number;
}

// Update Type
export interface UpdateSurat {
  id: number;
  nomor_urut?: number;
  kode_surat?: string;
  kode_sifat?: string;
  kode_institusi?: string;
  bulan?: number;
  tahun?: number;
}

// Delete Type
export interface DeleteSurat {
  id: number;
}

// Generic Response
export interface ApiResponse<T> {
  success: boolean;
  message?: string; // Optional message for debugging or errors
  data?: T; // Generic data
  error?: string; // Error message if applicable
}


export interface SuratData {
  id: number;
  nomor_urut: number;
  bulan: number;
  tahun: number;
  jenis_id: number;
  sifat_id: number;
  institusi_id: number;
  klasifikasi_id: number;
  nomor_surat: string;
  tb_surat_jenis: {
    kode_jenis: string;
  };
  tb_surat_sifat: {
    kode_sifat: string;
  };
  tb_surat_institusi: {
    kode_institusi: string;
  };
  tb_surat_klasifikasi: {
    kode_surat: string;
  };
  kategori: string;
  judul: string;
  tanggal: string;
}
