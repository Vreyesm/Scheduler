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
    public class UsersController : ControllerBase
    {
        private readonly DataContext _context;

        public UsersController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserData>>> GetUsers()
        {
            return await _context.UsersData.ToListAsync();
        }

        // GET: api/Users/Teachers
        [HttpGet("Teachers")]
        public async Task<ActionResult<IEnumerable<UserData>>> GetTeachers()
        {
            return await _context.UsersData.Where(u => u.Type == UserType.Professor || u.Type == UserType.Director || u.Type == UserType.Admin).ToListAsync();
        }

        // GET: api/Users/Teachers/Count
        [HttpGet("Teachers/Count")]
        public async Task<ActionResult> CountTeachers()
        {
            var teachers = await _context.UsersData.Where(u => u.Type == UserType.Professor || u.Type == UserType.Director).ToListAsync();

            return Ok(teachers.Count());
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserData>> GetUser(string id)
        {
            var user = await _context.UsersData.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(string id, UserData user)
        {
            if (!id.Equals(user.Id))
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // POST: api/Users
        [HttpPost]
        public async Task<ActionResult<UserData>> PostUser(UserData user)
        {
            _context.UsersData.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<UserData>> DeleteUser(string id)
        {
            var user = await _context.UsersData.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.UsersData.Remove(user);
            await _context.SaveChangesAsync();

            return user;
        }

        private bool UserExists(string id)
        {
            return _context.UsersData.Any(e => e.Id == id);
        }
    }
}
