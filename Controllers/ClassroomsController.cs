﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Scheduler.Data;
using Scheduler.Models;

namespace Scheduler.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassroomsController : ControllerBase
    {
        private readonly DataContext _context;

        public ClassroomsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Classrooms
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Classroom>>> GetClassrooms()
        {
            return await _context.Classrooms.ToListAsync();
        }

        // GET: api/Classrooms
        [HttpGet("Available/Day/{day}/Block/{block}/Span/{span}")]
        public async Task<ActionResult<IEnumerable<Classroom>>> GetClassroomsAvailable([FromRoute] DayOfWeek day, [FromRoute] int block, [FromRoute] int span)
        {
            List<Classroom> classrooms = new List<Classroom>();
            
            List<Classroom> allClassrooms = await _context.Classrooms.ToListAsync();

            foreach(Classroom classroom in allClassrooms)
            {
                if (!classroom.GetArrayByDay(day)[block])
                {   
                    int index = block;
                    int count = 1;

                    while (index < 10 && count != span + 1 && !classroom.GetArrayByDay(day)[index++ + 1]) { count ++; }
                    if (count >= span + 1) {
                        classrooms.Add(classroom);
                    }
                }
            }

            return classrooms;
        }

        // GET: api/Classrooms/count
        [HttpGet("count")]
        public async Task<int> CountClassrooms()
        {
            return await _context.Classrooms.CountAsync();
        }

        // GET: api/Classrooms/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Classroom>> GetClassroom(int id)
        {
            var classroom = await _context.Classrooms.FindAsync(id);

            if (classroom == null)
            {
                return NotFound();
            }

            return classroom;
        }

        // PUT: api/Classrooms/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClassroom(int id, Classroom classroom)
        {
            if (id != classroom.ID)
            {
                return BadRequest();
            }

            _context.Entry(classroom).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClassroomExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Classrooms
        [HttpPost]
        public async Task<ActionResult<Classroom>> PostClassroom(Classroom classroom)
        {
            _context.Classrooms.Add(classroom);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetClassroom", new { id = classroom.ID }, classroom);
        }

        // DELETE: api/Classrooms/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Classroom>> DeleteClassroom(int id)
        {
            var classroom = await _context.Classrooms.FindAsync(id);
            if (classroom == null)
            {
                return NotFound();
            }

            _context.Classrooms.Remove(classroom);
            await _context.SaveChangesAsync();

            return classroom;
        }

        private bool ClassroomExists(int id)
        {
            return _context.Classrooms.Any(e => e.ID == id);
        }
    }
}
