﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Scheduler.Models
{
    public class Section
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int Students { get; set; }
        public string ProfessorId { get; set; }
        
        [JsonIgnore]
        public ICollection<Assignation> Assignations { get; set; } 
        // Section schedule as array of boolean values
        // monday = "true,true,false,..."; -> Monday[] = {true, true, false,...}
        public string MondayData { get; set; }
        [NotMapped]
        [JsonIgnore]
        public bool [] Monday {
            get 
            {
                return Array.ConvertAll(MondayData.Split(';'), Boolean.Parse);
            }
            set
            {
                var _data = value;
                MondayData = String.Join(";", _data.Select(p => p.ToString()).ToArray()).Replace("T","t").Replace("F","f");
            }
        }
        public string TuesdayData { get; set; }
        [NotMapped]
        [JsonIgnore]
        public bool [] Tuesday {
            get 
            {
                return Array.ConvertAll(TuesdayData.Split(';'), Boolean.Parse);
            }
            set
            {
                var _data = value;
                TuesdayData = String.Join(";", _data.Select(p => p.ToString()).ToArray()).Replace("T","t").Replace("F","f");
            }
        }
        public string WednesdayData { get; set; }
        [NotMapped]
        [JsonIgnore]
        public bool [] Wednesday {
            get 
            {
                return Array.ConvertAll(WednesdayData.Split(';'), Boolean.Parse);
            }
            set
            {
                var _data = value;
                WednesdayData = String.Join(";", _data.Select(p => p.ToString()).ToArray()).Replace("T","t").Replace("F","f");
            }
        }
        public string ThursdayData { get; set; }
        [NotMapped]
        [JsonIgnore]
        public bool [] Thursday {
            get 
            {
                return Array.ConvertAll(ThursdayData.Split(';'), Boolean.Parse);
            }
            set
            {
                var _data = value;
                ThursdayData = String.Join(";", _data.Select(p => p.ToString()).ToArray()).Replace("T","t").Replace("F","f");
            }
        }
        public string FridayData { get; set; }
        [NotMapped]
        [JsonIgnore]
        public bool [] Friday {
            get 
            {
                return Array.ConvertAll(FridayData.Split(';'), Boolean.Parse);
            }
            set
            {
                var _data = value;
                FridayData = String.Join(";", _data.Select(p => p.ToString()).ToArray()).Replace("T","t").Replace("F","f");
            }
        }
        public string SaturdayData { get; set; }
        [NotMapped]
        [JsonIgnore]
        public bool [] Saturday {
            get 
            {
                return Array.ConvertAll(SaturdayData.Split(';'), Boolean.Parse);
            }
            set
            {
                var _data = value;
                SaturdayData = String.Join(";", _data.Select(p => p.ToString()).ToArray()).Replace("T","t").Replace("F","f");
            }
        }

        public Section(int iD, string name, int students, string professor)
        {
            ID = iD;
            Name = name;
            Students = students;
            ProfessorId = professor;
        }

        public Section()
        {
            Assignations = new List<Assignation>();
        }

        public bool[] GetDayArray(DayOfWeek day) {
            switch(day) {
                case DayOfWeek.Monday:
                    return this.Monday;
                case DayOfWeek.Tuesday:
                    return this.Tuesday;
                case DayOfWeek.Wednesday:
                    return this.Wednesday;
                case DayOfWeek.Thursday:
                    return this.Thursday;
                case DayOfWeek.Friday:
                    return this.Friday;
                case DayOfWeek.Saturday:
                    return this.Saturday;
            }
            return null;
        }

        public void MarkBLock(DayOfWeek day, int block, bool value) 
        {
            bool[] data = new bool[11];
            switch(day) {
                case DayOfWeek.Monday:
                    data = this.MondayData.Split(";").Select(v => Boolean.Parse(v)).ToArray();
                    data[block] = value;
                    this.MondayData = String.Join(";",data.Select(p => p.ToString()).ToArray()).Replace("T", "t").Replace("F", "f");
                    break;
                case DayOfWeek.Tuesday:
                    data = this.TuesdayData.Split(";").Select(v => Boolean.Parse(v)).ToArray();
                    data[block] = value;
                    this.TuesdayData = String.Join(";",data.Select(p => p.ToString()).ToArray()).Replace("T", "t").Replace("F", "f");
                    break;
                case DayOfWeek.Wednesday:
                    data = this.WednesdayData.Split(";").Select(v => Boolean.Parse(v)).ToArray();
                    data[block] = value;
                    this.WednesdayData = String.Join(";", data.Select(p => p.ToString()).ToArray()).Replace("T", "t").Replace("F", "f");
                    break;
                case DayOfWeek.Thursday:
                    data = this.ThursdayData.Split(";").Select(v => Boolean.Parse(v)).ToArray();
                    data[block] = value;
                    this.ThursdayData = String.Join(";", data.Select(p => p.ToString()).ToArray()).Replace("T", "t").Replace("F", "f");
                    break;
                case DayOfWeek.Friday:
                    data = this.FridayData.Split(";").Select(v => Boolean.Parse(v)).ToArray();
                    data[block] = value;
                    this.FridayData = String.Join(";", data.Select(p => p.ToString()).ToArray()).Replace("T", "t").Replace("F", "f");
                    break;
                case DayOfWeek.Saturday:
                    data = this.SaturdayData.Split(";").Select(v => Boolean.Parse(v)).ToArray();
                    data[block] = value;
                    this.SaturdayData = String.Join(";", data.Select(p => p.ToString()).ToArray()).Replace("T", "t").Replace("F", "f");
                    break;
            }
        }

        public void InitializeData()
        {
            this.MondayData = "false;false;false;false;false;false;false;false;false;false;false;false";
            this.TuesdayData = "false;false;false;false;false;false;false;false;false;false;false;false";
            this.WednesdayData = "false;false;false;false;false;false;false;false;false;false;false;false";
            this.ThursdayData = "false;false;false;false;false;false;false;false;false;false;false;false";
            this.FridayData = "false;false;false;false;false;false;false;false;false;false;false;false";
            this.SaturdayData = "false;false;false;false;false;false;false;false;false;false;false;false";
        }
    }
}
