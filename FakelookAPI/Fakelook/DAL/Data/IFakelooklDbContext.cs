using Microsoft.EntityFrameworkCore;
using FakelookAPI.Entities.Models;
using System.Threading;
using System.Threading.Tasks;

namespace FakelookAPI.DAL.Data
{
    public interface IFakelooklDbContext
    {
        DbSet<User> Users { get; set; }
        DbSet<RefreshToken> RefreshTokens { get; set; }
        int SaveChanges();
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}
