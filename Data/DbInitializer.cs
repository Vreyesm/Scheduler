using Microsoft.AspNetCore.Identity;
using Scheduler.Models;
using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace Scheduler.Data
{
    public class DbInitializer
    {
        private static int missed = 0;
        public static void Initialize(DataContext context, RoleManager<IdentityRole> roleManager, UserManager<IdentityUser> userManager)
        {
            if (context.Database.EnsureCreated())
            { // Database didn't exists
                SeedRoles(roleManager, context, userManager).Wait();
                SeedClassrooms(context).Wait();
                SeedCareers(context, userManager).Wait();
                //SeedSections(context, userManager).Wait();
                //DoTheMath(context).Wait();

            }


        }

        private async static Task SeedRoles(RoleManager<IdentityRole> roleManager, DataContext context, UserManager<IdentityUser> userManager)
        {
            string[] roleNames = { "Admin", "Director", "Professor", "Student" };

            IdentityResult roleResult;

            foreach (var roleName in roleNames)
            {
                var roleExist = await roleManager.RoleExistsAsync(roleName);
                if (!roleExist)
                {
                    // Creating the role
                    roleResult = await roleManager.CreateAsync(new IdentityRole(roleName));
                }
            }

            var admin = new User { Email = "admin@scheduler.cl", Password = "123456" };
            var user = new IdentityUser { UserName = admin.Email, Email = admin.Email };
            var result = await userManager.CreateAsync(user, admin.Password);
            if (result.Succeeded)
            {
                result = await userManager.AddToRoleAsync(user, "Admin");

                var userData = new UserData { Id = user.Id, Name = "Administrador", Type = UserType.Admin };
                await context.UsersData.AddAsync(userData);

            }


            var student = new User { Email = "student@scheduler.cl", Password = "123456" };
            var user_student = new IdentityUser { UserName = student.Email, Email = student.Email };
            var result2 = await userManager.CreateAsync(user_student, student.Password);
            if (result2.Succeeded)
            {
                result = await userManager.AddToRoleAsync(user, "Student");

                var userData2 = new UserData { Id = user_student.Id, Name = "Estudiante", Type = UserType.Student };
                await context.UsersData.AddAsync(userData2);

            }

            await context.SaveChangesAsync();

        }

        private async static Task SeedClassrooms(DataContext context)
        {
            string fileName = "classrooms.csv";
            string[] lines = File.ReadAllLines(fileName);

            Building building = new Building{Name="Gran Edificio", Classrooms = new List<Classroom>() };
            await context.Buildings.AddAsync(building);

            foreach (string line in lines)
            {
                string[] values = line.Split(";");
                Classroom classroom = new Classroom { Name = values[0], Capacity = Int32.Parse(values[1]), Available=true };
                string data = "false;false;false;false;false;false;false;false;false;false;false";
                classroom.MondayData = data;
                classroom.TuesdayData = data;
                classroom.WednesdayData = data;
                classroom.ThursdayData = data;
                classroom.FridayData = data;
                classroom.SaturdayData = data;
                
                building.Classrooms.Add(classroom);
                //await context.Classrooms.AddAsync(classroom);

            }

            await context.SaveChangesAsync();

        }

        private async static Task SeedCareers(DataContext context, UserManager<IdentityUser> userManager)
        {
            string file = "careers.csv";
            string[] lines = File.ReadAllLines(file);

            foreach (string line in lines)
            {
                string[] values = line.Split(";");
                //UserData Director = new UserData {na}
                User director = new User {Email = values[1]+"@utalca.cl", Password="123456"};
                var user = new IdentityUser { UserName = director.Email, Email = director.Email };
                var result = await userManager.CreateAsync(user, director.Password);
                if (result.Succeeded)
                {
                    result = await userManager.AddToRoleAsync(user, "Director");

                    var directorData = new UserData { Id = user.Id, Name = "Director "+values[1], Type = UserType.Director };
                    await context.UsersData.AddAsync(directorData);

                }
                Career career = new Career { DirectorId = user.Id, Name = values[0], IsCompleted = false };
                await context.Careers.AddAsync(career);
            }

            await context.SaveChangesAsync();
        }

        private async static Task SeedSections(DataContext context, UserManager<IdentityUser> userManager)
        {
            string fileName = "sections.csv";
            String[] lines = File.ReadAllLines(fileName);
            Random r = new Random();

            UserData profesor = context.UsersData.First();
            UserData professorData = new UserData();
            var professor = new User { Email = "professor@utalca.cl", Password = "12345678" };
            var user = new IdentityUser { UserName = professor.Email, Email = professor.Email };
            var result = await userManager.CreateAsync(user, professor.Password);
            if (result.Succeeded)
            {
                result = await userManager.AddToRoleAsync(user, "Professor");

                professorData = new UserData { Id = user.Id, Name = "Profesor por defecto", Type = UserType.Professor };
                await context.UsersData.AddAsync(professorData);

            }

            foreach (string line in lines)
            {
                string[] values = line.Split(";");
                string secctionName = values[0];
                int careerId = r.Next(1, context.Careers.Count());
                Career career = context.Careers.Single(c => c.ID == careerId);

                Subject subject = new Subject { Name = values[0], Sections = new List<Section>() };
                await context.Subjects.AddAsync(subject);

                Section section = new Section { Name = values[0], Students = r.Next(15, 60), ProfessorId = professorData.Id };
                subject.Sections.Add(section);

                for (int i = 0; i < 6; i++)
                {
                    bool[] day = new bool[11];

                    for (int j = 0; j < 11; j++)
                    {
                        day[j] = values[(11 * i) + (1 + j)].Equals("") ? false : true;

                    }
                    switch (i)
                    {
                        case 0:
                            section.Monday = day;
                            break;
                        case 1:
                            section.Tuesday = day;
                            break;
                        case 2:
                            section.Wednesday = day;
                            break;
                        case 3:
                            section.Thursday = day;
                            break;
                        case 4:
                            section.Friday = day;
                            break;
                        case 5:
                            section.Saturday = day;
                            break;
                    }
                }
                career.Subjects.Add(subject);
                await context.Sections.AddAsync(section);


            }

            await context.SaveChangesAsync();
        }

        // start at: 00:42 AM
        // finished at: 00:12 AM (next day)
        public async static Task<Object> DoTheMath(DataContext context)
        {
            Console.WriteLine("Do The Math");
            int counter = 0;
            List<Section> sections = await context.Sections.ToListAsync();
            List<Classroom> classrooms = await context.Classrooms.Where(c => c.Available).ToListAsync();

            foreach (Classroom c in classrooms)
            {
                Schedule schedule = new Schedule { Assignations = new List<Assignation>() };
                await context.Schedules.AddAsync(schedule);
            }
            await context.SaveChangesAsync();

            // ascending order by students (for sections) and by capacity (for classrooms)
            sections.Sort((p, q) => p.Students.CompareTo(q.Students)); Console.WriteLine("Sections: " + sections.Count());
            sections.Reverse();
            classrooms.Sort((p, q) => p.Capacity.CompareTo(q.Capacity)); Console.WriteLine("Classrooms: " + classrooms.Count());
            classrooms.Reverse();


            foreach (Section section in sections)
            {
                Console.WriteLine("Section: " + section.Name);
                int i;

                // monday
                for (i = 0; i < 11; i++)
                {
                    if (section.Monday[i])
                    {
                        // await context.Assignations.SingleOrDefaultAsync(a => a.Section.ID == section.ID && a.Day == DayOfWeek.Monday && a.Block == i);
                        var check = await context.Assignations.Where(a => a.Section.ID == section.ID && a.Day == DayOfWeek.Monday && a.Block == i).ToListAsync();

                        if (check.Count != 0){
                            counter++;
                            continue;
                        }

                        int count = 0;
                        int index = i;
                        while (index < 10 && section.Monday[index++ + 1]) { count++; }
                        await Search(context, classrooms, section, DayOfWeek.Monday, i, count);
                        i += count;
                    }
                }

                // tuesday
                for (i = 0; i < 11; i++)
                {
                    if (section.Tuesday[i])
                    {
                        // await context.Assignations.SingleOrDefaultAsync(a => a.Section.ID == section.ID && a.Day == DayOfWeek.Tuesday && a.Block == i);
                        var check = await context.Assignations.Where(a => a.Section.ID == section.ID && a.Day == DayOfWeek.Tuesday && a.Block == i).ToListAsync();

                        if (check.Count != 0){
                            counter++;
                            continue;
                        }

                        int count = 0;
                        int index = i;
                        while (index < 10 && section.Tuesday[index++ + 1]) { count++; }
                        await Search(context, classrooms, section, DayOfWeek.Tuesday, i, count);
                        i += count;
                    }
                }

                // wednesday
                for (i = 0; i < 11; i++)
                {
                    if (section.Wednesday[i])
                    {
                        // await context.Assignations.SingleOrDefaultAsync(a => a.Section.ID == section.ID && a.Day == DayOfWeek.Wednesday && a.Block == i);
                        var check = await context.Assignations.Where(a => a.Section.ID == section.ID && a.Day == DayOfWeek.Wednesday && a.Block == i).ToListAsync();

                        if (check.Count != 0){
                            counter++;
                            continue;
                        }

                        int count = 0;
                        int index = i;
                        while (index < 10 && section.Wednesday[index++ + 1]) { count++; }
                        await Search(context, classrooms, section, DayOfWeek.Wednesday, i, count);
                        i += count;
                    }
                }

                // thursday
                for (i = 0; i < 11; i++)
                {
                    if (section.Thursday[i])
                    {
                        // await context.Assignations.SingleOrDefaultAsync(a => a.Section.ID == section.ID && a.Day == DayOfWeek.Thursday && a.Block == i);
                        var check = await context.Assignations.Where(a => a.Section.ID == section.ID && a.Day == DayOfWeek.Thursday && a.Block == i).ToListAsync();

                        if (check.Count != 0){
                            counter++;
                            continue;
                        }

                        int count = 0;
                        int index = i;
                        while (index < 10 && section.Thursday[index++ + 1]) { count++; }
                        await Search(context, classrooms, section, DayOfWeek.Thursday, i, count);
                        i += count;
                    }
                }

                // friday
                for (i = 0; i < 11; i++)
                {
                    if (section.Friday[i])
                    {
                        // await context.Assignations.SingleOrDefaultAsync(a => a.Section.ID == section.ID && a.Day == DayOfWeek.Friday && a.Block == i);
                        var check = await context.Assignations.Where(a => a.Section.ID == section.ID && a.Day == DayOfWeek.Friday && a.Block == i).ToListAsync();

                        if (check.Count != 0){
                            counter++;
                            continue;
                        }

                        int count = 0;
                        int index = i;
                        while (index < 10 && section.Friday[index++ + 1]) { count++; }
                        await Search(context, classrooms, section, DayOfWeek.Friday, i, count);
                        i += count;
                    }
                }

                // saturday
                for (i = 0; i < 11; i++)
                {
                    if (section.Saturday[i])
                    {
                        // await context.Assignations.SingleOrDefaultAsync(a => a.Section.ID == section.ID && a.Day == DayOfWeek.Saturday && a.Block == i);
                        var check = await context.Assignations.Where(a => a.Section.ID == section.ID && a.Day == DayOfWeek.Saturday && a.Block == i).ToListAsync();

                        if (check.Count != 0){
                            counter++;
                            continue;
                        }

                        int count = 0;
                        int index = i;
                        while (index < 10 && section.Saturday[index++ + 1]) { count++; }
                        await Search(context, classrooms, section, DayOfWeek.Saturday, i, count);
                        i += count;
                    }
                }

            }
            Console.WriteLine("Counter: " + counter);
            Console.WriteLine("Missed: " + missed);
            return new JsonResult(new Dictionary<string, object>
                {
                    { "already", counter },
                    { "missed", missed },
                });
        }

        private static async Task<bool> Search(DataContext context, List<Classroom> classrooms, Section section, DayOfWeek day, int block, int span)
        {
            Console.WriteLine("Searching for Section: " + section.Name);
            Console.WriteLine("Students: " + section.Students);
            Console.WriteLine("\tDay: " + day);
            Console.WriteLine("\tBlock: " + block);
            Console.WriteLine("\tSpan: " + span);

            int index = classrooms.Count() - 1;

            do
            {
                Classroom classroom = classrooms[index];
                Console.WriteLine("Classroom: " + classroom.Name);
                Console.WriteLine("\tCapacity: " + classroom.Capacity);

                if (classroom.Capacity + 5 < section.Students)
                {
                    Console.WriteLine("Classroom hasn't enough space");
                    break;
                }
                // var assignation = await context.Assignations.Where(a => a.Classroom == classroom && a.Day == day && a.Block == block).ToListAsync();
                bool isAlreadyInUse = classroom.GetArrayByDay(day)[block];
                if (!isAlreadyInUse)
                {
                    Console.WriteLine("Found a space");
                    int i = span;
                    int currentBlock = block; // the first block in the group of blocks (if there's any)

                    bool available = true;
                    while (i > 0) // check if we have (and need) more space
                    {
                        //var extra = await context.Assignations.Where(a => a.Classroom == classroom && a.Day == day && a.Block == currentBlock).ToListAsync();
                        isAlreadyInUse = classroom.GetArrayByDay(day)[currentBlock + 1];
                        if (!isAlreadyInUse) // another match (for the next block)
                        {

                            i--; // one block less to check
                            currentBlock++; // next block
                        }
                        else // classroom has not enough space
                        {
                            // try with the next classroom
                            index--;

                            available = false;
                            // also, stop searching on this classroom
                            // idk if it's necessary, but just in case
                            break;
                        }
                    }
                    // Console.WriteLine("Section: " + section.Name);
                    // Console.WriteLine("Day: " + day);
                    if (available)
                    {
                        List<Assignation> assignations = new List<Assignation>();
                        for (int j = 0; j <= span; j++)
                        {
                            classroom.MarkBLock(day, block + j, true);
                            Assignation a = new Assignation { Section = section, Block = block + j, Classroom = classroom, Day = day };
                            assignations.Add(a);
                        }
                        context.Entry(classroom).State = EntityState.Modified;
                        context.Assignations.AddRange(assignations);
                        await context.SaveChangesAsync();
                        return true;

                    }


                }
                else
                {
                    // continue with the next classroom
                    Console.WriteLine("Continue with the next classroom");
                    index--;

                }
            } while (index >= 0);
            Console.WriteLine("Wasn't able to find a classroom");
            missed++;
            return false;
        }


    }
}
