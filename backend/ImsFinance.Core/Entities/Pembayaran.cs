using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ImsFinance.Core.Entities
{
    public class Pembayaran
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(20)]
        public string KontrakNo { get; set; } = string.Empty;

        [Required]
        public int AngsuranKe { get; set; }

        public decimal JumlahBayar { get; set; }

        public DateTime TanggalBayar { get; set; } = DateTime.UtcNow;
        
        public decimal TotalDenda { get; set; }

        // Navigation property
        [ForeignKey("KontrakNo")]
        public virtual Kontrak Kontrak { get; set; } = null!;
    }
}
