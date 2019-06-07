using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Data
{
    public class DbInitializer
    {
        public static void Initialize(DataContext context)
        {
            if (context.Database.EnsureCreated())
            { // Database didn't exists
            }


        }

    }
}
