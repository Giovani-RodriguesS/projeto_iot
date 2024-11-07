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
    public class LeituraBombaController : ControllerBase
    {
        private readonly BackEndContext _context;

        public LeituraBombaController(BackEndContext context)
        {
            _context = context;
        }

        // GET: api/LeituraBomba
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LeituraBomba>>> GetLeituraBomba()
        {
            return await _context.LeituraBomba.ToListAsync();
        }

        // GET: api/LeituraBomba/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LeituraBomba>> GetLeituraBomba(int id)
        {
            var leituraBomba = await _context.LeituraBomba.FindAsync(id);

            if (leituraBomba == null)
            {
                return NotFound();
            }

            return leituraBomba;
        }

        // PUT: api/LeituraBomba/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLeituraBomba(int id, LeituraBomba leituraBomba)
        {
            if (id != leituraBomba.Id)
            {
                return BadRequest();
            }

            _context.Entry(leituraBomba).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LeituraBombaExists(id))
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

        // POST: api/LeituraBomba
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<LeituraBomba>> PostLeituraBomba(LeituraBomba leituraBomba)
        {
            _context.LeituraBomba.Add(leituraBomba);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLeituraBomba", new { id = leituraBomba.Id }, leituraBomba);
        }

        // DELETE: api/LeituraBomba/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLeituraBomba(int id)
        {
            var leituraBomba = await _context.LeituraBomba.FindAsync(id);
            if (leituraBomba == null)
            {
                return NotFound();
            }

            _context.LeituraBomba.Remove(leituraBomba);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LeituraBombaExists(int id)
        {
            return _context.LeituraBomba.Any(e => e.Id == id);
        }
    }
}
