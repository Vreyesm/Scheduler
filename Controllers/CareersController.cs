using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using Scheduler.Data;
using Scheduler.Models;

namespace Scheduler.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CareersController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IHostingEnvironment _hostingEnvirontment;

        public CareersController(DataContext context, IHostingEnvironment hostingEnvironment)
        {
            _context = context;
            _hostingEnvirontment = hostingEnvironment;
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

        // Delete: api/Classrooms/5/ClearSubjects
        [HttpDelete("{id}/ClearSubjects")]
        public async Task<ActionResult> ClearSubjectsOfCareer(int id)
        {
            Career career = await _context.Careers
                                    .Include(c => c.Subjects)
                                    .ThenInclude(s => s.Sections)
                                    .FirstAsync(c => c.ID == id);

            List<Subject> subjects = career.Subjects;

            foreach(Subject subject in subjects)
            {
                foreach(Section section in subject.Sections)
                {
                    // Delete Assignation Requests from that section
                    List<AssignationRequest> requests = await _context.AssignationRequests.Where(r => r.Section == section).ToListAsync();

                    AssignationRequestsController requestController = new AssignationRequestsController(_context);

                    foreach(AssignationRequest request in requests )
                    {
                        await requestController.DeleteAssignationRequest(request.ID);
                    }

                    // Delete Assignations from that section
                    List<Assignation> assignations = await _context.Assignations.Where(a => a.Section == section).ToListAsync(); 

                    AssignationsController assignationsController = new AssignationsController(_context);

                    foreach(Assignation a in assignations)
                    {
                        await assignationsController.DeleteAssignation(a.ID);
                    }

                    _context.Sections.Remove(section);
                }

                _context.Subjects.Remove(subject);
            }

            await _context.SaveChangesAsync();
            
            return Ok();
        }

        [HttpGet("{id}/Schedule")]
        public async Task<ActionResult> GetCareerSchedule(int id)
        {
            Career career = await _context.Careers
                                    .Include(c => c.Subjects)
                                    .ThenInclude(s => s.Sections).FirstAsync(c => c.ID == id);

            using (var package = new ExcelPackage())
            {
                ExcelWorksheet ws = package.Workbook.Worksheets.Add(career.Name);
                ws.Cells[1, 1].Value = career.Name;
                

                using (ExcelRange r = ws.Cells[1, 1, 1, 69])
                {
                    r.Merge = true;
                    r.Style.Font.SetFromFont(new Font("Arial", 22, FontStyle.Bold));
                    r.Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.CenterContinuous;
                    r.Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
                    r.Style.Fill.BackgroundColor.SetColor(Color.FromArgb(204, 153, 255));
                    r.Style.Border.BorderAround(ExcelBorderStyle.Thin);
                }

                ws.Cells[2, 1].Value = "Profesor";
                using (ExcelRange r = ws.Cells[2, 1, 3, 1])
                {
                    r.Merge = true;
                    r.Style.Font.SetFromFont(new Font("Arial", 11, FontStyle.Regular));
                }

                ws.Cells[2, 2].Value = "Sección";
                using (ExcelRange r = ws.Cells[2, 2, 3, 2])
                {
                    r.Merge = true;
                    r.Style.Font.SetFromFont(new Font("Arial", 11, FontStyle.Regular));
                }

                for (int day = 0; day < 6; day++)
                {
                    ws.Cells[2, 2 + (day * 11 + 1)].Value = GetDayString(day);
                    for (int block = 1; block < 12; block++)
                    {
                        ws.Cells[3, 2 + (day * 11 + block)].Value = block;
                        ws.Cells[3, 2 + (day * 11 + block)].Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
                        ws.Cells[3, 2 + (day * 11 + block)].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(0, 153, 0));
                        ws.Cells[3, 2 + (day * 11 + block)].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                    }

                    using (ExcelRange r = ws.Cells[2, 2 + (day*11 + 1), 2, 2 + (day * 11) + 11])
                    {
                        r.Merge = true;
                        r.Style.Font.SetFromFont(new Font("Arial", 11, FontStyle.Regular));
                        r.Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.CenterContinuous;
                        r.Style.Border.BorderAround(ExcelBorderStyle.Thin);
                        //r.Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
                        //r.Style.Fill.BackgroundColor.SetColor(Color.FromArgb(0, 153, 0));
                    }
                }

                for (int i = 1; i < 69; i++)
                {
                    ws.Cells[1, i].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                }

                

                int row = 4;

                foreach(Subject subject in career.Subjects)
                {
                    foreach(Section section in subject.Sections)
                    {
                        UserData professor = await _context.UsersData.FirstAsync(u => u.Id == section.ProfessorId);
                        ws.Cells[row, 1].Value = professor.Name;
                        ws.Cells[row, 2].Value = section.Name;
                        int col = 3;

                        for (DayOfWeek day = DayOfWeek.Monday; day <= DayOfWeek.Saturday; day++)
                        {
                            for (int block = 0; block < 11; block++)
                            {
                                if (section.GetDayArray(day)[block]) // mark the cell with a value
                                {
                                    // Search the assignation (if any)
                                    List<Assignation> assignations = await _context.Assignations.Include(a => a.Classroom).Where(a => a.Section == section && a.Day == day && a.Block == block).ToListAsync();
                                    if (assignations.Count() == 0) // not assigned yet
                                    {
                                        ws.Cells[row, col].Value = "X";
                                    }
                                    else // the classroom name on the cell
                                    {
                                        Classroom classroom = assignations[0].Classroom;
                                        ws.Cells[row, col].Value = classroom.Name;
                                    }
                                    
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
                }
                
                for(int i = 1; i < row; i++)
                {
                    ws.Cells[i, 1].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                    ws.Cells[i, 2].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                }
                
                ws.Cells.AutoFitColumns(0);
                for (int i = 3; i < 69; i++)
                {
                    ws.Column(i).Width = 3;
                }


                string fileName = "Horario-" + career.Name + ".xlsx";
                var xlFile = GetFileInfo(fileName);
                package.SaveAs(xlFile);

                var filePath = Path.Combine(_hostingEnvirontment.WebRootPath, fileName);
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


            return Ok();
        }

        private bool CareerExists(int id)
        {
            return _context.Careers.Any(e => e.ID == id);
        }

        private string GetDayString(int day)
        {
            switch(day)
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

        public FileInfo GetFileInfo(string file, bool deleteIfExists = true)
        {
            var filePath = Path.Combine(_hostingEnvirontment.WebRootPath, file);
            var fi = new FileInfo(filePath);
            if (deleteIfExists && fi.Exists)
            {
                fi.Delete();  // ensures we create a new workbook
            }
            return fi;
        }
    }
}
