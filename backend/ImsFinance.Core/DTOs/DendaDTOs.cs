using System.Collections.Generic;

namespace ImsFinance.Core.DTOs
{
    public class DendaResponse
    {
        public string KontrakNo { get; set; } = string.Empty;
        public string ClientName { get; set; } = string.Empty;
        public System.DateTime TanggalReferensi { get; set; }
        public decimal DendaPerHariPersen { get; set; } = 0.1m;
        public List<DendaDetail> Detail { get; set; } = new();
        public decimal TotalDendaKeseluruhan { get; set; }
    }

    public class DendaDetail
    {
        public int AngsuranKe { get; set; }
        public System.DateTime TanggalJatuhTempo { get; set; }
        public decimal AngsuranPerBulan { get; set; }
        public int HariKeterlambatan { get; set; }
        public decimal TotalDenda { get; set; }
    }
}
