using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ImsFinance.Core.DTOs;
using ImsFinance.Core.Interfaces;
using ImsFinance.Infrastructure.Data;

namespace ImsFinance.Infrastructure.Services
{
    public class DendaService : IDendaService
    {
        private readonly AppDbContext _context;

        public DendaService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<DendaResponse?> HitungDendaAsync(string kontrakNo, DateTime tanggalReferensi)
        {
            var kontrak = await _context.Kontrak
                .AsNoTracking()
                .FirstOrDefaultAsync(k => k.KontrakNo == kontrakNo);

            if (kontrak == null) return null;

            var overdueItems = await _context.JadwalAngsuran
                .AsNoTracking()
                .Where(ja => ja.KontrakNo == kontrakNo 
                          && ja.Status == "BELUM_BAYAR" 
                          && ja.TanggalJatuhTempo < tanggalReferensi)
                .OrderBy(ja => ja.AngsuranKe)
                .ToListAsync();

            decimal dendaPerHariPersen = 0.1m;
            
            var detail = overdueItems.Select(ja =>
            {
                var hariKeterlambatan = (tanggalReferensi - ja.TanggalJatuhTempo).Days;
                
                // Denda = Angsuran * 0.1% * hari
                var totalDenda = ja.AngsuranPerBulan * (dendaPerHariPersen / 100m) * hariKeterlambatan;
                
                return new DendaDetail
                {
                    AngsuranKe = ja.AngsuranKe,
                    TanggalJatuhTempo = ja.TanggalJatuhTempo,
                    AngsuranPerBulan = ja.AngsuranPerBulan,
                    HariKeterlambatan = hariKeterlambatan,
                    TotalDenda = Math.Round(totalDenda)
                };
            }).ToList();

            return new DendaResponse
            {
                KontrakNo = kontrak.KontrakNo,
                ClientName = kontrak.ClientName,
                TanggalReferensi = tanggalReferensi,
                DendaPerHariPersen = dendaPerHariPersen,
                Detail = detail,
                TotalDendaKeseluruhan = detail.Sum(d => d.TotalDenda)
            };
        }
    }
}
