using System;
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
    public class AssignationsController : ControllerBase
    {
        private readonly DataContext _context;

        public AssignationsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Assignations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Assignation>>> GetAssignations()
        {
            return await _context.Assignations
                                .Include(a => a.Section)
                                .Include(a => a.Classroom)
                                .ToListAsync();
        }

        // GET: api/Assignations/auto
        [HttpGet("Auto")]
        public async Task<Object> SimulateAssignation()
        {
            return await DbInitializer.DoTheMath(_context);
        }

        // GET: api/Assignations/Classroom/5
        [HttpGet("Classroom/{id}")]
        public async Task<ActionResult<IEnumerable<Assignation>>> GetAssignationsByClassroom([FromRoute] int id)
        {
            return await _context.Assignations
                        .Where(a => a.Classroom.ID == id)
                        .Include(a => a.Section)
                        .ToListAsync();
        }

        // GET: api/Assignations/Section/5
        [HttpGet("Section/{id}")]
        public async Task<ActionResult<IEnumerable<Assignation>>> GetAssignationsBySection([FromRoute] int id)
        {
            return await _context.Assignations
                        .Where(a => a.Section.ID == id)
                        .Include(a => a.Classroom)
                        .ToListAsync();
        }

        // GET: api/Assignations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Assignation>> GetAssignation(int id)
        {
            var assignation = await _context.Assignations.FindAsync(id);

            if (assignation == null)
            {
                return NotFound();
            }

            return assignation;
        }

        // PUT: api/Assignations/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAssignation(int id, Assignation assignation)
        {
            if (id != assignation.ID)
            {
                return BadRequest();
            }

            _context.Entry(assignation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AssignationExists(id))
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

        // POST: api/Assignations
        [HttpPost]
        public async Task<ActionResult<Assignation>> PostAssignation(Assignation assignation)
        {
            _context.Assignations.Add(assignation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAssignation", new { id = assignation.ID }, assignation);
        }
        
        // POST: api/Assignations/All
        [HttpPost("All")]
        public async Task<ActionResult<Assignation>> PostAllAssignation(Assignation[] assignations)
        {
            //_context.Entry(assignations[0].Classroom).State = EntityState.Unchanged;
            _context.Entry(assignations[0].Section).State = EntityState.Unchanged;
            Classroom c = assignations[0].Classroom;
            _context.Entry(c).State = EntityState.Modified;
            
            foreach(Assignation assignation in assignations) 
            {
                var previous = await _context.Assignations.Where(a => a.Section.ID == assignation.Section.ID && a.Day == assignation.Day && a.Block == assignation.Block).ToListAsync();
                _context.Assignations.RemoveRange(previous);
                c.MarkBLock(assignation.Day, assignation.Block, true);
                await _context.Assignations.AddAsync(assignation);
                await _context.SaveChangesAsync();
            }

            return Ok();
        }

        // DELETE: api/Assignations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Assignation>> DeleteAssignation(int id)
        {
            // var assignation = await _context.Assignations.FindAsync(id);
            var assignation = await _context.Assignations
                                .Include(a => a.Classroom)
                                .FirstOrDefaultAsync(a => a.ID == id);
            if (assignation == null)
            {
                return NotFound();
            }
            
            var request = await _context.AssignationRequests.Where(r => r.Assignation == assignation).ToListAsync();
            if (request.Count > 0) {
                request[0].ResetRequest();
            }

            Classroom classroom = assignation.Classroom;
            classroom.MarkBLock(assignation.Day, assignation.Block, false);

            _context.Assignations.Remove(assignation);
            await _context.SaveChangesAsync();

            return assignation;
        }

        // DELETE: api/Assignations/All
        [HttpDelete("All")]
        public async Task<IActionResult> DeleteAllAsignations()
        {
            _context.Assignations.RemoveRange(_context.Assignations);

            var classrooms = _context.Classrooms;

            foreach (Classroom classroom in classrooms)
            {
                classroom.Monday = new bool[] { false, false, false, false, false, false, false, false, false, false, false };
                classroom.Tuesday = new bool[] { false, false, false, false, false, false, false, false, false, false, false };
                classroom.Wednesday = new bool[] { false, false, false, false, false, false, false, false, false, false, false };
                classroom.Thursday = new bool[] { false, false, false, false, false, false, false, false, false, false, false };
                classroom.Friday = new bool[] { false, false, false, false, false, false, false, false, false, false, false };
                classroom.Saturday = new bool[] { false, false, false, false, false, false, false, false, false, false, false };
            }

            await _context.SaveChangesAsync();
            return Ok();
        }

        private bool AssignationExists(int id)
        {
            return _context.Assignations.Any(e => e.ID == id);
        }
    }
}
