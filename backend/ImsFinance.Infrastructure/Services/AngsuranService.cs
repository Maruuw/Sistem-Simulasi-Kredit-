using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ImsFinance.Core.DTOs;
using ImsFinance.Core.Interfaces;
using ImsFinance.Infrastructure.Data;

namespace ImsFinance.Infrastructure.Services
{
    public class AngsuranService : IAngsuranService
    {
        private readonly AppDbContext _context;

        public AngsuranService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<AngsuranJatuhTempoResponse?> GetAngsuranJatuhTempoAsync(string kontrakNo, DateTime tanggalReferensi)
        {
            var kontrak = await _context.Kontrak
                .AsNoTracking()
                .FirstOrDefaultAsync(k => k.KontrakNo == kontrakNo);

            if (kontrak == null) return null;

            var jatuhTempoItems = await _context.JadwalAngsuran
                .AsNoTracking()
                .Where(ja => ja.KontrakNo == kontrakNo && ja.TanggalJatuhTempo <= tanggalReferensi)
                .OrderBy(ja => ja.AngsuranKe)
                .ToListAsync();

            var detail = jatuhTempoItems.Select(ja => new JadwalDto
            {
                AngsuranKe = ja.AngsuranKe,
                AngsuranPerBulan = ja.AngsuranPerBulan,
                TanggalJatuhTempo = ja.TanggalJatuhTempo,
                Status = ja.Status,
                TanggalBayar = ja.TanggalBayar
            }).ToList();

            return new AngsuranJatuhTempoResponse
            {
                KontrakNo = kontrak.KontrakNo,
                ClientName = kontrak.ClientName,
                TanggalReferensi = tanggalReferensi,
                JumlahAngsuranJatuhTempo = detail.Count,
                TotalAngsuranJatuhTempo = detail.Sum(d => d.AngsuranPerBulan),
                Detail = detail
            };
        }
    }
}
