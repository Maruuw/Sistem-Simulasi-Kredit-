using System;
using ImsFinance.Core.DTOs;
using ImsFinance.Core.Interfaces;

namespace ImsFinance.Core.Services
{
    public class CalculationService : ICalculationService
    {
        public SimulasiResponse HitungSimulasi(SimulasiRequest request)
        {
            // Calculation logic based on PRD
            var dpAmount = request.Otr * request.DpPercent / 100m;
            var pokokPinjaman = request.Otr - dpAmount;
            
            // Bunga Flat = Pokok * (Bunga% / 12) * Tenor
            var bungaPerBulan = pokokPinjaman * (request.SukuBunga / 12m / 100m);
            var totalBunga = bungaPerBulan * request.Tenor;
            
            var totalPinjaman = pokokPinjaman + totalBunga;
            var angsuranPerBulan = Math.Round(totalPinjaman / request.Tenor);

            var response = new SimulasiResponse
            {
                Ringkasan = new RingkasanKredit
                {
                    ClientName = request.ClientName,
                    Kendaraan = request.Kendaraan,
                    Otr = request.Otr,
                    DpPercent = request.DpPercent,
                    DpAmount = Math.Round(dpAmount),
                    PokokPinjaman = Math.Round(pokokPinjaman),
                    SukuBunga = request.SukuBunga,
                    TotalBunga = Math.Round(totalBunga),
                    TotalPinjaman = Math.Round(totalPinjaman),
                    AngsuranPerBulan = angsuranPerBulan,
                    Tenor = request.Tenor
                }
            };

            // Generate Jadwal
            var startDate = request.TanggalMulai;
            for (int i = 0; i < request.Tenor; i++)
            {
                response.Jadwal.Add(new JadwalDto
                {
                    AngsuranKe = i + 1,
                    AngsuranPerBulan = angsuranPerBulan,
                    TanggalJatuhTempo = startDate.AddMonths(i),
                    Status = "BELUM_BAYAR"
                });
            }

            return response;
        }
    }
}
