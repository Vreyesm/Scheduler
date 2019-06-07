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
        public Subject[] Subjects { get; set; }
        public Career(int iD, string name, User director, Subject[] subjects)
        {
            ID = iD;
            Name = name;
            Director = director;
            Subjects = subjects;
        }
    }
}
