using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ExcelDataReader;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
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
        private readonly IHostingEnvironment _hostingEnvironment;

        public SectionsController(DataContext context, IHostingEnvironment hostingEnvironment)
        {
            _context = context;
            _hostingEnvironment = hostingEnvironment;
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
            section.InitializeData();
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

        // DELETE: api/Sections/All
        [HttpDelete("All")]
        public async Task<IActionResult> DeleteAllSections()
        {
            AssignationsController c = new AssignationsController(_context);
            AssignationRequestsController r = new AssignationRequestsController(_context);
            await c.DeleteAllAssignations();
            await r.DeleteAllAssignationRequest();

            List<Subject> subjects = await _context.Subjects.ToListAsync();

            foreach(Subject subject in subjects)
            {
                foreach(Section section in subject.Sections)
                {
                    _context.Sections.Remove(section);
                }
                _context.Subjects.Remove(subject);
            }

            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("{idCareer}/Upload"), DisableRequestSizeLimit]
		public async  Task<IActionResult> UploadFile([FromForm] FormFile formModel, [FromRoute] int idCareer)
		{
            var file = formModel.file;
            var career = await _context.Careers.FindAsync(idCareer);
            var user = await _context.UsersData.Where(u => u.Type == UserType.Admin).FirstAsync();
            
            var name = "sections_" + idCareer + ".xlsx";

            var fileFolder = System.IO.Path.Combine(this._hostingEnvironment.WebRootPath, "Uploads");
            
            //Absolute path
            var path = System.IO.Path.Combine(fileFolder, name);
            try
            {
                System.IO.Directory.CreateDirectory(fileFolder);
                using (var stream = new FileStream(path, FileMode.Create))
                {
                    file.CopyTo(stream);
                }
            }
            catch (System.Exception ex)
            {
                Console.WriteLine(ex);
                JsonResult re = new JsonResult(new
                {
                    respuesta = "Error en la lectura"
                });
                return re;
            }

            
            using (var stream = System.IO.File.Open(path, FileMode.Open, FileAccess.Read))
            {
                System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);

                using (var reader = ExcelReaderFactory.CreateReader(stream))
                {
                    Boolean firstRow = true;
                    Random r = new Random();
                    // Choose one of either 1 or 2:

                    // 1. Use the reader methods
                    do
                    {
                        while (reader.Read())
                        {
                            if (firstRow) 
                            {   
                                firstRow = false;
                                continue;
                            }
                            
                            string [] values = {};
                            //reader.GetValues(values);
                            //string secctionName = values[0];

                            Subject subject = new Subject { Name = reader.GetString(1), Sections = new List<Section>() };
                            await _context.Subjects.AddAsync(subject);

                            var students = reader.GetValue(2);
                            Section section = new Section { Name = reader.GetString(1), Students = Convert.ToInt32(students), ProfessorId = user.Id };
                            subject.Sections.Add(section);

                            for (int i = 0; i < 6; i++)
                            {
                                bool[] day = new bool[11];

                                for (int j = 0; j < 11; j++)
                                {
                                    int index = (11 * i) + (1 + j) + 2;
                                    var val = reader.GetValue(index);
                                    if (val != null)
                                    {
                                        day[j] = true;
                                    }
                                    else
                                    {
                                        day[j] = false;
                                    }

                                }
                                switch (i)
                                {
                                    case 0:
                                        section.Monday = day;
                                        break;
                                    case 1:
                                        section.Tuesday = day;
                                        break;
                                    case 2:
                                        section.Wednesday = day;
                                        break;
                                    case 3:
                                        section.Thursday = day;
                                        break;
                                    case 4:
                                        section.Friday = day;
                                        break;
                                    case 5:
                                        section.Saturday = day;
                                        break;
                                }
                            }
                            career.Subjects.Add(subject);
                            await _context.Sections.AddAsync(section);

                            //Console.WriteLine(reader.GetString(1));
                        }
                    } while (reader.NextResult());

                    await _context.SaveChangesAsync();

                    // 2. Use the AsDataSet extension method
                    //var result = reader.AsDataSet();

                    // The result of each spreadsheet is in result.Tables
                }
            }
            
            return Ok();
		}

        [HttpGet("file-example")]
        public async Task<IActionResult> DownloadExample() {
            var filePath = Path.Combine(_hostingEnvironment.WebRootPath, "horario_ejemplo.xlsx");
            if (!System.IO.File.Exists(filePath))
                return NotFound();
 
            var memory = new MemoryStream();
            using (var stream = new FileStream(filePath, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;
 
            return File(memory, GetContentType(filePath), "Horario Ejemplo.xlsx");
        }

        public static string GetContentType(string path)
        {
            var provider = new FileExtensionContentTypeProvider();
            string contentType;
            if(!provider.TryGetContentType(path, out contentType))
            {
                contentType = "application/octet-stream";
            }
            return contentType;
        }

        private bool SectionExists(int id)
        {
            return _context.Sections.Any(e => e.ID == id);
        }


    }

    public class FormFile {
        public IFormFile file { get; set; }
    }
}
