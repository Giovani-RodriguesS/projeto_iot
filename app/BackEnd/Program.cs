using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using BackEnd.Data;

var builder = WebApplication.CreateBuilder(args);

// Configura o DbContext com o banco de dados SQLite
builder.Services.AddDbContext<BackEndContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("BackEndContext") ?? throw new InvalidOperationException("Connection string 'BackEndContext' not found.")));

// Adiciona a política de CORS para permitir requisições do frontend na porta 3000
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        builder => builder.WithOrigins("http://localhost:3000")
                          .AllowAnyHeader()
                          .AllowAnyMethod()
                          .AllowCredentials());
});
builder.WebHost.UseKestrel();

// Adiciona serviços ao contêiner
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configuração do pipeline de requisição HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Habilita a política de CORS
app.UseCors("AllowReactApp");

app.UseAuthorization();
app.MapControllers();

app.Run();
