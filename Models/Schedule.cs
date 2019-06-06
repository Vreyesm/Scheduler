using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Models
{
    public class Schedule
    {
        public int ID { get; set; }
        public Assignation[] Monday { get; set; }
        public Assignation[] Tuesday { get; set; }
        public Assignation[] Wednesday { get; set; }
        public Assignation[] Thursday { get; set; }
        public Assignation[] Friday { get; set; }
        public Assignation[] Saturday { get; set; }

        public Schedule(int iD, Assignation[] monday, Assignation[] tuesday, Assignation[] wednesday, Assignation[] thursday, Assignation[] friday, Assignation[] saturday)
        {
            ID = iD;
            Monday = monday;
            Tuesday = tuesday;
            Wednesday = wednesday;
            Thursday = thursday;
            Friday = friday;
            Saturday = saturday;
        }
    }
}
