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


        // POST: api/LeituraBomba
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<LeituraBombaDTO>> PostLeituraBomba(LeituraBombaDTO leituraBombaDTO)
        {
            var leituraBomba = new LeituraBomba
            {
                Tempo = leituraBombaDTO.Tempo,
                BombaAtivada = leituraBombaDTO.BombaAtivada,

            };
            
            _context.LeituraBomba.Add(leituraBomba);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLeituraBomba", new { id = leituraBomba.Id }, leituraBombaToDTO( leituraBomba));
        }


        private static LeituraBombaDTO leituraBombaToDTO (LeituraBomba leituraBomba) => 
        new LeituraBombaDTO
        {
            Tempo = leituraBomba.Tempo,
            BombaAtivada = leituraBomba.BombaAtivada
        };
    }
}
