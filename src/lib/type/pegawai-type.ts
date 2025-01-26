export interface Jadwal {
    pegawaiId: number;
    hari: string;
    kelas: string;
    jamMulai: number;
    durasiJam: number;  // Durasi jam pelajaran, misalnya 2 untuk 2 jam berturut-turut
    mapel: string;
    mapelId: number
    jam: number
}

export interface Pegawai {
    ketersediaan: any;
    maxJamPerMinggu: number
    id: number;
    name: string;
}

export interface Kurikulum {
    id: number;
    nama_kurikulum: string;
    berlaku_mulai: string;
    status: boolean;
}

export interface MataPelajaran {
    id: number;
    totalJamPerMinggu: number
    
}