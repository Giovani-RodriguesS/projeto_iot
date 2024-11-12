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

        // POST: api/LeituraSensorx
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<LeituraSensor>> PostLeituraSensor(LeituraSensor leituraSensor)
        {
            _context.LeituraSensor.Add(leituraSensor);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLeituraSensor", new { id = leituraSensor.Id }, leituraSensor);
        }

    }
}
