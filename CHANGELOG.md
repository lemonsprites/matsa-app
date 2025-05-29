# Changelog

## [0.2.3] - 2025-05-29
### Added
- Penambahan modul Alumni dengan fitur layanan karir untuk lulusan kelas IX
- Modul PPDB (Penerimaan Peserta Didik Baru) dengan form pendaftaran dan manajemen peserta
- Fitur pengelolaan artikel untuk publikasi informasi madrasah
- Menu Zona Integritas dengan survei dan perhitungan indeks kepuasan pelayanan
- Sistem versioning dan log untuk dokumen SK dan surat tugas
- Struktur folder dan modularisasi yang lebih rapi sesuai best practice

### Changed
- Penyempurnaan manajemen hak akses pengguna berbasis peran (role-based access control)
- Refaktor struktur folder Next.js untuk memudahkan pengembangan dan maintenance
- Update desain UI komponen reusable agar lebih konsisten

### Fixed
- Perbaikan bug rendering dokumen surat tugas dengan tabel anggota tanpa merubah format
- Perbaikan masalah autentikasi Supabase di lingkungan development dan production

---

## [0.2.0] - 2025-05-15
### Added
- Modul Komite sekolah: pengelolaan tabungan siswa dan sponsorship
- Integrasi Supabase sebagai backend service dan autentikasi pengguna
- Sistem pengelolaan surat tugas dan SK dengan template dokumen dinamis (DOCX/PDF)
- Fitur upload dan pengisian batch data peserta ujian dan soal CBT

### Changed
- Optimalisasi performa server-side rendering (SSR) pada Next.js App Router
- Penyesuaian API dan helper library untuk integrasi layanan eksternal

### Fixed
- Bug pada batch import soal ujian via CSV/Excel
- Koreksi validasi input data pendaftaran siswa PPDB

---

## [0.1.0] - 2025-04-01
### Added
- Rilis awal prototipe matsa-app
- Manajemen kepegawaian (pegawai, jabatan, beban kerja)
- Pengelolaan kurikulum dan jadwal pembelajaran
- Sistem ujian berbasis komputer (CBT) sederhana
- Manajemen surat dan dokumen resmi madrasah
- Struktur folder dasar dan setup Next.js App Router
- Implementasi dasar role dan hak akses pengguna

### Changed
- -

### Fixed
- -
