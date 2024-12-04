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

        // POST: api/LeituraSensor
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<LeituraSensorDTO>> PostLeituraSensor(LeituraSensorDTO leituraSensorDTO)
        {
            // Recuperar o último IdSensor registrado
            var ultimoIdSensor = await _context.LeituraSensor
                .OrderByDescending(ls => ls.IdSensor)
                .Select(ls => ls.IdSensor)
                .FirstOrDefaultAsync();
        
            // Incrementar o IdSensor
            var novoIdSensor = ultimoIdSensor + 1;
        
            // Criar o objeto LeituraSensor com o novo IdSensor
            var leituraSensor = new LeituraSensor
            {
                Data = leituraSensorDTO.Data,
                Hora = leituraSensorDTO.Hora,
                Medida = leituraSensorDTO.Medida,
                IdSensor = novoIdSensor // Definir o novo valor de IdSensor
            };
        
            // Adicionar ao banco e salvar as alterações
            _context.LeituraSensor.Add(leituraSensor);
            await _context.SaveChangesAsync();
        
            // Retornar o DTO criado
            return CreatedAtAction("GetLeituraSensor", new { id = leituraSensor.Id }, LeituraSensorToDTO(leituraSensor));
        }
        
        // Método para converter LeituraSensor em LeituraSensorDTO
        private static LeituraSensorDTO LeituraSensorToDTO(LeituraSensor leituraSensor) => new LeituraSensorDTO
        {
            Data = leituraSensor.Data,
            Hora = leituraSensor.Hora,
            Medida = leituraSensor.Medida,
        };
    }
}