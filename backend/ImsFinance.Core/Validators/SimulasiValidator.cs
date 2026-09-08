using FluentValidation;
using ImsFinance.Core.DTOs;

namespace ImsFinance.Core.Validators
{
    public class SimulasiValidator : AbstractValidator<SimulasiRequest>
    {
        public SimulasiValidator()
        {
            RuleFor(x => x.ClientName)
                .NotEmpty().WithMessage("Nama klien wajib diisi")
                .MinimumLength(2).WithMessage("Nama klien minimal 2 karakter");

            RuleFor(x => x.Otr)
                .GreaterThan(0).WithMessage("Harga OTR harus lebih dari 0");

            RuleFor(x => x.DpPercent)
                .InclusiveBetween(0, 100).WithMessage("DP harus antara 0-100%");

            RuleFor(x => x.Tenor)
                .GreaterThan(0).WithMessage("Tenor harus lebih dari 0")
                .LessThanOrEqualTo(60).WithMessage("Tenor maksimal 60 bulan");

            RuleFor(x => x.SukuBunga)
                .GreaterThanOrEqualTo(0).WithMessage("Suku bunga tidak boleh negatif");
                
            RuleFor(x => x.TanggalMulai)
                .NotEmpty().WithMessage("Tanggal mulai wajib diisi");
        }
    }
}
