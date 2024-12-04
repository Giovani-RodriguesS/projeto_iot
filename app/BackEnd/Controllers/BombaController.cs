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
        public async Task<IActionResult> PutBomba(int id, BombaDTO bombaDTO)
        {
            // Verificar se o ID na URL corresponde ao ID esperado
            var bomba = await _context.Bomba.FindAsync(id);
            if (bomba == null)
            {
                return NotFound();
            }
        
            // Atualizar os campos da entidade encontrada
            bomba.Nome = bombaDTO.Nome;
            bomba.Tipo = bombaDTO.Tipo;
            bomba.Vazao = bombaDTO.Vazao;
            bomba.NumPino = bombaDTO.NumPino;
            bomba.Localizacao = bombaDTO.Localizacao;
            bomba.Data_instalacao = bombaDTO.Data_instalacao;
        
            // Marcar como modificado
            _context.Entry(bomba).State = EntityState.Modified;
        
            try
            {
                // Salvar alterações no banco de dados
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
        
            // Retornar status 204 No Content para indicar sucesso
            return NoContent();
        }


        // POST: api/Bomba
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Bomba>> PostBomba(BombaDTO bombaDto)
        {
            // Converte o DTO para a entidade Bomba
            var bomba = new Bomba
            {
                Nome = bombaDto.Nome,
                Tipo = bombaDto.Tipo,
                Vazao = bombaDto.Vazao,
                NumPino = bombaDto.NumPino,
                Localizacao = bombaDto.Localizacao,
                Data_instalacao = bombaDto.Data_instalacao
            };

            // Adiciona a bomba ao contexto do banco de dados
            _context.Bomba.Add(bomba);
            await _context.SaveChangesAsync();

            // Retorna a ação com o recurso criado
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
