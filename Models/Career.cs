using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Models
{
    public class Career
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public User Director { get; set; }
        public List<Subject> Subjects { get; set; }

        public Career(int iD, string name, User director)
        {
            ID = iD;
            Name = name;
            Director = director;
            Subjects = new List<Subject>();
        }

        public Career()
        {
            Subjects = new List<Subject>();
        }
    }
}
