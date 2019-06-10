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
        public ICollection<Section> Sections { get; set; }

        public Subject(int iD, string name)
        {
            ID = iD;
            Name = name;
            Sections = new List<Section>();
        }

        public Subject()
        {
        }
    }
}
