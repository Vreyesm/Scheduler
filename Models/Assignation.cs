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
        public bool HasExpiration { get; set; }
        public DateTime Expiration { get; set; }

        public Assignation(int id, Classroom classroom, Section section, DayOfWeek day, int block, bool hasExpiration, DateTime expiration)
        {
            ID = id;
            Classroom = classroom;
            Section = section;
            Day = day;
            Block = block;
            HasExpiration = hasExpiration;
            Expiration = expiration;
        }

        public Assignation() { }
    }
}
