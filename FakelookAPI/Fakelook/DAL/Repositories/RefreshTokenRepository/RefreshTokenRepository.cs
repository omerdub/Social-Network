using FakelookAPI.DAL.Data;
using FakelookAPI.Entities.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace FakelookAPI.DAL.Repositories.RefreshTokenRepository
{
    public class RefreshTokenRepository : IRefreshTokenRepository
    {
        private readonly IFakelooklDbContext _context;
        public RefreshTokenRepository(IFakelooklDbContext context)
        {
            _context = context;
        }
        public async Task<RefreshToken> Create(RefreshToken refreshToken)
        {
            refreshToken.Id = Guid.NewGuid();

            _context.RefreshTokens.Add(refreshToken);
            await _context.SaveChangesAsync();
            return refreshToken;
        }

        public async Task Delete(Guid id)
        {
            var tokenToDelete = _context.RefreshTokens.FirstOrDefault(r => r.Id == id);
            _context.RefreshTokens.Remove(tokenToDelete);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAll(Guid userId)
        {
            var tokensToDelete = _context.RefreshTokens.Where(r => r.UserId == userId);

            _context.RefreshTokens.RemoveRange(tokensToDelete);
            await _context.SaveChangesAsync();
        }

        public Task<RefreshToken> GetByToken(string token)
        {
            RefreshToken refreshToken = _context.RefreshTokens.FirstOrDefault(r => r.Token == token);
            return Task.FromResult(refreshToken);
        }
    }
}
