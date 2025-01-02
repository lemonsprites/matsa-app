export interface Surat {
  id: string
  nomor_urut: string
  tanggal_surat: string
  nomor_surat: string
  uraian: string
  tb_unit_kerja: {
    nama_unit_kerja: string,
  }
  tb_kodefikasi_surat: {
    kodefikasi: string
  }
  
}
