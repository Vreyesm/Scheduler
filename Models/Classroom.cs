using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Models
{
    public class Classroom
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int Capacity { get; set; }
        public Schedule Schedule { get; set; }

        public Classroom(int iD, string name, int capacity, Schedule schedule)
        {
            ID = iD;
            Name = name;
            Capacity = capacity;
            Schedule = schedule;
        }
    }
}
