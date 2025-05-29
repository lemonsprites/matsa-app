import { Profil } from "@/lib/interfaces/profil.interface";

export interface User extends Profil {
  roles: string[];
  is_siswa: boolean;
  is_pegawai: boolean;
  is_komite: boolean;
}


export interface UserContextType {
  user: User | null,
  isLoggedIn: boolean,
  loading: boolean
}
