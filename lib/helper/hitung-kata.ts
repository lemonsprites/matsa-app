export function hitungKata(teks: string): number {
  if (!teks) return 0;
  const kataArray = teks.trim().split(/\s+/);
  return kataArray.filter(kata => kata.length > 0).length;
}