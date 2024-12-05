using Microsoft.AspNetCore.Mvc;
using BackEnd.Data;
using Microsoft.EntityFrameworkCore;

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

        // POST: api/LeituraBomba
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<IActionResult> PostLeituraBomba(LeituraBombaDTO leituraBombaDTO)
        {   
            // Convertendo data e hora para string
            string data = DateOnly.FromDateTime(DateTime.Now).ToString("dd/MM/yyyy");
            string hora = TimeOnly.FromDateTime(DateTime.Now).ToString("HH:mm");

            var leituraBomba = new LeituraBomba
            {
                Data = data,
                Hora = hora,
                IdBomba = leituraBombaDTO.IdBomba,
                BombaAtivada = leituraBombaDTO.BombaAtivada,
            };
            // Converte o DTO para a entidade LeituraBomba
            _context.LeituraBomba.Add(leituraBomba);
            await _context.SaveChangesAsync();

            return NoContent();
            }

    }
}