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
    public class CareersController : ControllerBase
    {
        private readonly DataContext _context;

        public CareersController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Careers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Career>>> GetCareers()
        {
            return await _context.Careers
                .Include(c => c.Subjects)
                .ThenInclude(s => s.Sections)
                .ToListAsync();
        }

        // GET: api/Careers/count
        [HttpGet("count")]
        public async Task<int> CountCareers()
        {
            return await _context.Careers.CountAsync();
        }

        // GET: api/Careers/Completed
        [HttpGet("Completed")]
        public async Task<ActionResult<IEnumerable<Career>>> GetCompletedCareers()
        {
            return await _context.Careers.Where(c => c.IsCompleted == true).ToListAsync();
        }

        // GET: api/Careers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Career>> GetCareer(int id)
        {
            var career = await _context.Careers
                .Where(c => c.ID == id)
                .Include(c => c.Subjects)
                .FirstOrDefaultAsync();

            if (career == null)
            {
                return NotFound();
            }

            return career;
        }

        // GET: api/Careers/Teacher/5dfg-dsf43-dfstg
        [HttpGet("Teacher/{teacherId}")]
        public async Task<ActionResult<Career>> GetCareerByTeacher(string teacherId)
        {
            var career = await _context.Careers
                .Where(c => c.DirectorId == teacherId)
                .Include(c => c.Subjects)
                .ThenInclude(s => s.Sections)
                .FirstOrDefaultAsync();

            if (career == null)
            {
                return NotFound();
            }

            return career;
        }

        // GET: api/Careers/5/Sections
        [HttpGet("{id}/Sections")]
        public async Task<ActionResult<IEnumerable<Section>>> GetSectionsByCareer(int id)
        {
            List<Section> sections = new List<Section>();

            var career = await _context.Careers
                .Where(c => c.ID == id)
                .Include(c => c.Subjects)
                .ThenInclude(s => s.Sections)
                .FirstOrDefaultAsync();
            
            foreach (Subject subject in career.Subjects) 
            {
                sections.AddRange(subject.Sections);
            }

            return Ok(sections);
        }

        // PUT: api/Careers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCareer(int id, Career career)
        {
            if (id != career.ID)
            {
                return BadRequest();
            }

            _context.Entry(career).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CareerExists(id))
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

        // POST: api/Careers
        [HttpPost]
        public async Task<ActionResult<Career>> PostCareer(Career career)
        {
            _context.Careers.Add(career);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCareer", new { id = career.ID }, career);
        }

        // DELETE: api/Careers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Career>> DeleteCareer(int id)
        {
            var career = await _context.Careers.FindAsync(id);
            if (career == null)
            {
                return NotFound();
            }

            _context.Careers.Remove(career);
            await _context.SaveChangesAsync();

            return career;
        }

        private bool CareerExists(int id)
        {
            return _context.Careers.Any(e => e.ID == id);
        }
    }
}
