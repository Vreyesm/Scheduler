using Microsoft.AspNetCore.Identity;
using Scheduler.Models;
using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Scheduler.Data
{
    public class DbInitializer
    {
        public static void Initialize(DataContext context, RoleManager<IdentityRole> roleManager, UserManager<IdentityUser> userManager)
        {
            DoTheMath(context).Wait();
            if (context.Database.EnsureCreated())
            { // Database didn't exists
                SeedRoles(roleManager, context, userManager).Wait();
                SeedClassrooms(context).Wait();
                SeedCareers(context).Wait();
                SeedSections(context, userManager).Wait();

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

            var admin = new User { Email = "admin@scheduler.cl", Password = "12345678" };
            var user = new IdentityUser { UserName = admin.Email, Email = admin.Email };
            var result = await userManager.CreateAsync(user, admin.Password);
            if (result.Succeeded)
            {
                result = await userManager.AddToRoleAsync(user, "Admin");

                var userData = new UserData { Id = user.Id, Name = "Administrador", Type = UserType.Admin};
                await context.UsersData.AddAsync(userData);

            }
            await context.SaveChangesAsync();

        }

        private async static Task SeedClassrooms(DataContext context)
        {
            string fileName = "classrooms.csv";
            string[] lines = File.ReadAllLines(fileName);

            foreach (string line in lines)
            {
                string[] values = line.Split(";");
                Classroom classroom = new Classroom { Name=values[0], Capacity=Int32.Parse(values[1]) };
                await context.Classrooms.AddAsync(classroom);
                
            }

            await context.SaveChangesAsync();
            
        }

        private async static Task SeedCareers(DataContext context)
        {
            string file = "careers.csv";
            string[] lines = File.ReadAllLines(file);

            foreach(string line in lines)
            {
                Career career = new Career { DirectorId = context.UsersData.First().Id, Name = line };
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

            foreach ( string line in lines)
            {
                string[] values = line.Split(";");
                string secctionName = values[0];
                int careerId = r.Next(1, context.Careers.Count());
                Career career = context.Careers.Single(c => c.ID == careerId);
                
                Subject subject = new Subject { Name = values[0], Sections = new List<Section>() };
                await context.Subjects.AddAsync(subject);

                Section section = new Section { Name = values[0], Students = r.Next(15, 120), ProfessorId=professorData.Id };
                subject.Sections.Add(section);

                for (int i = 0; i < 6; i++)
                {
                    bool[] day = new bool[11];

                    for (int j = 0; j < 11; j++)
                    {
                        day[j] = values[(11 * i) + (1 + j)].Equals("") ? false: true;
                        
                    }
                    switch(i)
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
        private async static Task DoTheMath(DataContext context)
        {
            Console.WriteLine("Do The Math");
            List<Section> sections = context.Sections.ToList();
            List<Classroom> classrooms = context.Classrooms.ToList();

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


            foreach (Section section in sections)
            {
                Console.WriteLine("Section: " + section.Name);
                int i;
                
                // monday
                for (i = 0; i < 11; i++)
                {
                    if (section.Monday[i])
                    {
                        int count = 0;
                        int index = i;
                        while(index <10 && section.Monday[index++ + 1]) { count++; }
                        await Search(context, classrooms, section, DayOfWeek.Monday, i, count);
                    }
                }

                // tuesday
                for (i = 0; i < 11; i++)
                {
                    if (section.Tuesday[i])
                    {
                        int count = 0;
                        int index = i;
                        while (index < 10 && section.Tuesday[index++ + 1]) { count++; }
                        await Search(context, classrooms, section, DayOfWeek.Tuesday, i, count);
                    }
                }
                
                // wednesday
                for (i = 0; i < 11; i++)
                {
                    if (section.Wednesday[i])
                    {
                        int count = 0;
                        int index = i;
                        while (index < 10 && section.Wednesday[index++ + 1]) { count++; }
                        await Search(context, classrooms, section, DayOfWeek.Wednesday, i, count);
                    }
                }

                // thursday
                for (i = 0; i < 11; i++)
                {
                    if (section.Thursday[i])
                    {
                        int count = 0;
                        int index = i;
                        while (index < 10 && section.Thursday[index++ + 1]) { count++; }
                        await Search(context, classrooms, section, DayOfWeek.Thursday, i, count);
                    }
                }

                // friday
                for (i = 0; i < 11; i++)
                {
                    if (section.Friday[i])
                    {
                        int count = 0;
                        int index = i;
                        while (index < 10 && section.Friday[index++ + 1]) { count++; }
                        await Search(context, classrooms, section, DayOfWeek.Friday, i, count);
                    }
                }

                // saturday
                for (i = 0; i < 11; i++)
                {
                    if (section.Saturday[i])
                    {
                        int count = 0;
                        int index = i;
                        while (index < 10 && section.Saturday[index++ + 1]) { count++; }
                        await Search(context, classrooms, section, DayOfWeek.Saturday, i, count);
                    }
                }
                
            }

        }

        private static async Task<bool> Search(DataContext context, List<Classroom> classrooms, Section section, DayOfWeek day, int block, int span)
        {
            int index = classrooms.Count() - 1;

            do
            {
                Classroom classroom = classrooms[index];
                var assignation = await context.Assignations.Where(a => a.Day == day && a.Block == block).ToListAsync();
                if (assignation == null)
                {
                    int i = span;
                    int currentBlock = block;

                    while (i > 0) // to check if we have more space
                    {
                        var extra = await context.Assignations.Where(a => a.Day == day && a.Block == currentBlock).ToListAsync();
                        if (extra == null) // another match
                        {
                            i--;
                            currentBlock++;
                        }
                        else // failure
                        {
                            return false;
                        }
                    }
                    // Console.WriteLine("Section: " + section.Name);
                    // Console.WriteLine("Day: " + day);
                    List < Assignation > assignations = new List<Assignation>();
                    for (int j = 0; j <= span; j++)
                    {
                        Assignation a = new Assignation { Section = section, Block = block, Classroom = classroom, Day = day };
                        assignations.Add(a);
                    }
                    context.Assignations.AddRange(assignations);
                    await context.SaveChangesAsync();


                    return true;
                } 
                else
                {
                }
                index--;
            } while (index >= 0);
            Console.WriteLine("Wasn't able to find a classroom");
            return false;
        }


    }
}
