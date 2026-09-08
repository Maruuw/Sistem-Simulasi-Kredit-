using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ImsFinance.Core.Entities
{
    public class Kontrak
    {
        [Key]
        [StringLength(20)]
        public string KontrakNo { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string ClientName { get; set; } = string.Empty;

        [StringLength(100)]
        public string? Kendaraan { get; set; }

        public decimal Otr { get; set; }
        
        public decimal DpPercent { get; set; }
        
        public decimal DpAmount { get; set; }
        
        public decimal PokokPinjaman { get; set; }
        
        public int Tenor { get; set; }
        
        public decimal SukuBunga { get; set; }
        
        public decimal AngsuranPerBulan { get; set; }
        
        public DateTime TanggalMulai { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public virtual ICollection<JadwalAngsuran> JadwalAngsurans { get; set; } = new List<JadwalAngsuran>();
        public virtual ICollection<Pembayaran> Pembayarans { get; set; } = new List<Pembayaran>();
    }
}
