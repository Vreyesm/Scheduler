using Microsoft.AspNetCore.Identity;
using Scheduler.Models;
using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Data
{
    public class DbInitializer
    {
        public static void Initialize(DataContext context, RoleManager<IdentityRole> roleManager, UserManager<IdentityUser> userManager)
        {
            
            if (context.Database.EnsureCreated())
            { // Database didn't exists
                SeedRoles(roleManager, context, userManager).Wait();
                SeedClassrooms(context).Wait();
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


    }
}
