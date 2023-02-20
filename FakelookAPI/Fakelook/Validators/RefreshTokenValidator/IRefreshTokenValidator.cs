using FakelookAPI.Entities.Models;

namespace FakelookAPI.Validators.RefreshTokenValidator
{
    public interface IRefreshTokenValidator
    {
        bool Validate(string refreshToken, AuthenticationConfiguration configuration);
    }
}
