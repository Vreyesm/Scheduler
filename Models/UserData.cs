using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Models
{
    public class UserData
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public UserType Type { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        [StringLength(100, ErrorMessage = "PASSWORD_MIN_LENGTH", MinimumLength = 6)]
        public string Password { get; set; }

        public UserData(string id, string name, UserType type, string password)
        {
            Id = id;
            Name = name;
            Type = type;
            Password = password;
        }

        public UserData()
        {
        }
    }
}
