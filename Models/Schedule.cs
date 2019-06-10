using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Models
{
    public class Schedule
    {
        public int ID { get; set; }

        // Contains all the Assignations. On the assignation object we can filter by DayOfWeek
        public ICollection<Assignation> Assignations { get; set; } 
        
        public Schedule(int iD)
        {
            ID = iD;
            Assignations = new List<Assignation>();
        }

        public Schedule()
        {
        }
    }
}
