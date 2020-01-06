using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Scheduler.Data;
using Scheduler.Models;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System.Drawing;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace Scheduler.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassroomsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IHostingEnvironment _hostingEnvironment;

        public ClassroomsController(DataContext context, IHostingEnvironment hostingEnvironment)
        {
            _context = context;
            _hostingEnvironment = hostingEnvironment;
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
            List<Building> buildings = await _context.Buildings.Include(b => b.Classrooms).ToListAsync();
            List<Classroom> classrooms = new List<Classroom>();
            List<Classroom> allClassrooms = await _context.Classrooms.ToListAsync();

            foreach (Classroom classroom in allClassrooms)
            {
                if (!classroom.GetArrayByDay(day)[block])
                {
                    int index = block;
                    int count = 1;

                    while (index < 10 && count != span + 1 && !classroom.GetArrayByDay(day)[index++ + 1]) { count++; }
                    if (count >= span + 1)
                    {
                        classrooms.Add(classroom);
                    }
                }
            }

            return classrooms;
        }

        // GET: api/Classrooms
        [HttpGet("Building/Available/Day/{day}/Block/{block}/Span/{span}")]
        public async Task<ActionResult<IEnumerable<Building>>> GetBuildingsAndClassroomsAvailable([FromRoute] DayOfWeek day, [FromRoute] int block, [FromRoute] int span)
        {
            List<Building> buildings = await _context.Buildings.Include(b => b.Classrooms).ToListAsync();
            
            foreach (Building b in buildings)
            {
                List<Classroom> classroomsToDelete = new List<Classroom>();
                foreach (Classroom c in b.Classrooms)
                {
                    if (!c.GetArrayByDay(day)[block])
                    {
                        int index = block;
                        int count = 1;

                        while (index < 10 && count != span + 1 && !c.GetArrayByDay(day)[index++ + 1]) { count++; }
                        if (!(count >= span + 1))
                        {
                            classroomsToDelete.Add(c);
                        }
                    } 
                    else 
                    {
                        classroomsToDelete.Add(c);
                    }
                }
                
                foreach(Classroom c in classroomsToDelete)
                {
                    b.Classrooms.Remove(c);
                }
            }
            
            return buildings;

        }

        // GET: api/Classrooms
        [HttpGet("{id}/Available/Day/{day}/Block/{block}")]
        public async Task<ActionResult<Boolean>> IsClassroomsAvailable([FromRoute] int id, [FromRoute] DayOfWeek day, [FromRoute] int block, [FromRoute] int span)
        {
            Classroom classroom = await _context.Classrooms.FindAsync(id);

            if(classroom.GetArrayByDay(day)[block]) {
                return Ok(false);
            }
            else {
                return Ok(true);
            }

        }

        // GET: api/Classrooms
        [HttpPost("Available/Time")]
        public async Task<ActionResult<IEnumerable<Building>>> GetBuildingsAndClassroomsAvailableOnTime([FromBody] RequestDTO dto)
        {
            DateTime Date = dto.Date;
            DayOfWeek Day = dto.Day;
            int Block = dto.Block;

            var alreadyRequested = (from c in _context.Classrooms
                              join a in _context.Assignations
                              on c equals a.Classroom
                              where a.HasExpiration
                              where a.Expiration == Date
                              where a.Day == Day
                              where a.Block == Block
                              select c).ToList();


            List<Building> buildings = await _context.Buildings.Include(b => b.Classrooms).ToListAsync();

            foreach (Building b in buildings)
            {
                List<Classroom> classroomsToDelete = new List<Classroom>();
                foreach (Classroom c in b.Classrooms)
                {
                    if(alreadyRequested.Contains(c)) { continue; }

                    if (c.GetArrayByDay(Day)[Block])
                    {
                        classroomsToDelete.Add(c);
                    }
                }

                foreach (Classroom c in classroomsToDelete)
                {
                    b.Classrooms.Remove(c);
                }
            }

            return buildings;

        }

        // GET: api/Classrooms/5/Available/Time
        [HttpPost("{id}/Available/Time")]
        public ActionResult<Boolean> IsClassroomsAvailableOnTime([FromBody] RequestDTO dto, [FromRoute] int id)
        {
            DateTime Date = dto.Date;
            DayOfWeek Day = dto.Day;
            int Block = dto.Block;

            var alreadyRequested = (from c in _context.Classrooms
                              join a in _context.Assignations
                              on c equals a.Classroom
                              where c.ID == id
                              //where a.HasExpiration
                              //where a.Expiration == Date
                              where a.Day == Day
                              where a.Block == Block
                              select c).ToList();

            if (alreadyRequested.Count == 0) {
                return Ok(true);
            } 
            else {
                return Ok(false);
            }
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

        [HttpGet("Schedule")]
        public async Task<ActionResult> GetSchedule()
        {
            List<Classroom> classrooms = await _context.Classrooms.ToListAsync();

            using (var package = new ExcelPackage())
            {
                ExcelWorksheet ws = package.Workbook.Worksheets.Add("Salas");
                ws.Cells[1, 1].Value = "Horario sala - Campus Curicó";

                using (ExcelRange r = ws.Cells[1, 1, 1, 67])
                {
                    r.Merge = true;
                    r.Style.Font.SetFromFont(new Font("Arial", 22, FontStyle.Bold));
                    r.Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.CenterContinuous;
                    r.Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
                    r.Style.Fill.BackgroundColor.SetColor(Color.FromArgb(204, 153, 255));
                    r.Style.Border.BorderAround(ExcelBorderStyle.Thin);
                }

                ws.Cells[2, 1].Value = "Sala";
                using (ExcelRange r = ws.Cells[2, 1, 3, 1])
                {
                    r.Merge = true;
                    r.Style.Font.SetFromFont(new Font("Arial", 11, FontStyle.Regular));
                }

                for (int day = 0; day < 6; day++)
                {
                    ws.Cells[2, 2 + (day * 11 )].Value = GetDayString(day);
                    for (int block = 1; block < 12; block++)
                    {
                        ws.Cells[3, 1 + (day * 11 + block)].Value = block;
                        ws.Cells[3, 1 + (day * 11 + block)].Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
                        ws.Cells[3, 1 + (day * 11 + block)].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(0, 153, 0));
                        ws.Cells[3, 1 + (day * 11 + block)].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                    }

                    using (ExcelRange r = ws.Cells[2, 2 + (day * 11), 2, 2 + (day * 11) + 10])
                    {
                        r.Merge = true;
                        r.Style.Font.SetFromFont(new Font("Arial", 11, FontStyle.Regular));
                        r.Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.CenterContinuous;
                        r.Style.Border.BorderAround(ExcelBorderStyle.Thin);
                        //r.Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
                        //r.Style.Fill.BackgroundColor.SetColor(Color.FromArgb(0, 153, 0));
                    }
                }

                for (int i = 1; i < 67; i++)
                {
                    ws.Cells[1, i].Style.Border.BorderAround(ExcelBorderStyle.Thin);

                }

                int row = 4;

                foreach(Classroom classroom in classrooms)
                {
                    ws.Cells[row, 1].Value = classroom.Name;

                    int col = 2;

                    for (DayOfWeek day = DayOfWeek.Monday; day <= DayOfWeek.Saturday; day++)
                    {
                        for (int block = 0; block < 11; block++)
                        {
                            if(classroom.GetArrayByDay(day)[block])
                            {
                                // Search the assignation (if any)
                                List<Assignation> assignations = await _context.Assignations.Include(a => a.Section).Where(a => a.Day == day && a.Block == block && a.Classroom == classroom).ToListAsync();
                                if (assignations.Count() == 0) // not assigned yet
                                {
                                    ws.Cells[row, col].Value = "X";
                                }
                                else // the section name on the cell
                                {
                                    Section section = assignations[0].Section;
                                    ws.Cells[row, col].Value = section.Name;
                                }
                            }
                            else
                            {
                                ws.Cells[row, col].Value = " ";
                            }

                            ws.Cells[row, col].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                            ws.Cells[row, col].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                            ws.Cells[row, col].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                            ws.Cells[row, col].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                            col++;
                        }
                    }
                    row++;
                }

                for (int i = 1; i < row; i++)
                {
                    ws.Cells[i, 1].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                }

                ws.Cells.AutoFitColumns(0);
                for (int i = 2; i < 68; i++)
                {
                    ws.Column(i).Width = 9;
                }

                // Print the file
                string fileName = "Horario - Salas.xlsx";
                var xlFile = GetFileInfo(fileName);
                package.SaveAs(xlFile);

                var filePath = Path.Combine(_hostingEnvironment.WebRootPath, fileName);
                if (!System.IO.File.Exists(filePath))
                    return NotFound();

                var memory = new MemoryStream();
                using (var stream = new FileStream(filePath, FileMode.Open))
                {
                    await stream.CopyToAsync(memory);
                }
                memory.Position = 0;

                return File(memory, SectionsController.GetContentType(filePath), fileName);

            }



        }

        private bool ClassroomExists(int id)
        {
            return _context.Classrooms.Any(e => e.ID == id);
        }

        public FileInfo GetFileInfo(string file, bool deleteIfExists = true)
        {
            var filePath = Path.Combine(_hostingEnvironment.WebRootPath, file);
            var fi = new FileInfo(filePath);
            if (deleteIfExists && fi.Exists)
            {
                fi.Delete();  // ensures we create a new workbook
            }
            return fi;
        }

        private string GetDayString(int day)
        {
            switch (day)
            {
                case 0:
                    return "Lunes";
                case 1:
                    return "Martes";
                case 2:
                    return "Miércoles";
                case 3:
                    return "Jueves";
                case 4:
                    return "Viernes";
                case 5:
                    return "Sábado";
                default:
                    return "";
            }
        }
    }

    public class RequestDTO
    {
        public DateTime Date { get; set; }
        public DayOfWeek Day { get; set; }
        public int Block { get; set; }
    }
}
