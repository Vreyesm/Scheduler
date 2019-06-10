using Scheduler.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler
{
    public class Building
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public ICollection<Classroom> Classrooms { get; set; }

        public Building(int iD, string name)
        {
            ID = iD;
            Name = name;
            Classrooms = new List<Classroom>();
        }

        public Building()
        {
            Classrooms = new List<Classroom>();
        }
    }
}
