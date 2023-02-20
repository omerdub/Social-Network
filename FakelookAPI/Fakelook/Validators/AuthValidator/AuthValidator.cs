using FakelookAPI.DAL.Data;
using FakelookAPI.Entities.DTOs;
using FakelookAPI.Entities.Requests;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net.Mail;
using System.Text.RegularExpressions;

namespace FakelookAPI.Validators.AuthValidator
{
    public class AuthValidator : IAuthValidator<RegisterUserRequest>
    {
        public List<string> Validate(RegisterUserRequest user)
        {
            var errors = new List<string>();
            var context = new ValidationContext(user);
            var results = new List<ValidationResult>();

            if (!Validator.TryValidateObject(user, context, results, true))
            {
                foreach (var validationResult in results)
                {
                    errors.Add(validationResult.ErrorMessage);
                }
            }


            if (!IsEmailValid(user.Email))
            {
                errors.Add($"Email address given: '{user.Email}' is not in the correct format");
            }

            if (user.Password.Length < 8 || user.Password.Length > 16)
            {
                errors.Add("Password must be between 8 - 16 characters.");
            }

            if (user.Name.Length < 2 )
            {
                errors.Add("Name must be at least 2 characters.");
            }

            if (Regex.IsMatch(user.Name, @"^[a-zA-Z]+$"))
            {
                errors.Add("Name must contains only letters.");
            }

            return errors;
        }

        private bool IsEmailValid(string emailaddress)
        {
            try
            {
                MailAddress m = new MailAddress(emailaddress);

                return true;
            }
            catch (FormatException)
            {
                return false;
            }
        }
    }
}
