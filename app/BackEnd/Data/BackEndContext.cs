using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Data
{
    public class BackEndContext : DbContext
    {
        public BackEndContext (DbContextOptions<BackEndContext> options)
            : base(options)
        {
        }

        public DbSet<Bomba> Bomba { get; set; } = default!;
        public DbSet<Sensor> Sensor { get; set; } = default!;
        public DbSet<Usuario> Usuario { get; set; } = default!;
        public DbSet<LeituraSensor> LeituraSensor { get; set; } = default!;
        public DbSet<LeituraBomba> LeituraBomba { get; set; } = default!;
    }
}
