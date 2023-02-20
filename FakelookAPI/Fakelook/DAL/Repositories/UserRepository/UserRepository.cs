using FakelookAPI.DAL.Data;
using FakelookAPI.Entities.DTOs;
using FakelookAPI.Entities.Models;
using FakelookAPI.Entities.Requests;
using FakelookAPI.Services.PasswordHelpers;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace FakelookAPI.DAL.Repositories.UserRepository
{
    public class UserRepository : IUserRepository
    {
        private readonly IFakelooklDbContext _context;
        private readonly IPasswordHelper _passwordHelper;

        public UserRepository(IFakelooklDbContext context, IPasswordHelper passwordHelper)
        {
            _context = context;
            _passwordHelper = passwordHelper;
        }

        public async Task<UserDto> Register(RegisterUserRequest newUser)
        {
            byte[] salt = _passwordHelper.GenerateSalt();
            string hashedPassword = _passwordHelper.HashPassword(newUser.Password, salt);

            var user = new User()
            {
                UserId = Guid.NewGuid(),
                Email = newUser.Email,
                HashedPassword = hashedPassword,
                Salt = _passwordHelper.GetSaltString(salt),
                Name = newUser.Name,
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return new UserDto()
            {
                Email = user.Email,
                UserId = user.UserId
            };
        }

        public Task<UserDto> GetUserById(Guid userId)
        {
            var User = _context.Users.FirstOrDefault(u => u.UserId == userId);
            return Task.FromResult(new UserDto()
            {
                UserId = User.UserId,
                Email = User.Email,
            });
        }


        public bool Login(LoginUserRequest loginDetails, out UserDto userDetails)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == loginDetails.Email);
            if (user == null)
            {
                userDetails = null;
                return false;
            }
            userDetails = new UserDto()
            {
                Email = user.Email,
                UserId = user.UserId,
            };
            return _passwordHelper.VerifyPassword(loginDetails.Password, _passwordHelper.GetSaltByteArray(user.Salt), user.HashedPassword);
        }

        public bool IsEmailExists(string email)
        {
            return _context.Users.Any(u => u.Email == email);
        }
    }
}
