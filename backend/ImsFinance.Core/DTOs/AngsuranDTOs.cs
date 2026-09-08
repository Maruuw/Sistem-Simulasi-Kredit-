using System.Collections.Generic;

namespace ImsFinance.Core.DTOs
{
    public class AngsuranJatuhTempoResponse
    {
        public string KontrakNo { get; set; } = string.Empty;
        public string ClientName { get; set; } = string.Empty;
        public System.DateTime TanggalReferensi { get; set; }
        public int JumlahAngsuranJatuhTempo { get; set; }
        public decimal TotalAngsuranJatuhTempo { get; set; }
        public List<JadwalDto> Detail { get; set; } = new();
    }
}
