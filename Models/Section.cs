using System;
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
        }
    }
}
