export type Surat = {
    id: string;
    nomor_surat: string;
    jenis: 'masuk' | 'keluar';
    sifat: 'penting' | 'biasa' | 'segera'
    tanggal_surat: string;
    pengirim?: string;
    penerima?: string;
    judul: string;
    deskripsi?: string;
  };
  