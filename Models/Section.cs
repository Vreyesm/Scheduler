﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Models
{
    public class Section
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int Students { get; set; }
        public User Professor { get; set; }

        public Section(int iD, string name, int students, User professor)
        {
            ID = iD;
            Name = name;
            Students = students;
            Professor = professor;
        }

        public Section()
        {
        }
    }
}