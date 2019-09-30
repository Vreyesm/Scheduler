using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Models
{
    public class AssignationRequest
    {
        public int ID { get; set; }
        public UserData Professor { get; set; }
        public Section Section { get; set; }
        public Classroom Classroom { get; set; }
        public DayOfWeek Day { get; set; }
        public int Block { get; set; }
        public int Span { get; set; }
        public Boolean Special { get; set; }
        public DateTime Expiration { get; set; }
        public string Comment { get; set; }

        public AssignationRequest(int iD, UserData professor, Section section, Classroom classroom, DayOfWeek day, int block, DateTime expiration, string comment)
        {
            ID = iD;
            Professor = professor;
            Section = section;
            Classroom = classroom;
            Day = day;
            Block = block;
            Expiration = expiration;
            Comment = comment;
        }

        public AssignationRequest()
        {
        }
    }
}
