using ImsFinance.Core.DTOs;
using ImsFinance.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ImsFinance.Api.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class SimulasiController : ControllerBase
    {
        private readonly ICalculationService _calculationService;

        public SimulasiController(ICalculationService calculationService)
        {
            _calculationService = calculationService;
        }

        [HttpPost]
        public IActionResult Hitung([FromBody] SimulasiRequest request)
        {
            var result = _calculationService.HitungSimulasi(request);
            return Ok(ApiResponse<SimulasiResponse>.Ok(result, "Simulasi berhasil dihitung"));
        }
    }
}
