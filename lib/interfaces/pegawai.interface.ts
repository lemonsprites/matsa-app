import { Dispatch, SetStateAction } from "react";

// API Respon
export interface Pegawai {
    pegawai_id: string,
    isInaktif: boolean,
    nama: string,
    nip?: string | null
    nik?: string | null
    jabatan_utama: string | null,
    jabatan_lain: string | null,

}



// Context App

export interface PegawaiContextType {
    isLoaded: boolean
    id: string
    setId: Dispatch<SetStateAction<string>>
}