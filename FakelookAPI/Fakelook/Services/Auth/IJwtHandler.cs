using System.Security.Claims;

namespace FakelookAPI.Services.Auth
{
    public interface IJwtHandler
    {
        string CreateAccessToken(string userId);
        string CreateRefreshToken(string userId);
        ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
    }
}
