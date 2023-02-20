using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FakelookAPI.Entities.Models
{
    [Table("users")]
    public class User
    {
        [StringLength(36, ErrorMessage = "The {0} field must be a maximum of {1} characters.")]
        public Guid UserId { get; set; }
        public string Name { get; set; }

        [StringLength(50, ErrorMessage = "The {0} field must be a maximum of {1} characters.")]
        public string Email { get; set; }

        [StringLength(200, ErrorMessage = "The {0} field must be a maximum of {1} characters.")]
        public string HashedPassword { get; set; }
        [StringLength(200, ErrorMessage = "The {0} field must be a maximum of {1} characters.")]
        public string Salt { get; set; }
    }
}
