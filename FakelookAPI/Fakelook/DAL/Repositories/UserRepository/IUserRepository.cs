using FakelookAPI.Entities.DTOs;
using FakelookAPI.Entities.Requests;
using System;
using System.Threading.Tasks;

namespace FakelookAPI.DAL.Repositories.UserRepository
{
    public interface IUserRepository
    {
        Task<UserDto> Register(RegisterUserRequest newUser);
        Task<UserDto> GetUserById(Guid userId);
        bool Login(LoginUserRequest loginDetails, out UserDto userDetails);
        bool IsEmailExists(string email);
    }
}
