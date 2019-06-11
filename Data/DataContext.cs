using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Scheduler.Models;

namespace Scheduler.Data
{
    public class DataContext : DbContext
    {
        public DbSet<Assignation> Assignations { get; set; }
        public DbSet<AssignationRequest> AssignationRequests { get; set; }
        public DbSet<Building> Buildings { get; set; }
        public DbSet<Career> Careers { get; set; }
        public DbSet<Classroom> Classrooms { get; set; }
        public DbSet<Schedule> Schedules { get; set; }
        public DbSet<Section> Sections { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<User> Users { get; set; }

        public DataContext() : base()
        {
        }

        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            /*modelBuilder.Entity<Classroom>()
                .HasOne(c => c.Building)
                .WithMany(b => b.Classrooms)
                .OnDelete(DeleteBehavior.Cascade);
                */

        }
    }
}
