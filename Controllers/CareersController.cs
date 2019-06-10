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
            return await _context.Careers.ToListAsync();
        }

        // GET: api/Careers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Career>> GetCareer(int id)
        {
            var career = await _context.Careers.FindAsync(id);

            if (career == null)
            {
                return NotFound();
            }

            return career;
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
