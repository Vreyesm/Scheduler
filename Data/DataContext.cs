using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Scheduler.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Scheduler.Data
{
    public class DataContext : IdentityDbContext
    {
        public DbSet<Assignation> Assignations { get; set; }
        public DbSet<AssignationRequest> AssignationRequests { get; set; }
        public DbSet<Building> Buildings { get; set; }
        public DbSet<Career> Careers { get; set; }
        public DbSet<Classroom> Classrooms { get; set; }
        public DbSet<Schedule> Schedules { get; set; }
        public DbSet<Section> Sections { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<UserData> UsersData { get; set; }

        public DataContext() : base()
        {
        }

        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Classroom>()
                .HasOne(c => c.Building)
                .WithMany(b => b.Classrooms)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Assignation>()
                .HasOne(a => a.Section)
                .WithMany(s => s.Assignations)
                .OnDelete(DeleteBehavior.Cascade);
            /*modelBuilder.Entity<Building>()
                .HasMany(b => b.Classrooms)
                .WithOne(c => c.Building)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);*/
        }
    }
}
