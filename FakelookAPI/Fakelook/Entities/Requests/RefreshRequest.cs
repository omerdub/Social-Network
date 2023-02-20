using System.ComponentModel.DataAnnotations;

namespace FakelookAPI.Entities.Requests
{
    public class RefreshRequest
    {
        [Required]
        public string RefreshToken { get; set; }
    }
}
