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
            return await _context.AssignationRequests
                        .Include(a => a.Classroom)
                        .Include(a => a.Professor)
                        .Include(a => a.Section)
                        .ToListAsync();
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
            _context.Entry(assignationRequest.Section).State = EntityState.Unchanged;
            _context.Entry(assignationRequest.Classroom).State = EntityState.Unchanged;
            _context.Entry(assignationRequest.Professor).State = EntityState.Unchanged;
            _context.AssignationRequests.Add(assignationRequest);

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAssignationRequest", new { id = assignationRequest.ID }, assignationRequest);
        }

        // DELETE: api/AssignationRequests/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<AssignationRequest>> DeleteAssignationRequest(int id)
        {
            var request = await _context .AssignationRequests
                                                    .Include(a => a.Classroom)
                                                    .Include(a => a.Section)
                                                    .Include(a => a.Assignation)
                                                    .FirstAsync(a => a.ID == id);
            if (request == null)
            {
                return NotFound();
            }

            if (request.Accepted) {
                Classroom c = request.Classroom;
                Section s = request.Section;
                c.MarkBLock(request.Day, request.Block, false);
                s.MarkBLock(request.Day, request.Block, false);
                Assignation assignation = request.Assignation;
                _context.Entry(assignation.Classroom).State = EntityState.Modified;
                _context.Entry(assignation.Section).State = EntityState.Modified;
                _context.Assignations.Remove(assignation);
            }

            _context.AssignationRequests.Remove(request);
            await _context.SaveChangesAsync();

            return request;
        }


        // DELETE: api/AssiignationRequests/All
        [HttpDelete("All")]
        public async Task<ActionResult> DeleteAllAssignationRequest()
        {
            List<AssignationRequest> requests = await _context.AssignationRequests.ToListAsync();

            foreach(AssignationRequest request in requests)
            {
                if (request == null)
                {
                    return NotFound();
                }

                if (request.Accepted)
                {
                    Classroom c = request.Classroom;
                    Section s = request.Section;
                    c.MarkBLock(request.Day, request.Block, false);
                    s.MarkBLock(request.Day, request.Block, false);
                    Assignation assignation = request.Assignation;
                    _context.Entry(assignation.Classroom).State = EntityState.Modified;
                    _context.Entry(assignation.Section).State = EntityState.Modified;
                    _context.Assignations.Remove(assignation);
                }

                _context.AssignationRequests.Remove(request);
            }

            await _context.SaveChangesAsync();
            return Ok();
        }

        // GET: api/AssignationRequests/5/Accept
        [HttpGet("{id}/Accept")]
        public async Task<ActionResult<int>> AcceptAssignationRequest([FromRoute] int id)
        {
            AssignationRequest request = await _context.AssignationRequests
                                                .Include(a => a.Classroom)
                                                .Include(a => a.Section)
                                                .FirstAsync(a => a.ID == id);
            Classroom classroom = request.Classroom;
            Section section = request.Section;

            request.Accepted = true;
            
            // Section now has a new block assigned on the schedule
            section.MarkBLock(request.Day, request.Block, true);

            // Classroom isn't available in that block anymore (for some period of time )
            classroom.MarkBLock(request.Day, request.Block, true);

            Assignation assignation = new Assignation{ Classroom = classroom, Section = section, Day = request.Day, Block = request.Block, HasExpiration = true, Expiration = request.Expiration };
            request.Assignation = assignation;

            await _context.AddAsync(assignation);


            return await _context.SaveChangesAsync();
        }

        [HttpGet("Check")]
        public async Task<IActionResult> CheckRequestsExpiration()
        {
            var requests = await _context.AssignationRequests.Where(a => a.Special).ToListAsync();
            DateTime now = new DateTime();

            foreach(AssignationRequest request in requests)
            {
                if(request.Expiration < now )
                {
                    _context.AssignationRequests.Remove(request);
                }
            }

            return Ok(await _context.SaveChangesAsync());
        }

        private bool AssignationRequestExists(int id)
        {
            return _context.AssignationRequests.Any(e => e.ID == id);
        }
    }
}
