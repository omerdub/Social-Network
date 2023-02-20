using Microsoft.AspNetCore.Mvc;
using FakelookAPI.Entities.DTOs;
using FakelookAPI.Entities.Models;
using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using FakelookAPI.Entities.Responses;
using FakelookAPI.Entities.Requests;
using FakelookAPI.Services.Authenticators;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using FakelookAPI.DAL.Repositories.RefreshTokenRepository;
using FakelookAPI.DAL.Repositories.UserRepository;
using FakelookAPI.Validators.AuthValidator;
using FakelookAPI.Validators.RefreshTokenValidator;

namespace FakelookAPI.Controllers
{
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IAuthValidator<RegisterUserRequest> _newUserValidator;
        private readonly ILogger _logger;
        private readonly IRefreshTokenValidator _refreshTokenValidator;
        private readonly IRefreshTokenRepository _refreshTokenRepository;
        private readonly IAuthenticator _authenticator;
        private readonly IConfiguration _configuration;

        public AuthController(IUserRepository userRepository, IAuthValidator<RegisterUserRequest> newUserValidator, ILogger<AuthController> logger, IRefreshTokenValidator refreshTokenValidator, IRefreshTokenRepository refreshTokenRepository, IAuthenticator authenticator, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _newUserValidator = newUserValidator;
            _logger = logger;
            _refreshTokenValidator = refreshTokenValidator;
            _refreshTokenRepository = refreshTokenRepository;
            _authenticator = authenticator;
            _configuration = configuration;
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterUserRequest registerUserRequest)
        {
            _logger.LogInformation("Registering a new user...");
            if (!ModelState.IsValid)
            {
                string message = "Model sent in the body is invalid";
                _logger.LogWarning(message);
                return BadRequest(new ErrorResponse(message));
            }

            if(_userRepository.IsEmailExists(registerUserRequest.Email))
            {
                string message = "Email adress already exists.";
                _logger.LogWarning(message);
                return BadRequest(message);
            }
            var errors = _newUserValidator.Validate(registerUserRequest);
            if (errors.Any())
            {
                _logger.LogWarning("Adding a new user failed", errors);
                return BadRequest(errors);
            }
            var user = await _userRepository.Register(registerUserRequest);
            _logger.LogInformation("A new user was added...");

            return Ok(new RegisterUserResponse()
            {
                userDetails = user,
            });

        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginUserRequest loginUserRequest)
        {
            _logger.LogInformation("Logging in...");
            if (!ModelState.IsValid)
            {
                string message = "Model sent in the body is invalid.";
                _logger.LogWarning(message);
                return BadRequest(new ErrorResponse(message));
            }

            UserDto user;
            if (!_userRepository.Login(loginUserRequest, out user))
            {
                string message = "Email or password are incorrect.";
                _logger.LogWarning(message);
                return Unauthorized(message);
            }

            AuthenticatedUserResponse response = await _authenticator.Authenticate(user);
            return Ok(response);

        }

        [HttpPost]
        public async Task<IActionResult> Refresh([FromBody] RefreshRequest refreshRequest)
        {
            _logger.LogInformation("Refreshing token...");
            if (!ModelState.IsValid)
            {
                string message = "Model sent in the body is invalid.";
                _logger.LogWarning(message);
                return BadRequest(new ErrorResponse(message));
            }

            AuthenticationConfiguration authenticationConfiguration = new AuthenticationConfiguration();
            _configuration.Bind("Authentication", authenticationConfiguration);

            if (!_refreshTokenValidator.Validate(refreshRequest.RefreshToken, authenticationConfiguration))
            {
                string message = "Invalid refresh token.";
                _logger.LogWarning(message);
                return BadRequest(new ErrorResponse(message));
            }

            RefreshToken refreshTokenModel = await _refreshTokenRepository.GetByToken(refreshRequest.RefreshToken);
            if (refreshTokenModel == null)
            {
                string message = "Token not found.";
                _logger.LogWarning(message);
                return NotFound(new ErrorResponse(message));
            }

            await _refreshTokenRepository.Delete(refreshTokenModel.Id);

            UserDto user = await _userRepository.GetUserById(refreshTokenModel.UserId);
            if (user == null)
            {
                string message = "User not found.";
                _logger.LogWarning(message);
                return NotFound(new ErrorResponse(message));
            }

            AuthenticatedUserResponse response = await _authenticator.Authenticate(user);
            return Ok(response);
        }

        [Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("Hello");
        }

        [Authorize]
        [HttpDelete]
        public async Task<IActionResult> Logout()
        {
            _logger.LogInformation("Logging out...");
            string rawUserId = HttpContext.User.FindFirst("UserId")?.Value;

            if (!Guid.TryParse(rawUserId, out Guid userId))
            {
                string message = "User unauthorized.";
                _logger.LogWarning(message);
                return Unauthorized();
            }

            await _refreshTokenRepository.DeleteAll(userId);

            return NoContent();
        }
    }
}
