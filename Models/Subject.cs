using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Models
{
    public class Subject
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public Section[] Sections { get; set; }

        public Subject(int iD, string name, Section[] sections)
        {
            ID = iD;
            Name = name;
            Sections = sections;
        }
    }
}
