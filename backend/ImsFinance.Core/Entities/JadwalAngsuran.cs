using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ImsFinance.Core.Entities
{
    public class JadwalAngsuran
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(20)]
        public string KontrakNo { get; set; } = string.Empty;

        [Required]
        public int AngsuranKe { get; set; }

        public decimal AngsuranPerBulan { get; set; }

        public DateTime TanggalJatuhTempo { get; set; }

        [StringLength(20)]
        public string Status { get; set; } = "BELUM_BAYAR"; // LUNAS, BELUM_BAYAR, OVERDUE

        public DateTime? TanggalBayar { get; set; }

        // Navigation property
        [ForeignKey("KontrakNo")]
        public virtual Kontrak Kontrak { get; set; } = null!;
    }
}
