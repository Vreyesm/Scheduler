﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Scheduler;
using Scheduler.Data;
using Scheduler.Models;

namespace Scheduler.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BuildingsController : ControllerBase
    {
        private readonly DataContext _context;

        public BuildingsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Buildings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Building>>> GetBuildings()
        {
            return await _context.Buildings
                .Include(b => b.Classrooms)
                .ToListAsync();
        }

        // GET: api/Buildings/count
        [HttpGet("count")]
        public async Task<int> CountBuildings()
        {
            return await  _context.Buildings.CountAsync();
        }

        // GET: api/Buildings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Building>> GetBuilding(int id)
        {
            var building = await _context.Buildings
                .Where(b => b.ID == id)
                .Include(b => b.Classrooms)
                .SingleOrDefaultAsync();

            if (building == null)
            {
                return NotFound();
            }

            return building;
        }

        // PUT: api/Buildings/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBuilding(int id, Building building)
        {
            if (id != building.ID)
            {
                return BadRequest();
            }

            _context.Entry(building).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BuildingExists(id))
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

        // POST: api/Buildings
        [HttpPost]
        public async Task<ActionResult<Building>> PostBuilding(Building building)
        {
            _context.Buildings.Add(building);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBuilding", new { id = building.ID }, building);
        }

        // POST: api/Buildings/5/Classroom
        [HttpPost("{id}/classroom")]
        public async Task<ActionResult<Classroom>> PostClassroomToBuilding(Classroom classroom, [FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _context.Classrooms.Add(classroom);
            await _context.SaveChangesAsync();

            var building = await _context.Buildings.FirstAsync(b => b.ID == id);

            if (!(building == null))
            {
                building.Classrooms.Add(classroom);
                await _context.SaveChangesAsync();

                return Created("AddClassroomToBuilding", classroom);
            }
            else
            {
                return NotFound();
            }
            
            
        }

        // DELETE: api/Buildings/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Building>> DeleteBuilding(int id)
        {
            var building = await _context.Buildings.FindAsync(id);
            if (building == null)
            {
                return NotFound();
            }

            _context.Buildings.Remove(building);
            await _context.SaveChangesAsync();

            return building;
        }

        private bool BuildingExists(int id)
        {
            return _context.Buildings.Any(e => e.ID == id);
        }
    }
}
