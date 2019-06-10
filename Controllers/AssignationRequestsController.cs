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
    public class AssignationRequestsController : ControllerBase
    {
        private readonly DataContext _context;

        public AssignationRequestsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/AssignationRequests
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AssignationRequest>>> GetAssignationRequests()
        {
            return await _context.AssignationRequests.ToListAsync();
        }

        // GET: api/AssignationRequests/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AssignationRequest>> GetAssignationRequest(int id)
        {
            var assignationRequest = await _context.AssignationRequests.FindAsync(id);

            if (assignationRequest == null)
            {
                return NotFound();
            }

            return assignationRequest;
        }

        // PUT: api/AssignationRequests/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAssignationRequest(int id, AssignationRequest assignationRequest)
        {
            if (id != assignationRequest.ID)
            {
                return BadRequest();
            }

            _context.Entry(assignationRequest).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AssignationRequestExists(id))
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

        // POST: api/AssignationRequests
        [HttpPost]
        public async Task<ActionResult<AssignationRequest>> PostAssignationRequest(AssignationRequest assignationRequest)
        {
            _context.AssignationRequests.Add(assignationRequest);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAssignationRequest", new { id = assignationRequest.ID }, assignationRequest);
        }

        // DELETE: api/AssignationRequests/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<AssignationRequest>> DeleteAssignationRequest(int id)
        {
            var assignationRequest = await _context.AssignationRequests.FindAsync(id);
            if (assignationRequest == null)
            {
                return NotFound();
            }

            _context.AssignationRequests.Remove(assignationRequest);
            await _context.SaveChangesAsync();

            return assignationRequest;
        }

        private bool AssignationRequestExists(int id)
        {
            return _context.AssignationRequests.Any(e => e.ID == id);
        }
    }
}
