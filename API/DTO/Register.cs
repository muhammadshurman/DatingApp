using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTO
{
    public class Register
    {
        [Required]
        [RegularExpression("^[a-zA-Z0-9]*$", ErrorMessage = "Username can only contain letters and numbers.")]
        public string Username { get; set; }
        
        [Required]
        [RegularExpression(@"^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{5,}$", ErrorMessage = "Password must be at least 5 characters long and contain at least one letter, one number, and one special character.")]
        public string Password { get; set; }
    }
}