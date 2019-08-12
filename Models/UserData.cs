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
        

        public UserData(string id, string name, UserType type)
        {
            Id = id;
            Name = name;
            Type = type;
        }

        public UserData()
        {
        }
    }
}
