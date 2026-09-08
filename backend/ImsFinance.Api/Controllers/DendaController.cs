using System;
using System.Threading.Tasks;
using ImsFinance.Core.DTOs;
using ImsFinance.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ImsFinance.Api.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class DendaController : ControllerBase
    {
        private readonly IDendaService _dendaService;

        public DendaController(IDendaService dendaService)
        {
            _dendaService = dendaService;
        }

        [HttpGet]
        public async Task<IActionResult> HitungDenda([FromQuery] string kontrakNo, [FromQuery] DateTime tanggal)
        {
            if (string.IsNullOrWhiteSpace(kontrakNo))
                return BadRequest(ApiResponse<object>.Fail("VALIDATION_ERROR", "Nomor kontrak wajib diisi"));

            var result = await _dendaService.HitungDendaAsync(kontrakNo, tanggal);
            
            if (result == null)
                return NotFound(ApiResponse<object>.Fail("NOT_FOUND", $"Kontrak dengan nomor {kontrakNo} tidak ditemukan"));

            return Ok(ApiResponse<DendaResponse>.Ok(result));
        }
    }
}
