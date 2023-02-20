using System;
using System.Security.Cryptography;
using System.Text;

namespace FakelookAPI.Services.PasswordHelpers
{
    public class _passwordHelper : IPasswordHelper
    {
        public byte[] GenerateSalt()
        {
            byte[] salt;
            new RNGCryptoServiceProvider().GetBytes(salt = new byte[16]);
            return salt;
        }

        public byte[] GetSaltByteArray(string saltInDb)
        {
            return Convert.FromBase64String(saltInDb);
        }

        public string GetSaltString(byte[] salt)
        {
            return Convert.ToBase64String(salt);
        }

        public string HashPassword(string password, byte[] salt)
        {
            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000);
            byte[] hash = pbkdf2.GetBytes(20);

            byte[] hashBytes = new byte[36];
            Array.Copy(salt, 0, hashBytes, 0, 16);
            Array.Copy(hash, 0, hashBytes, 16, 20);

            return Convert.ToBase64String(hashBytes);
        }

        public bool VerifyPassword(string password, byte[] salt, string hashedPassword)
        {
            byte[] hashBytes = Convert.FromBase64String(hashedPassword);

            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000);
            byte[] hash = pbkdf2.GetBytes(20);

            byte[] hashBytesPassword = new byte[36];
            Array.Copy(salt, 0, hashBytesPassword, 0, 16);
            Array.Copy(hash, 0, hashBytesPassword, 16, 20);

            for (int i = 0; i < 20; i++)
            {
                if (hashBytes[i] != hashBytesPassword[i])
                {
                    return false;
                }
            }

            return true;
        }
    }
}
