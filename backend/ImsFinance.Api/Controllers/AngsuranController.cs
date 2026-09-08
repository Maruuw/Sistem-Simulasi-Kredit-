using System;
using System.Threading.Tasks;
using ImsFinance.Core.DTOs;
using ImsFinance.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ImsFinance.Api.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class AngsuranController : ControllerBase
    {
        private readonly IAngsuranService _angsuranService;

        public AngsuranController(IAngsuranService angsuranService)
        {
            _angsuranService = angsuranService;
        }

        [HttpGet("jatuh-tempo")]
        public async Task<IActionResult> GetJatuhTempo([FromQuery] string kontrakNo, [FromQuery] DateTime tanggal)
        {
            if (string.IsNullOrWhiteSpace(kontrakNo))
                return BadRequest(ApiResponse<object>.Fail("VALIDATION_ERROR", "Nomor kontrak wajib diisi"));

            var result = await _angsuranService.GetAngsuranJatuhTempoAsync(kontrakNo, tanggal);
            
            if (result == null)
                return NotFound(ApiResponse<object>.Fail("NOT_FOUND", $"Kontrak dengan nomor {kontrakNo} tidak ditemukan"));

            return Ok(ApiResponse<AngsuranJatuhTempoResponse>.Ok(result));
        }
    }
}
