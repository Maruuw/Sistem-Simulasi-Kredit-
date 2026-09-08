using System.Collections.Generic;

namespace ImsFinance.Core.DTOs
{
    public class SimulasiRequest
    {
        public string ClientName { get; set; } = string.Empty;
        public string? Kendaraan { get; set; }
        public decimal Otr { get; set; }
        public decimal DpPercent { get; set; }
        public int Tenor { get; set; }
        public decimal SukuBunga { get; set; }
        public System.DateTime TanggalMulai { get; set; }
    }

    public class SimulasiResponse
    {
        public RingkasanKredit Ringkasan { get; set; } = new();
        public List<JadwalDto> Jadwal { get; set; } = new();
    }

    public class RingkasanKredit
    {
        public string ClientName { get; set; } = string.Empty;
        public string? Kendaraan { get; set; }
        public decimal Otr { get; set; }
        public decimal DpPercent { get; set; }
        public decimal DpAmount { get; set; }
        public decimal PokokPinjaman { get; set; }
        public decimal SukuBunga { get; set; }
        public decimal TotalBunga { get; set; }
        public decimal TotalPinjaman { get; set; }
        public decimal AngsuranPerBulan { get; set; }
        public int Tenor { get; set; }
    }

    public class JadwalDto
    {
        public int AngsuranKe { get; set; }
        public decimal AngsuranPerBulan { get; set; }
        public System.DateTime TanggalJatuhTempo { get; set; }
        public string Status { get; set; } = "BELUM_BAYAR";
        public System.DateTime? TanggalBayar { get; set; }
    }
}
