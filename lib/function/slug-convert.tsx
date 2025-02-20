export const slugConvert = (text: string) => {
    return text
        .toLowerCase() // Ubah ke huruf kecil
        .trim() // Hapus spasi di awal/akhir
        .replace(/[^a-z0-9\s-]/g, "") // Hapus karakter selain huruf, angka, spasi, atau tanda hubung
        .replace(/\s+/g, "-"); // Ganti spasi dengan tanda hubung
};