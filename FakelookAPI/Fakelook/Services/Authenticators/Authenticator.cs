using FakelookAPI.DAL.Repositories.RefreshTokenRepository;
using FakelookAPI.Entities.DTOs;
using FakelookAPI.Entities.Models;
using FakelookAPI.Entities.Responses;
using FakelookAPI.Services.Auth;
using System.Threading.Tasks;

namespace FakelookAPI.Services.Authenticators
{
    public class Authenticator : IAuthenticator
    {
        private readonly IJwtHandler _jwtHandler;
        private readonly IRefreshTokenRepository _refreshTokenRepository;

        public Authenticator(IJwtHandler jwtHandler, IRefreshTokenRepository refreshTokenRepository)
        {
            _jwtHandler = jwtHandler;
            _refreshTokenRepository = refreshTokenRepository;
        }
        public async Task<AuthenticatedUserResponse> Authenticate(UserDto user)
        {
            // Create JWT tokens
            string accessToken = _jwtHandler.CreateAccessToken(user.UserId.ToString());
            string refreshToken = _jwtHandler.CreateRefreshToken(user.UserId.ToString());


            RefreshToken refreshTokenModel = new RefreshToken()
            {
                Token = refreshToken,
                UserId = user.UserId,
            };
            await _refreshTokenRepository.Create(refreshTokenModel);

            return new AuthenticatedUserResponse()
            {
                AccesToken = accessToken,
                RefreshToken = refreshToken
            };
        }
    }
}
