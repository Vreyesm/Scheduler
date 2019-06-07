using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Models
{
    public class Assignation
    {
        public int ID { get; set; }
        public Classroom Classroom { get; set; }
        public Section Section { get; set; }
        public DayOfWeek Day { get; set; }
        public int Block { get; set; }
        public DateTime Expiration { get; set; }

        public Assignation(int id, Classroom classroom, Section section, DayOfWeek day, int block)
        {
            ID = id;
            Classroom = classroom;
            Section = section;
            Day = day;
            Block = block;
        }

        public Assignation() { }
    }
}
