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
                                .ToListAsync();
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

        // DELETE: api/Assignations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Assignation>> DeleteAssignation(int id)
        {
            var assignation = await _context.Assignations.FindAsync(id);
            if (assignation == null)
            {
                return NotFound();
            }

            _context.Assignations.Remove(assignation);
            await _context.SaveChangesAsync();

            return assignation;
        }

        private bool AssignationExists(int id)
        {
            return _context.Assignations.Any(e => e.ID == id);
        }
    }
}
