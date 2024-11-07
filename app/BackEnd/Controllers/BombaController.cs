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
    public class BombaController : ControllerBase
    {
        private readonly BackEndContext _context;

        public BombaController(BackEndContext context)
        {
            _context = context;
        }

        // GET: api/Bomba
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Bomba>>> GetBomba()
        {
            return await _context.Bomba.ToListAsync();
        }

        // GET: api/Bomba/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Bomba>> GetBomba(int id)
        {
            var bomba = await _context.Bomba.FindAsync(id);

            if (bomba == null)
            {
                return NotFound();
            }

            return bomba;
        }

        // PUT: api/Bomba/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBomba(int id, Bomba bomba)
        {
            if (id != bomba.Id)
            {
                return BadRequest();
            }

            _context.Entry(bomba).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BombaExists(id))
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

        // POST: api/Bomba
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Bomba>> PostBomba(Bomba bomba)
        {
            _context.Bomba.Add(bomba);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBomba", new { id = bomba.Id }, bomba);
        }

        // DELETE: api/Bomba/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBomba(int id)
        {
            var bomba = await _context.Bomba.FindAsync(id);
            if (bomba == null)
            {
                return NotFound();
            }

            _context.Bomba.Remove(bomba);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BombaExists(int id)
        {
            return _context.Bomba.Any(e => e.Id == id);
        }
    }
}
