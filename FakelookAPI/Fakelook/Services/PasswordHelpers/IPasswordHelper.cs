namespace FakelookAPI.Services.PasswordHelpers
{
    public interface IPasswordHelper
    {
        byte[] GenerateSalt();
        byte[] GetSaltByteArray(string saltInDb);
        string GetSaltString(byte[] salt);
        string HashPassword(string password, byte[] salt);
        bool VerifyPassword(string password, byte[] salt, string hashedPassword);
    }
}
