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
    public class SectionsController : ControllerBase
    {
        private readonly DataContext _context;

        public SectionsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Sections
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Section>>> GetSections()
        {
            return await _context.Sections.ToListAsync();
        }

        // GET: api/sections/count
        [HttpGet("count")]
        public async Task<int> CountSections()
        {
            return await _context.Sections.CountAsync();
        }

        // GET: api/Sections/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Section>> GetSection(int id)
        {
            var section = await _context.Sections.FindAsync(id);

            if (section == null)
            {
                return NotFound();
            }

            return section;
        }

        // GET: api/Sections/Teacher/asdkfjh-sdf-34
        [HttpGet("Teacher/{id}")]
        public async Task<ActionResult<IEnumerable<Section>>> GetSectionsByTeacher([FromRoute] string id) {
            return await _context.Sections.Where(s => s.ProfessorId == id).ToListAsync();
        }

        // PUT: api/Sections/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSection(int id, Section section)
        {
            if (id != section.ID)
            {
                return BadRequest();
            }

            _context.Entry(section).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SectionExists(id))
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

        // POST: api/Sections
        [HttpPost]
        public async Task<ActionResult<Section>> PostSection(Section section)
        {
            _context.Sections.Add(section);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSection", new { id = section.ID }, section);
        }

        // DELETE: api/Sections/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Section>> DeleteSection(int id)
        {
            var section = await _context.Sections.FindAsync(id);
            if (section == null)
            {
                return NotFound();
            }

            //var assignations = await _context.Assignations.Where(a => a.Section)
            _context.Sections.Remove(section);
            await _context.SaveChangesAsync();

            return section;
        }

        private bool SectionExists(int id)
        {
            return _context.Sections.Any(e => e.ID == id);
        }
    }
}
