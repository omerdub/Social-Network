using FakelookAPI.Entities.DTOs;
using FakelookAPI.Entities.Responses;
using System.Threading.Tasks;

namespace FakelookAPI.Services.Authenticators
{
    public interface IAuthenticator
    {
        Task<AuthenticatedUserResponse> Authenticate(UserDto user);
    }
}
