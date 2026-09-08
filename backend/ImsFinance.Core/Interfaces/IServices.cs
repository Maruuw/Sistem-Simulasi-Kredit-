using ImsFinance.Core.DTOs;
using System.Threading.Tasks;

namespace ImsFinance.Core.Interfaces
{
    public interface ICalculationService
    {
        SimulasiResponse HitungSimulasi(SimulasiRequest request);
    }

    public interface IAngsuranService
    {
        Task<AngsuranJatuhTempoResponse?> GetAngsuranJatuhTempoAsync(string kontrakNo, System.DateTime tanggalReferensi);
    }

    public interface IDendaService
    {
        Task<DendaResponse?> HitungDendaAsync(string kontrakNo, System.DateTime tanggalReferensi);
    }
}
