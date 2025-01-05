import supabase from "@/lib/supabase-client";


export async function getActiveSemester() {
    const currentDate = new Date().toISOString(); // Convert to ISO string (UTC)
    
    const { data, error } = await supabase
      .from('tb_semester')
      .select('*')
      .lte('tanggal_mulai', currentDate)  // Less than or equal to current date in UTC
      .gte('tanggal_selesai', currentDate) // Greater than or equal to current date in UTC
      .single();
  
    if (error) throw error;
    return data;
  }


export async function addSchedule({
    guruId,
    kelasId,
    mapelId,
    hari,
    jamMulai,
    jamSelesai,
    semesterId,
  }: {
    guruId: number;
    kelasId: number;
    mapelId: number;
    hari: string;
    jamMulai: string;
    jamSelesai: string;
    semesterId: number;
  }) {
    // Check for conflicts
    const { data: conflictExists, error: conflictError } = await supabase.rpc('check_jadwal_conflict', {
      guru_id: guruId,
      hari_input: hari,
      jam_mulai_input: jamMulai,
      jam_selesai_input: jamSelesai,
      semester_id: semesterId,
    });
  
    if (conflictError) throw conflictError;
  
    if (conflictExists) {
      throw new Error('Jadwal konflik dengan jadwal lain.');
    }
  
    // Insert new schedule
    const { data, error } = await supabase.from('tb_jadwal').insert({
      id_guru: guruId,
      id_kelas: kelasId,
      id_mapel: mapelId,
      hari,
      jam_mulai: jamMulai,
      jam_selesai: jamSelesai,
      id_semester: semesterId,
    });
  
    if (error) throw error;
    return data;
  }