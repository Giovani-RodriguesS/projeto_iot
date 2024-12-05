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

        // POST: api/LeituraSensor
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<IActionResult> PostLeituraSensor(LeituraSensorDTO leituraSensorDTO)
        {
            // 
            var leituraSensor = new LeituraSensor
            {
                Data = DateOnly.FromDateTime(DateTime.Now),
                Hora = TimeOnly.FromDateTime(DateTime.Now),
                IdSensor = leituraSensorDTO.IdSensor,
                Medida = leituraSensorDTO.Medida,
            };

            _context.LeituraSensor.Add(leituraSensor);
            await _context.SaveChangesAsync();

            return NoContent();        
        }
    }
}