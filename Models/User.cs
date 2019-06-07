using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public UserType Type;
        public string Password;

        public User(int id, string name, UserType type, string password)
        {
            Id = id;
            Name = name;
            Type = type;
            Password = password;
        }
    }
}
