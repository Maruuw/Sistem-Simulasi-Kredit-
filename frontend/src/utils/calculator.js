/**
 * Flat rate installment calculator.
 * Bunga dihitung dari pokok awal, angsuran tetap setiap bulan.
 */

/**
 * Menghitung angsuran bulanan dengan metode flat rate.
 * @param {number} otr - Harga On The Road (Rupiah)
 * @param {number} dpPercent - Persentase Down Payment (0-100)
 * @param {number} tenor - Jangka waktu kredit (bulan)
 * @param {number} sukuBunga - Suku bunga per tahun (%)
 * @returns {Object} Hasil kalkulasi
 */
export function hitungAngsuran(otr, dpPercent, tenor, sukuBunga) {
  const dpAmount = otr * dpPercent / 100;
  const pokokPinjaman = otr - dpAmount;
  const bungaPerBulan = pokokPinjaman * (sukuBunga / 12 / 100);
  const totalBunga = bungaPerBulan * tenor;
  const totalPinjaman = pokokPinjaman + totalBunga;
  const angsuranPerBulan = Math.round(totalPinjaman / tenor);

  return {
    otr,
    dpPercent,
    dpAmount: Math.round(dpAmount),
    pokokPinjaman: Math.round(pokokPinjaman),
    sukuBunga,
    totalBunga: Math.round(totalBunga),
    totalPinjaman: Math.round(totalPinjaman),
    angsuranPerBulan,
    tenor,
  };
}

/**
 * Generate jadwal angsuran.
 * @param {string} tanggalMulai - Format YYYY-MM-DD
 * @param {number} tenor - Jumlah bulan
 * @param {number} angsuranPerBulan - Nominal per bulan
 * @returns {Array} Daftar jadwal
 */
export function generateJadwal(tanggalMulai, tenor, angsuranPerBulan) {
  const jadwal = [];
  const startDate = new Date(tanggalMulai);

  for (let i = 0; i < tenor; i++) {
    const tanggalJatuhTempo = new Date(startDate);
    tanggalJatuhTempo.setMonth(tanggalJatuhTempo.getMonth() + i);

    jadwal.push({
      angsuranKe: i + 1,
      angsuranPerBulan,
      tanggalJatuhTempo: tanggalJatuhTempo.toISOString().split('T')[0],
    });
  }

  return jadwal;
}

/**
 * Hitung denda keterlambatan.
 * @param {Array} jadwalBelumBayar - Jadwal yang belum dibayar
 * @param {string} tanggalReferensi - Tanggal referensi (YYYY-MM-DD)
 * @param {number} dendaPerHariPersen - Persentase denda per hari (default 0.1)
 * @returns {Object} Hasil denda
 */
export function hitungDenda(jadwalBelumBayar, tanggalReferensi, dendaPerHariPersen = 0.1) {
  const refDate = new Date(tanggalReferensi);
  
  const detail = jadwalBelumBayar
    .filter(j => new Date(j.tanggalJatuhTempo) < refDate)
    .map(j => {
      const jatuhTempo = new Date(j.tanggalJatuhTempo);
      const hariKeterlambatan = Math.floor((refDate - jatuhTempo) / (1000 * 60 * 60 * 24));
      const totalDenda = Math.round(j.angsuranPerBulan * (dendaPerHariPersen / 100) * hariKeterlambatan);

      return {
        angsuranKe: j.angsuranKe,
        tanggalJatuhTempo: j.tanggalJatuhTempo,
        angsuranPerBulan: j.angsuranPerBulan,
        hariKeterlambatan,
        totalDenda,
      };
    });

  return {
    detail,
    totalDendaKeseluruhan: detail.reduce((sum, d) => sum + d.totalDenda, 0),
    dendaPerHariPersen,
  };
}
