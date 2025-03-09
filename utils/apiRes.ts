/**
 * Buat respon API dengan format JSON.
 *
 * @param {boolean} success status keberhasilan operasi
 * @param {T | null} data data yang dikembalikan, atau null jika terjadi error
 * @param {{ code: string; message: string } | null} error informasi error, atau null jika tidak ada error
 * @param {number} status kode status HTTP
 * @returns {Response} respon API dalam format JSON
 */
export function apiRes<T>(
    success: boolean,
    data: T | null,
    error: { code: string; message: string } | null,
    status: number
  ) {
    return new Response(
      JSON.stringify({
        success,
        data,
        error,
        status,
      }),
      {
        status,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
  