using FakelookAPI.Entities.Models;
using System;
using System.Threading.Tasks;

namespace FakelookAPI.DAL.Repositories.RefreshTokenRepository
{
    public interface IRefreshTokenRepository
    {
        Task<RefreshToken> Create(RefreshToken refreshToken);
        Task<RefreshToken> GetByToken(string token);
        Task Delete(Guid id);
        Task DeleteAll(Guid userId);
    }
}
