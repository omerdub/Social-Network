using Microsoft.EntityFrameworkCore;
using FakelookAPI.Entities.Models;

namespace FakelookAPI.DAL.Data
{
    public class FakelookDbContext : DbContext, IFakelooklDbContext
    {
        public FakelookDbContext(DbContextOptions<FakelookDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("Users").HasKey(u => u.UserId);
            modelBuilder.Entity<RefreshToken>().ToTable("RefreshTokens").HasKey(r => r.Id);
        }
    }
}
