using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Models
{
    public class Assignation
    {
        public int ID { get; set; }
        public int ClassroomId { get; set; }
        public Section Section { get; set; }
        public DayOfWeek Day { get; set; }
        public int Block { get; set; }

        public Assignation(int iD, int classroomId, Section section, DayOfWeek day, int block)
        {
            ID = iD;
            ClassroomId = classroomId;
            Section = section;
            Day = day;
            Block = block;
        }
    }
}
