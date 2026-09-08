using ImsFinance.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace ImsFinance.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Kontrak> Kontrak { get; set; }
        public DbSet<JadwalAngsuran> JadwalAngsuran { get; set; }
        public DbSet<Pembayaran> Pembayaran { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure Entity Relationships and Constraints

            // Kontrak -> JadwalAngsuran (1:N)
            modelBuilder.Entity<Kontrak>()
                .HasMany(k => k.JadwalAngsurans)
                .WithOne(ja => ja.Kontrak)
                .HasForeignKey(ja => ja.KontrakNo)
                .OnDelete(DeleteBehavior.Cascade);

            // Kontrak -> Pembayaran (1:N)
            modelBuilder.Entity<Kontrak>()
                .HasMany(k => k.Pembayarans)
                .WithOne(p => p.Kontrak)
                .HasForeignKey(p => p.KontrakNo)
                .OnDelete(DeleteBehavior.Cascade);

            // Decimal Precision
            modelBuilder.Entity<Kontrak>(entity =>
            {
                entity.Property(e => e.Otr).HasColumnType("decimal(18,2)");
                entity.Property(e => e.DpPercent).HasColumnType("decimal(18,2)");
                entity.Property(e => e.DpAmount).HasColumnType("decimal(18,2)");
                entity.Property(e => e.PokokPinjaman).HasColumnType("decimal(18,2)");
                entity.Property(e => e.SukuBunga).HasColumnType("decimal(18,2)");
                entity.Property(e => e.AngsuranPerBulan).HasColumnType("decimal(18,2)");
            });

            modelBuilder.Entity<JadwalAngsuran>(entity =>
            {
                entity.Property(e => e.AngsuranPerBulan).HasColumnType("decimal(18,2)");
            });

            modelBuilder.Entity<Pembayaran>(entity =>
            {
                entity.Property(e => e.JumlahBayar).HasColumnType("decimal(18,2)");
                entity.Property(e => e.TotalDenda).HasColumnType("decimal(18,2)");
            });

            // Seed Data (Pak Sugus)
            modelBuilder.Entity<Kontrak>().HasData(
                new Kontrak
                {
                    KontrakNo = "AGR00001",
                    ClientName = "SUGUS",
                    Kendaraan = "Toyota Avanza",
                    Otr = 240000000m,
                    DpPercent = 20m,
                    DpAmount = 48000000m,
                    PokokPinjaman = 192000000m,
                    Tenor = 18,
                    SukuBunga = 14m,
                    AngsuranPerBulan = 12907000m,
                    TanggalMulai = new System.DateTime(2024, 1, 25),
                    CreatedAt = new System.DateTime(2024, 1, 25)
                }
            );

            // Seed 18 Jadwal Angsuran for Pak Sugus
            var startJatuhTempo = new System.DateTime(2024, 1, 25);
            var jadwalList = new List<JadwalAngsuran>();
            for (int i = 1; i <= 18; i++)
            {
                // Sugus paid until May 2024 (Month 5). Juni is overdue.
                string status = i <= 5 ? "LUNAS" : "BELUM_BAYAR";
                System.DateTime? tanggalBayar = i <= 5 ? startJatuhTempo.AddMonths(i - 1) : null;

                jadwalList.Add(new JadwalAngsuran
                {
                    Id = i,
                    KontrakNo = "AGR00001",
                    AngsuranKe = i,
                    AngsuranPerBulan = 12907000m,
                    TanggalJatuhTempo = startJatuhTempo.AddMonths(i - 1),
                    Status = status,
                    TanggalBayar = tanggalBayar
                });
            }
            modelBuilder.Entity<JadwalAngsuran>().HasData(jadwalList);
        }
    }
}
