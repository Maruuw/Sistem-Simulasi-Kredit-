using FluentValidation;
using FluentValidation.AspNetCore;
using ImsFinance.Api.Middleware;
using ImsFinance.Core.Interfaces;
using ImsFinance.Core.Services;
using ImsFinance.Core.Validators;
using ImsFinance.Infrastructure.Data;
using ImsFinance.Infrastructure.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Configure CORS for React Frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173", "http://127.0.0.1:5173") // Vite default port
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// Configure DbContext (SQLite for development)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=imsfinance.db", 
        b => b.MigrationsAssembly("ImsFinance.Infrastructure")));

// Register Services
builder.Services.AddScoped<ICalculationService, CalculationService>();
builder.Services.AddScoped<IAngsuranService, AngsuranService>();
builder.Services.AddScoped<IDendaService, DendaService>();

// Register FluentValidation
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining<SimulasiValidator>();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Ensure Database is Created & Seeded
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated(); // Auto create DB schema and seed data
}

// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");

app.MapControllers();

app.Run();
