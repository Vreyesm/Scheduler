﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace Scheduler.Migrations
{
    public partial class AddAvailable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Available",
                table: "Classrooms",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Available",
                table: "Classrooms");
        }
    }
}
