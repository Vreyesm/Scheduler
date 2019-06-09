using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Models
{
    public class Schedule
    {
        public int ID { get; set; }
        public List<Assignation> Monday { get; set; }
        public List<Assignation> Tuesday { get; set; }
        public List<Assignation> Wednesday { get; set; }
        public List<Assignation> Thursday { get; set; }
        public List<Assignation> Friday { get; set; }
        public List<Assignation> Saturday { get; set; }

        public Schedule(int iD)
        {
            ID = iD;
            Monday = new List<Assignation>();
            Tuesday = new List<Assignation>();
            Wednesday = new List<Assignation>();
            Thursday = new List<Assignation>();
            Friday = new List<Assignation>();
            Saturday = new List<Assignation>();
        }

        public Schedule()
        {
        }
    }
}
