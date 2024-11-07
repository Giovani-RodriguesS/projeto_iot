using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackEnd.Data;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeituraSensorController : ControllerBase
    {
        private readonly BackEndContext _context;

        public LeituraSensorController(BackEndContext context)
        {
            _context = context;
        }

        // GET: api/LeituraSensor
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LeituraSensor>>> GetLeituraSensor()
        {
            return await _context.LeituraSensor.ToListAsync();
        }

        // GET: api/LeituraSensor/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LeituraSensor>> GetLeituraSensor(int id)
        {
            var leituraSensor = await _context.LeituraSensor.FindAsync(id);

            if (leituraSensor == null)
            {
                return NotFound();
            }

            return leituraSensor;
        }

        // PUT: api/LeituraSensor/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLeituraSensor(int id, LeituraSensor leituraSensor)
        {
            if (id != leituraSensor.Id)
            {
                return BadRequest();
            }

            _context.Entry(leituraSensor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LeituraSensorExists(id))
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

        // POST: api/LeituraSensorx
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<LeituraSensor>> PostLeituraSensor(LeituraSensor leituraSensor)
        {
            _context.LeituraSensor.Add(leituraSensor);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLeituraSensor", new { id = leituraSensor.Id }, leituraSensor);
        }

        // DELETE: api/LeituraSensor/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLeituraSensor(int id)
        {
            var leituraSensor = await _context.LeituraSensor.FindAsync(id);
            if (leituraSensor == null)
            {
                return NotFound();
            }

            _context.LeituraSensor.Remove(leituraSensor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LeituraSensorExists(int id)
        {
            return _context.LeituraSensor.Any(e => e.Id == id);
        }
    }
}
